import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-6 mt-8">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2 sm:mb-0">
          &copy; {new Date().getFullYear()} youtube thumbnail download
        </div>
        <nav className="flex flex-wrap gap-4 text-sm">
          <Link href="/shorts-thumbnail-downloader" className="hover:text-red-600 transition-colors flex items-center">
            {/* Video Camera Icon */}
            <svg className="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15l5.22 3.13a.75.75 0 001.13-.65V6.52a.75.75 0 00-1.13-.65L15.75 9z" /></svg>
            Shorts Thumbnail Downloader
          </Link>
          <Link href="/youtube-thumbnail-downloader-hd" className="hover:text-red-600 transition-colors flex items-center">
            {/* Arrow Down Tray Icon */}
            <svg className="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-3.75-3.75M12 15l3.75-3.75M21 21H3" /></svg>
            YouTube Thumbnail Downloader HD
          </Link>
          <Link href="/download-youtube-thumbnail-on-mobile" className="hover:text-red-600 transition-colors flex items-center">
            {/* Device Phone Mobile Icon */}
            <svg className="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75v16.5m-9-16.5v16.5M21 7.5v9a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 16.5v-9A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5z" /></svg>
            Download YouTube Thumbnail on Mobile
          </Link>
          <Link href="/how-to-save-youtube-thumbnails" className="hover:text-red-600 transition-colors flex items-center">
            {/* Bookmark Icon */}
            <svg className="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75v10.5a.75.75 0 01-1.13.65L12 15.25l-4.12 2.65a.75.75 0 01-1.13-.65V6.75A2.25 2.25 0 018.25 4.5h7.5A2.25 2.25 0 0117.25 6.75z" /></svg>
            How to Save YouTube Thumbnails
          </Link>
        </nav>
      </div>
    </footer>
  )
} 