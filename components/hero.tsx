"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load the ThumbnailDownloader component with improved loading strategy
const ThumbnailDownloader = dynamic(() => import("./thumbnail-downloader"), {
  ssr: true
})

// Optimized loading component
function ThumbnailDownloaderWrapper() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    }>
      <ThumbnailDownloader />
    </Suspense>
  )
}

export default function Hero() {
  return (
    <section className="text-center py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight font-poppins">
          Download Thumbnail from <span className="text-red-600">YouTube</span>
        </h1>

        {/* YouTube Thumbnail Downloader Card - positioned right after H1 */}
        <div className="mb-6">
          <ThumbnailDownloaderWrapper />
        </div>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
          Quick and easy YouTube thumbnail download! Use our fast thumbnail downloader to save HD thumbnails from any video. No sign-up needed. Works on all devices!
        </p>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            100% Free
          </span>
          <span className="flex items-center bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            No Registration
          </span>
          <span className="flex items-center bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            HD Quality
          </span>
        </div>
      </div>
    </section>
  )
}
