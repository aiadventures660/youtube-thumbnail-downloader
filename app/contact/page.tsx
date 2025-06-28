import type { Metadata } from "next"
import ContactForm from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | YouTube Thumbnail Downloader",
  description: "Get in touch with us for support, feedback, or questions about our YouTube thumbnail downloader.",
}

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 animate-fade-in">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Have questions, suggestions, or need help with our YouTube Thumbnail Downloader? We'd love to hear from
              you! Send us a message and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-gray-600 dark:text-gray-300">nrpgroup.pvt@gmail.com</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5.75A2.75 2.75 0 015.75 3h2.5A2.75 2.75 0 0111 5.75v.5c0 .414-.336.75-.75.75h-2.5A.75.75 0 017 6.25v-.5zm0 0v12.5A2.75 2.75 0 005.75 21h2.5A2.75 2.75 0 0011 18.25v-.5c0-.414-.336-.75-.75-.75h-2.5a.75.75 0 01-.75-.75v-.5zm10-7.5h2.5A2.75 2.75 0 0121 5.75v12.5A2.75 2.75 0 0118.25 21h-2.5A2.75 2.75 0 0113 18.25v-.5c0-.414.336-.75.75-.75h2.5a.75.75 0 00.75-.75v-.5z"/>
                  </svg>
                </div>
                <span className="text-gray-600 dark:text-gray-300">+91 8825193614</span>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
