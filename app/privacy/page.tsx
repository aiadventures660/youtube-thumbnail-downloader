import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | YouTube Thumbnail Downloader",
  description:
    "Read our privacy policy to understand how we handle your data when using our YouTube thumbnail downloader.",
}

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 animate-fade-in">Privacy Policy</h1>

        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We are committed to protecting your privacy. Our YouTube Thumbnail Downloader operates with minimal data
              collection:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
              <li>We do not store or log the YouTube URLs you submit</li>
              <li>We do not collect personal information</li>
              <li>We may collect anonymous usage statistics for service improvement</li>
              <li>We use cookies only for essential functionality (dark mode preference)</li>
            </ul>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">How We Use Information</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Any information we collect is used solely to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
              <li>Provide and maintain our service</li>
              <li>Improve user experience</li>
              <li>Monitor service performance and reliability</li>
              <li>Prevent abuse and ensure service security</li>
            </ul>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our service interacts with YouTube's public API to extract thumbnail information. We do not share any user
              data with third parties for marketing or advertising purposes.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We implement appropriate security measures to protect against unauthorized access, alteration, disclosure,
              or destruction of your personal information. Since we don't store personal data, your privacy is
              inherently protected.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us through our contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
