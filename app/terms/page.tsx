import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions | YouTube Thumbnail Downloader",
  description:
    "Read our terms and conditions to understand the rules and guidelines for using our YouTube thumbnail downloader service.",
}

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 animate-fade-in">Terms and Conditions</h1>

        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Permission is granted to temporarily download one copy of the materials (information or software) on YouTube Thumbnail Downloader's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
              <li>attempt to decompile or reverse engineer any software contained on YouTube Thumbnail Downloader's website</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
              <li>transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The materials on YouTube Thumbnail Downloader's website are provided on an 'as is' basis. YouTube Thumbnail Downloader makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              In no event shall YouTube Thumbnail Downloader or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on YouTube Thumbnail Downloader's website, even if YouTube Thumbnail Downloader or a YouTube Thumbnail Downloader authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">5. Accuracy of Materials</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The materials appearing on YouTube Thumbnail Downloader's website could include technical, typographical, or photographic errors. YouTube Thumbnail Downloader does not warrant that any of the materials on its website are accurate, complete or current. YouTube Thumbnail Downloader may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">6. Links</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              YouTube Thumbnail Downloader has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by YouTube Thumbnail Downloader of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">7. Modifications</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              YouTube Thumbnail Downloader may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">8. Google AdSense Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              This website uses Google AdSense for advertising purposes. By using this website, you acknowledge and agree to the following AdSense-specific terms:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
              <li>You understand that Google AdSense may display advertisements on this website</li>
              <li>You agree not to click on ads for the purpose of generating revenue fraudulently</li>
              <li>You understand that ad placement and content are controlled by Google AdSense</li>
              <li>You agree not to use any automated tools or methods to interact with advertisements</li>
              <li>You understand that this website complies with Google AdSense policies and guidelines</li>
            </ul>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">9. Privacy Policy</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, to understand our practices.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact us through our contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 