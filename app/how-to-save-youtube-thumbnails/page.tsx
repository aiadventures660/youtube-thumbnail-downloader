import ThumbnailDownloader from "@/components/thumbnail-downloader";

export default function HowToSaveYouTubeThumbnailsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">How to Save YouTube Thumbnails</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
        Learn how to save YouTube thumbnails in just a few steps. Paste your YouTube video URL below to get started!
      </p>
      <ThumbnailDownloader />
    </main>
  );
} 