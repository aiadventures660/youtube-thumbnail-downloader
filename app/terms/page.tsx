import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | YouTube Thumbnail Downloader",
  description:
    "Read our terms of service to understand the conditions for using our YouTube thumbnail downloader.",
}

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 animate-fade-in">Terms of Service</h1>

        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              By accessing and using this YouTube Thumbnail Downloader service, you accept and agree to be bound by the
              terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Permission is granted to temporarily download one copy of the materials (information or software) on
              YouTube Thumbnail Downloader's website for personal, non-commercial transitory viewing only.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our service allows users to download thumbnail images from YouTube videos. We do not host, store, or
              distribute any video content. We only provide access to publicly available thumbnail images through
              YouTube's public API.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Users are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
              <li>Ensuring they have the right to download and use any thumbnails</li>
              <li>Complying with YouTube's Terms of Service</li>
              <li>Not using the service for any illegal or unauthorized purpose</li>
              <li>Not interfering with or disrupting the service</li>
            </ul>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The materials on YouTube Thumbnail Downloader's website are provided on an 'as is' basis. YouTube
              Thumbnail Downloader makes no warranties, expressed or implied, and hereby disclaims and negates all
              other warranties including without limitation, implied warranties or conditions of merchantability,
              fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              In no event shall YouTube Thumbnail Downloader or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business interruption) arising out of
              the use or inability to use the materials on YouTube Thumbnail Downloader's website.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Revisions and Errata</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The materials appearing on YouTube Thumbnail Downloader's website could include technical, typographical,
              or photographic errors. YouTube Thumbnail Downloader does not warrant that any of the materials on its
              website are accurate, complete, or current.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Links</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              YouTube Thumbnail Downloader has not reviewed all of the sites linked to its website and is not
              responsible for the contents of any such linked site. The inclusion of any link does not imply
              endorsement by YouTube Thumbnail Downloader of the site.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Modifications</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              YouTube Thumbnail Downloader may revise these terms of service for its website at any time without
              notice. By using this website you are agreeing to be bound by the then current version of these Terms
              of Service.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us through our contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 