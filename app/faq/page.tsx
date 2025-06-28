import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "FAQ - YouTube Thumbnail Downloader | Common Questions & Answers",
  description:
    "Find answers to frequently asked questions about our YouTube thumbnail downloader. Learn how to download thumbnails, supported formats, and troubleshooting tips.",
  keywords: [
    "youtube thumbnail downloader faq",
    "youtube thumbnail download questions",
    "youtube thumbnail downloader help",
    "youtube thumbnail downloader support",
    "youtube thumbnail downloader tutorial",
    "youtube thumbnail downloader guide",
    "youtube thumbnail downloader troubleshooting",
    "youtube thumbnail downloader how to",
  ],
}

export default function FAQ() {
  const faqs = [
    {
      question: "How do I download a YouTube thumbnail?",
      answer: "Simply paste the YouTube video URL into our downloader and click the download button. You'll get access to multiple thumbnail sizes (HD, HQ, MQ, SD) that you can save to your device."
    },
    {
      question: "Is this YouTube thumbnail downloader free?",
      answer: "Yes, our YouTube thumbnail downloader is completely free to use. No registration or payment required."
    },
    {
      question: "What thumbnail sizes are available?",
      answer: "We provide multiple thumbnail sizes: HD (1280x720), HQ (480x360), MQ (320x180), and SD (120x90) to suit your needs."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account creation is required. You can download YouTube thumbnails immediately without any registration."
    },
    {
      question: "Is this tool safe to use?",
      answer: "Yes, our tool is completely safe. We don't store any of your data and only process the YouTube URL to extract the thumbnail."
    },
    {
      question: "Can I use this on mobile devices?",
      answer: "Yes, our YouTube thumbnail downloader is fully responsive and works on all devices including smartphones and tablets."
    },
    {
      question: "What file formats are supported?",
      answer: "Our tool downloads thumbnails in JPG format, which is the standard format used by YouTube for thumbnails."
    },
    {
      question: "Can I download thumbnails from private videos?",
      answer: "No, you can only download thumbnails from public YouTube videos. Private or unlisted videos are not accessible."
    },
    {
      question: "How fast is the download process?",
      answer: "Downloads are typically instant. Our tool processes the YouTube URL and provides thumbnail links immediately."
    },
    {
      question: "Are there any download limits?",
      answer: "No, there are no limits on how many thumbnails you can download. Use our tool as much as you need."
    },
    {
      question: "Can I use downloaded thumbnails commercially?",
      answer: "Thumbnail usage rights depend on the original video's copyright. Always respect copyright laws and seek permission when needed."
    },
    {
      question: "What if the thumbnail doesn't download?",
      answer: "Try refreshing the page, check your internet connection, or ensure the YouTube URL is correct and the video is public."
    },
    {
      question: "Do you store my data?",
      answer: "No, we don't store any personal data or YouTube URLs. Your privacy is protected."
    },
    {
      question: "Can I download thumbnails from YouTube Shorts?",
      answer: "Yes, you can download thumbnails from YouTube Shorts videos using the same process."
    },
    {
      question: "Is there a browser extension available?",
      answer: "Currently, we offer a web-based tool. Browser extensions may be available in the future."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link href="/" className="text-red-600 dark:text-red-400 hover:underline">
            ← Back to Home
          </Link>
        </nav>

        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our YouTube thumbnail downloader. Can't find what you're looking for? 
            <Link href="/contact" className="text-red-600 dark:text-red-400 hover:underline ml-1">
              Contact us
            </Link> for additional support.
          </p>
        </header>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Still Need Help?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Contact Support</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get in touch with our support team for personalized assistance.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Read Our Blog</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Explore our blog for detailed guides and tutorials.
              </p>
              <Link
                href="/blog"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Visit Blog
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-2">Ready to Download Thumbnails?</h3>
          <p className="text-red-800 dark:text-red-200 mb-4">
            Now that you have all the answers, try our YouTube thumbnail downloader!
          </p>
          <Link
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Start Downloading
          </Link>
        </section>
      </div>
    </div>
  )
} 