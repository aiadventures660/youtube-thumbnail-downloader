import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | YouTube Thumbnail Downloader",
  description:
    "Learn about our free YouTube thumbnail downloader tool and how it helps content creators and designers.",
}

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 animate-fade-in">About YouTube Thumbnail Downloader</h1>

        <div className="prose prose-lg dark:prose-invert mx-auto">
          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We created this free YouTube Thumbnail Downloader to help content creators, designers, and anyone who
              needs quick access to high-quality YouTube video thumbnails. Our tool is completely free, requires no
              registration, and works instantly.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Simply paste any YouTube video URL into our tool, and we'll instantly extract and display the thumbnail
              image. You can then download it in various resolutions:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <strong>HD (1280x720)</strong> - High Definition quality
              </li>
              <li>
                <strong>HQ (480x360)</strong> - High Quality
              </li>
              <li>
                <strong>MQ (320x180)</strong> - Medium Quality
              </li>
              <li>
                <strong>SD (120x90)</strong> - Standard Definition
              </li>
            </ul>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">100% Free</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  No hidden costs, no premium features, completely free forever.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">No Registration</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Start downloading immediately without creating an account.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">High Quality</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Download thumbnails in the highest available resolution.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Fast & Reliable</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Instant thumbnail extraction and download with 99.9% uptime.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
