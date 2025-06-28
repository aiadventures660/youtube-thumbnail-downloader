"use client"

import ThumbnailDownloader from "./thumbnail-downloader"

export default function Hero() {
  return (
    <section className="text-center py-12 sm:py-16 lg:py-20 animate-fade-in bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight font-poppins">
          Download Thumbnail from YouTube
          
        </h1>

        {/* YouTube Thumbnail Downloader Card - positioned right after H1 */}
        <div className="mb-8">
          <ThumbnailDownloader />
        </div>

        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Quick and easy YouTube thumbnail download! Use our fast thumbnail downloader to save HD thumbnails from any video. No sign-up needed. Works on all devices! Try the best YouTube thumbnail downloader now!
        </p>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            100% Free YouTube Thumbnail Download
          </span>
          <span className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            No Registration Required
          </span>
          <span className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            HD Quality YouTube Thumbnails
          </span>
        </div>
      </div>
    </section>
  )
}
