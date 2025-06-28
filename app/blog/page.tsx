import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "YouTube Thumbnail Downloader Blog | SEO Tips & Thumbnail Guide",
  description:
    "Learn how to download thumbnail from YouTube, optimize YouTube thumbnails, and use keyword research tools. Complete guide for YouTube thumbnail downloader and SEO strategies.",
  keywords: [
    "download thumbnail from youtube",
    "youtube thumbnail downloader",
    "thumbnail downloader",
    "youtube thumbnail size",
    "keyword research",
    "google keyword planner",
    "thumbnail maker",
    "youtube tag generator",
    "yt thumbnail downloader",
    "youtube thumbnail background",
  ],
}

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Complete Guide: How to Download Thumbnail from YouTube in 2024",
      excerpt:
        "Learn the best methods to download thumbnail from YouTube using our free thumbnail downloader. Step-by-step guide for HD quality thumbnails.",
      date: "2024-01-15",
      readTime: "5 min read",
      slug: "download-thumbnail-from-youtube-guide",
    },
    {
      id: 2,
      title: "YouTube Thumbnail Size Guide: Perfect Dimensions for 2024",
      excerpt:
        "Discover the optimal YouTube thumbnail size, measurements, and best practices for creating eye-catching thumbnails that boost click-through rates.",
      date: "2024-01-12",
      readTime: "4 min read",
      slug: "youtube-thumbnail-size-guide",
    },
    {
      id: 3,
      title: "Free Keyword Research Tools: Google Keyword Planner vs Alternatives",
      excerpt:
        "Compare the best free keyword research tools including Google Keyword Planner, Ahrefs keyword generator, and other keyword tools for SEO success.",
      date: "2024-01-10",
      readTime: "7 min read",
      slug: "free-keyword-research-tools-comparison",
    },
    {
      id: 4,
      title: "YouTube Tag Generator: Best Free Tools for Video Optimization",
      excerpt:
        "Discover the top YouTube tag generator tools to optimize your videos. Learn how to use free YouTube tag generators and tag creators effectively.",
      date: "2024-01-08",
      readTime: "6 min read",
      slug: "youtube-tag-generator-tools",
    },
    {
      id: 5,
      title: "Thumbnail Maker Guide: Create Professional YouTube Thumbnails",
      excerpt:
        "Master thumbnail creation with the best thumbnail maker tools. Learn about YouTube thumbnail background design and thumb maker techniques.",
      date: "2024-01-05",
      readTime: "8 min read",
      slug: "thumbnail-maker-guide",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            YouTube Thumbnail & SEO Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Expert guides on YouTube thumbnail downloader tools, keyword research, and SEO optimization strategies to
            grow your channel.
          </p>
        </header>

        <div className="grid gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <time className="text-sm text-gray-500 dark:text-gray-400">{post.date}</time>
                <span className="text-sm text-red-600 dark:text-red-400 font-medium">{post.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
              >
                Read More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        <section className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Popular Topics & Keywords
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Thumbnail Tools</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Download thumbnail from YouTube</li>
                <li>• YouTube thumbnail downloader</li>
                <li>• Thumbnail downloader free</li>
                <li>• YT thumbnail downloader</li>
                <li>• YouTube video thumbnail download</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Keyword Research</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Google Keyword Planner</li>
                <li>• Free keyword research tool</li>
                <li>• Ahrefs keyword generator</li>
                <li>• Keyword tool free</li>
                <li>• Google key planner</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">YouTube Optimization</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• YouTube tag generator</li>
                <li>• YouTube thumbnail size</li>
                <li>• Thumbnail maker</li>
                <li>• YouTube thumbnail background</li>
                <li>• YouTube tags generator free</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
