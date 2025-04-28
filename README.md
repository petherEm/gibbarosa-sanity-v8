# Gibbarosa E-Commerce

A modern multilingual e-commerce platform built with Next.js 15, Medusa.js, Sanity.io, and TailwindCSS 4.

## 🚀 Overview

Gibbarosa is a full-featured e-commerce solution that combines the power of Medusa.js headless commerce with a Next.js frontend. The architecture features a dedicated backend service for handling commerce operations and a modern, responsive frontend for an exceptional shopping experience.

## ✨ Features

- **Multilingual Support**: Full internationalization with support for English, Polish, and French
- **Headless Architecture**: Clean separation between frontend and backend concerns
- **Modern Tech Stack**: Built with Next.js 15, TailwindCSS 4, and other cutting-edge technologies
- **Content Management**: Integrated Sanity.io for flexible content modeling
- **Server-Side Rendering**: Optimized performance with Next.js server components
- **Responsive Design**: Mobile-first approach for all screen sizes
- **Product Management**: Comprehensive product catalog with detailed specifications
- **Cart & Checkout**: Seamless shopping experience
- **User Accounts**: Customer authentication and profile management

## 🛠️ Technology Stack

### Frontend ([gibbarosa-8-front](gibbarosa-8-front/))

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **Content Management**: [Sanity.io](https://www.sanity.io/)
- **State Management**: React Server Components + Client Hooks

### Backend ([gibbarosa-7-backend](gibbarosa-7-backend/))

- **E-commerce Engine**: [Medusa.js](https://medusajs.com/)
- **Database**: PostgreSQL
- **API**: RESTful endpoints

## 🗂️ Project Structure

The project is organized into two main directories:

```
gibbarosa-7-backend/     # Medusa.js backend service
gibbarosa-8-front/       # Next.js frontend application
```

### Key Frontend Routes

- `/[countryCode]/(main)/` - Main shop homepage
- `/[countryCode]/(main)/products/[handle]` - Product detail pages
- `/[countryCode]/(main)/shop` - Product listings and category pages
- `/studio/[[...tool]]` - Sanity Studio for content management

## 🌐 Internationalization

The application supports multiple languages through a country code routing pattern:

```
/en/... - English (default)
/pl/... - Polish
/fr/... - French
```

Product information is localized including titles, descriptions, materials, and specifications.

## 🔄 Product Synchronization

Products are managed in both Medusa (for commerce operations) and Sanity (for enhanced content). Key features include:

- Multilingual product content
- Rich media management
- Detailed specifications
- Pricing information
- Related products
