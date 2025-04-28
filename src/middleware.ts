import { NextRequest, NextResponse } from 'next/server'

import { HttpTypes } from '@medusajs/types'

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || 'pl'

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap() {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    // Fetch regions from Medusa
    const response = await fetch(`${BACKEND_URL}/store/regions`, {
      headers: {
        'x-publishable-api-key': PUBLISHABLE_API_KEY!,
      },
      next: {
        revalidate: 3600,
        tags: ['regions'],
      },
    })
    
    const data = await response.json()
    const regions = data.regions

    if (!regions?.length) {
      // Instead of notFound(), return empty map - handle "not found" case in components
      return regionMapCache.regionMap
    }

    // Create a map of country codes to regions
    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2 ?? '', region)
      })
    })

    regionMapCache.regionMapUpdated = Date.now()
  }

  return regionMapCache.regionMap
}

/**
 * Fetches regions from Medusa and sets the region cookie.
 * @param request
 * @param response
 */
function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion | number>
) {
  try {
    let countryCode

    const vercelCountryCode = request.headers
      .get('x-vercel-ip-country')
      ?.toLowerCase()

    const urlCountryCode = request.nextUrl.pathname.split('/')[1]?.toLowerCase()

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value
    }

    return countryCode
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        'Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a NEXT_PUBLIC_MEDUSA_BACKEND_URL environment variable?'
      )
    }
  }
}

/**
 * Middleware to handle region selection and onboarding status.
 */
export async function middleware(request: NextRequest) {
  // Clone the request url
  const url = request.nextUrl.clone();

  // Handle image requests specifically
  if (url.pathname.includes('/_next/image')) {
    return NextResponse.next();
  }

  const searchParams = request.nextUrl.searchParams
  const isOnboarding = searchParams.get('onboarding') === 'true'
  const cartId = searchParams.get('cart_id')
  const checkoutStep = searchParams.get('step')
  const onboardingCookie = request.cookies.get('_medusa_onboarding')
  const cartIdCookie = request.cookies.get('_medusa_cart_id')

  const regionMap = await getRegionMap()

  // If regionMap is empty, don't redirect - prevents redirect loops
  if (!regionMap || regionMap.size === 0) {
    return NextResponse.next()
  }

  const countryCode = await getCountryCode(request, regionMap)
  
  // If no countryCode was found, don't redirect - prevents redirect loops
  if (!countryCode) {
    return NextResponse.next()
  }

  // Check if the URL already has the country code
  const pathParts = request.nextUrl.pathname.split('/')
  const firstPathPart = pathParts[1] ? pathParts[1].toLowerCase() : ''
  const urlHasCountryCode = firstPathPart === countryCode

  // Only proceed with redirection if all conditions are met
  if (
    urlHasCountryCode &&
    (!isOnboarding || onboardingCookie) &&
    (!cartId || cartIdCookie)
  ) {
    return NextResponse.next()
  }


  // allow Sanity studio to access the site
  if (request.nextUrl.pathname.startsWith("/studio")) {
    return NextResponse.next()
  }

  // check if the url is a static asset
  if (request.nextUrl.pathname.includes(".")) {
    return NextResponse.next()
  }

  // Handle redirection
  const redirectPath = pathParts.length > 2 || pathParts[1] !== '' 
    ? request.nextUrl.pathname.replace(/^\/[^\/]+/, '') // Remove first path part if it exists
    : ''

  const queryString = request.nextUrl.search || ''

  let redirectUrl = request.nextUrl.href

  // If no country code in URL or not matching the determined country code
  if (!urlHasCountryCode) {
    redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`
    const response = NextResponse.redirect(redirectUrl, 307)
    
    // Add cookies as needed
    if (cartId) {
      response.cookies.set('_medusa_cart_id', cartId, { maxAge: 60 * 60 * 24 })
    }
    
    if (isOnboarding) {
      response.cookies.set('_medusa_onboarding', 'true', { maxAge: 60 * 60 * 24 })
    }
    
    return response
  }

  // Cart ID but no checkout step
  if (cartId && !checkoutStep) {
    redirectUrl = `${redirectUrl}&step=address`
    const response = NextResponse.redirect(redirectUrl, 307)
    response.cookies.set('_medusa_cart_id', cartId, { maxAge: 60 * 60 * 24 })
    
    if (isOnboarding) {
      response.cookies.set('_medusa_onboarding', 'true', { maxAge: 60 * 60 * 24 })
    }
    
    return response
  }

  // Set onboarding cookie if needed
  if (isOnboarding && !onboardingCookie) {
    const response = NextResponse.next()
    response.cookies.set('_medusa_onboarding', 'true', { maxAge: 60 * 60 * 24 })
    return response
  }

  // Default: proceed without redirection
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
