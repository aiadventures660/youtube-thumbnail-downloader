import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "youtube thumbnail download - Download Thumbnail from YouTube Videos",
  description:
    "Quick and easy YouTube thumbnail download! Use our fast thumbnail downloader to save HD thumbnails from any video. No sign-up needed. Works on all devices! Try the best YouTube thumbnail downloader now!",
  keywords: [
    "download thumbnail from youtube",
    "youtube thumbnail downloader",
    "youtube thumbnail download",
    "yt thumbnail downloader",
    "thumbnail downloader",
    "youtube thumbnail size",
    "thumbnail maker",
    "youtube video thumbnail download",
    "youtube thumbnail background",
    "thumbnail online youtube",
    "youtube thumbnail measurements",
  ],
  authors: [{ name: "youtube thumbnail download" }],
  creator: "youtube thumbnail download",
  publisher: "youtube thumbnail download",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://youtube-thumbnail-downloader.com",
    title: "youtube thumbnail download - Download Thumbnail from YouTube Videos",
    description:
      "Quick and easy YouTube thumbnail download! Use our fast thumbnail downloader to save HD thumbnails from any video. No sign-up needed. Works on all devices! Try the best YouTube thumbnail downloader now!",
    siteName: "youtube thumbnail download",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Download Thumbnail from YouTube - youtube thumbnail download",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "youtube thumbnail download - Download Thumbnail from YouTube Videos",
    description:
      "Quick and easy YouTube thumbnail download! Use our fast thumbnail downloader to save HD thumbnails from any video. No sign-up needed. Works on all devices! Try the best YouTube thumbnail downloader now!",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://youtube-thumbnail-downloader.com",
  },
    generator: 'v0.dev'
}

function AppContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#dc2626" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["WebApplication", "SoftwareApplication"],
              name: "youtube thumbnail download - Download Thumbnail from YouTube",
              description:
                "Quick and easy YouTube thumbnail download! Use our fast thumbnail downloader to save HD thumbnails from any video. No sign-up needed. Works on all devices! Try the best YouTube thumbnail downloader now!",
              url: "https://youtube-thumbnail-downloader.com",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Download thumbnail from YouTube",
                "youtube thumbnail download",
                "Multiple thumbnail sizes (HD, HQ, MQ, SD)",
                "YouTube thumbnail extractor",
                "No registration required",
                "Free to use",
                "Mobile responsive",
                "Dark mode support",
              ],
              screenshot: "https://youtube-thumbnail-downloader.com/screenshot.jpg",
              author: {
                "@type": "Organization",
                name: "youtube thumbnail download",
              },
              keywords:
                "download thumbnail from youtube, youtube thumbnail download, yt thumbnail downloader, youtube thumbnail extractor",
            }),
          }}
        />
      </head>
      <body className={`font-inter antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Suspense fallback={null}>
            <AppContent>{children}</AppContent>
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
