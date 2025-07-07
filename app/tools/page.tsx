"use client";
import Link from "next/link";

const tools = [
  {
    href: "/tools/thumbnail-previewer",
    icon: "👁️",
    title: "YouTube Thumbnail Previewer",
    desc: "Preview your thumbnail in YouTube-like frames (desktop, mobile, search, sidebar)."
  },
  {
    href: "/tools/channel-logo-downloader",
    icon: "🖼️",
    title: "Channel Logo Downloader",
    desc: "Download any YouTube channel's profile picture by URL or ID."
  },
  {
    href: "/tools/playlist-thumbnail-downloader",
    icon: "📋",
    title: "Playlist Thumbnail Downloader",
    desc: "Download all thumbnails from a YouTube playlist."
  },
  {
    href: "/tools/keyword-research",
    icon: "🔑",
    title: "Keyword Research Tool",
    desc: "Find the best keywords for your YouTube videos."
  },
  {
    href: "/tools/title-description-generator",
    icon: "✍️",
    title: "Title & Description Generator",
    desc: "Generate catchy titles and descriptions for your videos."
  },
  {
    href: "/tools/hashtag-generator",
    icon: "#️⃣",
    title: "Hashtag Generator",
    desc: "Find trending hashtags for your YouTube videos."
  },
  {
    href: "/tools/analytics",
    icon: "📊",
    title: "YouTube Analytics Tool",
    desc: "Analyze your channel and video performance."
  },
  {
    href: "/tools/image-resizer",
    icon: "📐",
    title: "Image Resizer & Compressor",
    desc: "Resize and compress images for YouTube."
  },
  {
    href: "/tools/bulk-url-extractor",
    icon: "🔗",
    title: "Bulk YouTube URL Extractor",
    desc: "Extract all video URLs from a channel or playlist."
  },
  {
    href: "/tools/youtube-to-mp3",
    icon: "🎵",
    title: "YouTube to MP3 Converter",
    desc: "Convert YouTube videos to MP3 audio. (Legal notice applies)"
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">YouTube Tools Suite</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-4xl mb-2">{tool.icon}</div>
            <div className="font-semibold text-lg">{tool.title}</div>
            <div className="text-xs text-gray-500 mt-1">{tool.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
} 