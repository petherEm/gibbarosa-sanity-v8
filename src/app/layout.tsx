import { Metadata } from "next";
import "./globals.css";
import { Inter, Staatliches } from "next/font/google";
import { getBaseURL } from "@/lib/util/env";
import { ProgressBar } from "@/components/shared/progress-bar";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "sonner";

const staatliches = Staatliches({
  subsets: ["latin"],
  weight: ["400", "400"],
  style: ["normal"],
  display: "swap",
  variable: "--font-staatliches",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "Gibbarosa v8 (Sanity) | Preowned Luxury",
  description: "Gibbarosa v8 - Preowned Luxury",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${staatliches.variable} ${inter.variable}`}
    >
      <body className={`${inter.className} text-basic-primary`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          // disableTransitionOnChange
        >
          <ProgressBar />

          <Toaster position="bottom-right" offset={65} closeButton />
          <main className="relative">{props.children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
