import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import Footer from "@/components/footer"

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: "YouTube Thumbnail Downloader - Download HD Thumbnails from YouTube Videos Free",
  description:
    "Free YouTube thumbnail downloader! Download HD thumbnails from any YouTube video instantly. No registration required. Supports multiple sizes (HD, HQ, MQ, SD). Works on all devices. Try the best YouTube thumbnail extractor now!",
  keywords: [
    "youtube thumbnail downloader",
    "download thumbnail from youtube",
    "youtube thumbnail download",
    "yt thumbnail downloader",
    "youtube thumbnail extractor",
    "thumbnail downloader",
    "youtube thumbnail size",
    "thumbnail maker",
    "youtube video thumbnail download",
    "youtube thumbnail background",
    "thumbnail online youtube",
    "youtube thumbnail measurements",
    "free youtube thumbnail downloader",
    "hd youtube thumbnail download",
    "youtube thumbnail grabber",
    "download youtube video thumbnail",
    "youtube thumbnail saver",
    "youtube thumbnail ripper",
    "youtube thumbnail download tool",
    "youtube thumbnail extractor online"
  ],
  authors: [{ name: "YouTube Thumbnail Downloader" }],
  creator: "YouTube Thumbnail Downloader",
  publisher: "YouTube Thumbnail Downloader",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://youtube-thumbnail-downloader.com",
    title: "YouTube Thumbnail Downloader - Download HD Thumbnails from YouTube Videos Free",
    description:
      "Free YouTube thumbnail downloader! Download HD thumbnails from any YouTube video instantly. No registration required. Supports multiple sizes (HD, HQ, MQ, SD). Works on all devices.",
    siteName: "YouTube Thumbnail Downloader",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Download HD Thumbnails from YouTube - Free YouTube Thumbnail Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Thumbnail Downloader - Download HD Thumbnails from YouTube Videos Free",
    description:
      "Free YouTube thumbnail downloader! Download HD thumbnails from any YouTube video instantly. No registration required. Supports multiple sizes (HD, HQ, MQ, SD).",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://youtube-thumbnail-downloader.com",
  },
  generator: 'Next.js',
  metadataBase: new URL('https://youtube-thumbnail-downloader.com'),
  category: 'Web Tools',
  classification: 'Multimedia Tools',
  other: {
    'google-site-verification': 'your-google-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
  }
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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9GVHG9TEDW"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9GVHG9TEDW');
          `
        }} />
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Critical favicon and manifest */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#dc2626" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/favicon.ico" as="image" type="image/x-icon" />
        
        {/* Structured data for Google ranking */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "youtube thumbnail download",
              url: "https://youtube-thumbnail-downloader.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://youtube-thumbnail-downloader.com/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "youtube thumbnail download",
              url: "https://youtube-thumbnail-downloader.com",
              logo: "https://youtube-thumbnail-downloader.com/og-image.jpg",
              sameAs: [
                "https://www.youtube.com/",
                "https://twitter.com/"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://youtube-thumbnail-downloader.com"
                }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How do I download a YouTube thumbnail?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simply paste the YouTube video URL into our downloader and click the download button. You'll get access to multiple thumbnail sizes (HD, HQ, MQ, SD) that you can save to your device."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is this YouTube thumbnail downloader free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our YouTube thumbnail downloader is completely free to use. No registration or payment required."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What thumbnail sizes are available?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We provide multiple thumbnail sizes: HD (1280x720), HQ (480x360), MQ (320x180), and SD (120x90) to suit your needs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to create an account?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No account creation is required. You can download YouTube thumbnails immediately without any registration."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is this tool safe to use?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our tool is completely safe. We don't store any of your data and only process the YouTube URL to extract the thumbnail."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I use this on mobile devices?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our YouTube thumbnail downloader is fully responsive and works on all devices including smartphones and tablets."
                  }
                }
              ]
            })
          }}
        />
        {/* Existing WebApplication/SoftwareApplication schema */}
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
              <AppContent>{children}</AppContent>
          {/* Load analytics after page is interactive */}
          <Suspense fallback={null}>
              <Analytics />
            </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
