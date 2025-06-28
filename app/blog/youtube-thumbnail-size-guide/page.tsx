import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "YouTube Thumbnail Size Guide 2024 - Perfect Dimensions & Measurements",
  description:
    "Complete YouTube thumbnail size guide with perfect dimensions, measurements, and best practices. Learn optimal thumbnail for YouTube size specifications.",
  keywords: [
    "youtube thumbnail size",
    "thumbnail for youtube size",
    "youtube thumbnail measurements",
    "youtube thamble size",
    "youtube thumbnail dimensions",
    "thumbnail size youtube",
    "youtube thumbnail specs",
  ],
}

export default function ThumbnailSizeGuide() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link href="/blog" className="text-red-600 dark:text-red-400 hover:underline">
            ← Back to Blog
          </Link>
        </nav>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
              YouTube Thumbnail Size Guide: Perfect Dimensions for 2024
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <time>January 12, 2024</time>
              <span>•</span>
              <span>4 min read</span>
            </div>
          </header>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">Quick Reference</h2>
            <p className="text-green-800 dark:text-green-200">
              <strong>Optimal YouTube thumbnail size:</strong> 1280x720 pixels (16:9 aspect ratio) with a minimum width
              of 640 pixels and file size under 2MB.
            </p>
          </div>

          <h2>YouTube Thumbnail Size Requirements</h2>
          <p>
            Understanding the correct <strong>YouTube thumbnail size</strong> is crucial for creating
            professional-looking videos that attract viewers. YouTube has specific requirements for{" "}
            <strong>thumbnail for YouTube size</strong> that you must follow.
          </p>

          <h3>Official YouTube Thumbnail Specifications</h3>
          <ul>
            <li>
              <strong>Resolution:</strong> 1280x720 pixels (recommended)
            </li>
            <li>
              <strong>Minimum width:</strong> 640 pixels
            </li>
            <li>
              <strong>Aspect ratio:</strong> 16:9 (widescreen)
            </li>
            <li>
              <strong>File size:</strong> Under 2MB
            </li>
            <li>
              <strong>File formats:</strong> JPG, GIF, PNG, or BMP
            </li>
          </ul>

          <h2>YouTube Thumbnail Measurements Breakdown</h2>
          <p>
            Here are the detailed <strong>YouTube thumbnail measurements</strong> for different quality levels:
          </p>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 my-6">
            <h3 className="text-xl font-semibold mb-4">Standard Thumbnail Sizes</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-red-600 dark:text-red-400">HD Quality</h4>
                <ul className="text-sm space-y-1">
                  <li>• 1280x720 pixels (maxresdefault)</li>
                  <li>• Best for professional use</li>
                  <li>• Highest quality available</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 dark:text-blue-400">High Quality</h4>
                <ul className="text-sm space-y-1">
                  <li>• 480x360 pixels (hqdefault)</li>
                  <li>• Good for web display</li>
                  <li>• Widely supported</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 dark:text-green-400">Medium Quality</h4>
                <ul className="text-sm space-y-1">
                  <li>• 320x180 pixels (mqdefault)</li>
                  <li>• Suitable for mobile</li>
                  <li>• Smaller file size</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-600 dark:text-purple-400">Standard Quality</h4>
                <ul className="text-sm space-y-1">
                  <li>• 120x90 pixels (default)</li>
                  <li>• Smallest size</li>
                  <li>• Basic thumbnail</li>
                </ul>
              </div>
            </div>
          </div>

          <h2>Best Practices for YouTube Thumbnail Size</h2>

          <h3>Design Considerations</h3>
          <p>When creating thumbnails with the correct YouTube thumbnail size:</p>
          <ul>
            <li>
              <strong>Use 1280x720 pixels:</strong> This ensures your thumbnail looks crisp on all devices
            </li>
            <li>
              <strong>Maintain 16:9 aspect ratio:</strong> Prevents cropping or distortion
            </li>
            <li>
              <strong>Keep file size under 2MB:</strong> Ensures fast loading and upload compatibility
            </li>
            <li>
              <strong>Use high contrast:</strong> Makes text and images stand out
            </li>
          </ul>

          <h3>Mobile Optimization</h3>
          <p>
            Since many viewers watch YouTube on mobile devices, consider how your <strong>YouTube thamble size</strong>{" "}
            will appear on smaller screens:
          </p>
          <ul>
            <li>Use larger text that's readable on mobile</li>
            <li>Avoid cluttered designs</li>
            <li>Test your thumbnails on different screen sizes</li>
            <li>Ensure important elements are visible when scaled down</li>
          </ul>

          <h2>Common YouTube Thumbnail Size Mistakes</h2>

          <h3>Wrong Aspect Ratio</h3>
          <p>Using incorrect aspect ratios can result in:</p>
          <ul>
            <li>Black bars on the sides or top/bottom</li>
            <li>Cropped or stretched images</li>
            <li>Unprofessional appearance</li>
            <li>Poor mobile display</li>
          </ul>

          <h3>File Size Issues</h3>
          <p>Problems with file size include:</p>
          <ul>
            <li>Upload failures if over 2MB</li>
            <li>Slow loading times</li>
            <li>Compression artifacts</li>
            <li>Poor image quality</li>
          </ul>

          <h2>Tools for Creating Perfect YouTube Thumbnails</h2>

          <h3>Free Thumbnail Makers</h3>
          <p>Popular tools for creating thumbnails with correct YouTube thumbnail measurements:</p>
          <ul>
            <li>
              <strong>Canva:</strong> Pre-made YouTube thumbnail templates
            </li>
            <li>
              <strong>GIMP:</strong> Free image editor with custom sizing
            </li>
            <li>
              <strong>Photopea:</strong> Browser-based Photoshop alternative
            </li>
            <li>
              <strong>Snappa:</strong> Simple drag-and-drop thumbnail creator
            </li>
          </ul>

          <h3>Professional Tools</h3>
          <ul>
            <li>
              <strong>Adobe Photoshop:</strong> Industry standard for thumbnail design
            </li>
            <li>
              <strong>Adobe Illustrator:</strong> Vector-based thumbnail creation
            </li>
            <li>
              <strong>Figma:</strong> Collaborative design tool
            </li>
          </ul>

          <h2>Testing Your YouTube Thumbnail Size</h2>
          <p>Before uploading, test your thumbnails:</p>
          <ul>
            <li>View at actual size (1280x720) to check clarity</li>
            <li>Scale down to mobile size to test readability</li>
            <li>Check file size and compression</li>
            <li>Test on different backgrounds (light/dark mode)</li>
          </ul>

          <h2>YouTube Thumbnail Size for Different Content Types</h2>

          <h3>Gaming Videos</h3>
          <ul>
            <li>Use game screenshots as background</li>
            <li>Add character faces or reactions</li>
            <li>Include game logos or titles</li>
          </ul>

          <h3>Educational Content</h3>
          <ul>
            <li>Clean, professional design</li>
            <li>Clear, readable text</li>
            <li>Relevant imagery or diagrams</li>
          </ul>

          <h3>Entertainment Videos</h3>
          <ul>
            <li>Bright, eye-catching colors</li>
            <li>Expressive faces or emotions</li>
            <li>Bold text and graphics</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            Mastering the correct <strong>YouTube thumbnail size</strong> is essential for creating professional,
            clickable thumbnails. Remember to use 1280x720 pixels with a 16:9 aspect ratio, keep files under 2MB, and
            optimize for both desktop and mobile viewing.
          </p>

          <p>
            By following these <strong>YouTube thumbnail measurements</strong> and best practices, you'll create
            thumbnails that not only meet YouTube's requirements but also attract more viewers to your content.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">Need Thumbnail Inspiration?</h3>
            <p className="text-blue-800 dark:text-blue-200 mb-4">
              Download thumbnails from successful YouTube videos to analyze their size and design!
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Download YouTube Thumbnails
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}
