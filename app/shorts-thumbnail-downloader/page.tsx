import ThumbnailDownloader from "@/components/thumbnail-downloader";

export default function ShortsThumbnailDownloaderPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">YouTube Shorts Thumbnail Downloader</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
        Download high-quality thumbnails from any YouTube Shorts video. Paste the Shorts URL below to get started!
      </p>
      <ThumbnailDownloader />
    </main>
  );
} 