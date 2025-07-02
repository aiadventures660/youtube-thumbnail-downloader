import ThumbnailDownloader from "@/components/thumbnail-downloader";

export default function DownloadYouTubeThumbnailOnMobilePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Download YouTube Thumbnail on Mobile</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
        Easily download YouTube thumbnails directly to your mobile device. Paste the video URL below to get started!
      </p>
      <ThumbnailDownloader />
    </main>
  );
} 