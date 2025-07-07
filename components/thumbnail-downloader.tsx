"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Download, AlertCircle, CheckCircle, Copy, ExternalLink } from "lucide-react"
import { extractVideoId, getThumbnailUrls, getVideoInfo, extractPlaylistId } from "@/lib/youtube-utils"
import JSZip from 'jszip';
import { useRouter } from "next/navigation";

interface ThumbnailData {
  videoId: string
  title: string
  thumbnails: {
    maxresdefault: string
    hqdefault: string
    mqdefault: string
    sddefault: string
    default: string
  }
  videoUrl: string
}

type QualityKey = keyof ThumbnailData["thumbnails"]

// Place your YouTube Data API key here
const YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY_HERE";

async function fetchPlaylistVideoIds(playlistId: string): Promise<string[]> {
  let videoIds: string[] = [];
  let nextPageToken = '';
  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) break;
    const data = await res.json();
    videoIds.push(...(data.items?.map((item: any) => item.contentDetails.videoId).filter(Boolean) || []));
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);
  return videoIds;
}

export default function ThumbnailDownloader() {
  const [url, setUrl] = useState("")
  const [thumbnailData, setThumbnailData] = useState<ThumbnailData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedQuality, setSelectedQuality] = useState<QualityKey>("maxresdefault")
  const [copied, setCopied] = useState(false)
  const [downloadingQuality, setDownloadingQuality] = useState<string | null>(null)
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({})
  const [mode, setMode] = useState<'single' | 'bulk'>('single');
  const [bulkUrls, setBulkUrls] = useState('');
  const [bulkThumbnails, setBulkThumbnails] = useState<ThumbnailData[]>([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkError, setBulkError] = useState('');
  const [bulkResults, setBulkResults] = useState<{success: ThumbnailData[], failed: string[]}>({success: [], failed: []});
  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [aspect, setAspect] = useState<'original' | '1:1' | '16:9' | '4:3'>('original');

  const router = useRouter();

  function getAspectDims(width: number, height: number, aspect: string) {
    if (aspect === 'original') return { w: width, h: height };
    let targetW = width, targetH = height;
    if (aspect === '1:1') {
      const size = Math.min(width, height);
      return { w: size, h: size };
    }
    if (aspect === '16:9') {
      const w = width, h = Math.round(width * 9 / 16);
      if (h <= height) return { w, h };
      return { w: Math.round(height * 16 / 9), h: height };
    }
    if (aspect === '4:3') {
      const w = width, h = Math.round(width * 3 / 4);
      if (h <= height) return { w, h };
      return { w: Math.round(height * 4 / 3), h: height };
    }
    return { w: width, h: height };
  }

  async function processImage(url: string, format: string, aspect: string): Promise<Blob> {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    const { w, h } = getAspectDims(img.width, img.height, aspect);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported');
    // Center crop
    const sx = (img.width - w) / 2;
    const sy = (img.height - h) / 2;
    ctx.drawImage(img, sx, sy, w, h, 0, 0, w, h);
    return await new Promise((resolve) => canvas.toBlob(resolve, format));
  }

  // Quality options (static English)
  const qualityOptions = useMemo(
    () => [
      {
        key: "maxresdefault" as const,
        label: "HD",
        description: "1280x720",
        size: "High Definition",
        recommended: true,
      },
      {
        key: "hqdefault" as const,
        label: "HQ",
        description: "480x360",
        size: "High Quality",
      },
      {
        key: "mqdefault" as const,
        label: "MQ",
        description: "320x180",
        size: "Medium Quality",
      },
      {
        key: "sddefault" as const,
        label: "SD",
        description: "120x90",
        size: "Standard Definition",
      },
      {
        key: "default" as const,
        label: "Default",
        description: "120x90",
        size: "Thumbnail",
      },
    ],
    [],
  )

  // Load last searched video from localStorage with validation
  useEffect(() => {
    const lastVideo = localStorage.getItem("lastYouTubeVideo")
    if (lastVideo) {
      try {
        const data = JSON.parse(lastVideo)

        // Validate the data structure and check if it's recent (within 1 hour)
        const isValidData =
          data && data.videoId && data.thumbnails && data.timestamp && typeof data.timestamp === "number"

        const isRecent = data.timestamp && Date.now() - data.timestamp < 60 * 60 * 1000 // 1 hour in milliseconds

        // Only restore if data is valid, recent, and we don't have current data
        if (isValidData && isRecent && !thumbnailData) {
          setThumbnailData(data)
          // Also restore the URL if it exists
          if (data.videoUrl) {
            setUrl(data.videoUrl)
          }
        } else if (!isRecent) {
          // Clear old data from localStorage
          localStorage.removeItem("lastYouTubeVideo")
        }
      } catch (e) {
        // Clear corrupted data from localStorage
        localStorage.removeItem("lastYouTubeVideo")
      }
    }
  }, [thumbnailData])

  const clearThumbnailData = useCallback(() => {
    setThumbnailData(null)
    setUrl("")
    setError("")
    setSelectedQuality("maxresdefault")
    setCopied(false)
    localStorage.removeItem("lastYouTubeVideo")
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError("")
      setLoading(true)
      setCopied(false) // Reset copied state

      try {
        const videoId = extractVideoId(url)
        if (!videoId) {
          throw new Error("Invalid YouTube URL. Please enter a valid YouTube video URL.")
        }

        const thumbnails = getThumbnailUrls(videoId)
        const videoInfo = getVideoInfo(url)

        const data: ThumbnailData = {
          videoId,
          title: videoInfo.title || `YouTube Video ${videoId}`,
          thumbnails,
          videoUrl: url,
        }

        setThumbnailData(data)

        // Save to localStorage with timestamp and expiration
        const savedData = {
          ...data,
          timestamp: Date.now(),
          expires: Date.now() + 60 * 60 * 1000, // Expire in 1 hour
        }
        localStorage.setItem("lastYouTubeVideo", JSON.stringify(savedData))

        // Track analytics event
        if (typeof window !== "undefined" && (window as any).gtag) {
          ;(window as any).gtag("event", "thumbnail_extracted", {
            video_id: videoId,
            quality: selectedQuality,
          })
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred. Please try again."
        setError(errorMessage)
        setThumbnailData(null)
        // Clear localStorage on error
        localStorage.removeItem("lastYouTubeVideo")
      } finally {
        setLoading(false)
      }
    },
    [url, selectedQuality],
  )

  const downloadThumbnail = useCallback(
    async (thumbnailUrl: string, quality: string) => {
      try {
        setDownloadingQuality(quality)
        setDownloadProgress((prev) => ({ ...prev, [quality]: 0 }))

        // First, scroll to the preview image section smoothly
        const previewSection = document.getElementById("thumbnail-preview")
        if (previewSection) {
          previewSection.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          })

          // Wait for scroll to complete before starting download
          await new Promise((resolve) => setTimeout(resolve, 800))
        }

        // Show progress feedback
        setDownloadProgress((prev) => ({ ...prev, [quality]: 25 }))

        // Create a more robust download mechanism
        const response = await fetch(thumbnailUrl, {
          method: "GET",
          headers: {
            Accept: "image/*",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        setDownloadProgress((prev) => ({ ...prev, [quality]: 50 }))

        // Get the blob data
        const blob = await response.blob()
        setDownloadProgress((prev) => ({ ...prev, [quality]: 75 }))

        // Create download link
        const blobUrl = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = blobUrl
        link.download = `youtube-thumbnail-${thumbnailData?.videoId}-${quality}.jpg`
        link.style.display = "none"

        // Add to DOM, click, and remove
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Clean up blob URL
        window.URL.revokeObjectURL(blobUrl)

        setDownloadProgress((prev) => ({ ...prev, [quality]: 100 }))

        // Track analytics event
        if (typeof window !== "undefined" && (window as any).gtag) {
          ;(window as any).gtag("event", "thumbnail_downloaded", {
            video_id: thumbnailData?.videoId,
            quality: quality,
          })
        }

        // Show success feedback briefly
        setTimeout(() => {
          setDownloadingQuality(null)
          setDownloadProgress((prev) => {
            const newProgress = { ...prev }
            delete newProgress[quality]
            return newProgress
          })
        }, 1500)
      } catch (err) {
        console.error("Download failed:", err)

        // Fallback download method
        try {
          const link = document.createElement("a")
          link.href = thumbnailUrl
          link.download = `youtube-thumbnail-${thumbnailData?.videoId}-${quality}.jpg`
          link.target = "_blank"
          link.rel = "noopener noreferrer"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } catch (fallbackErr) {
          // Final fallback - open in new tab
          window.open(thumbnailUrl, "_blank")
        }

        setError("Download failed. Please try again later.")
        setDownloadingQuality(null)
        setDownloadProgress((prev) => {
          const newProgress = { ...prev }
          delete newProgress[quality]
          return newProgress
        })
      }
    },
    [thumbnailData?.videoId],
  )

  const copyThumbnailUrl = useCallback(async () => {
    if (thumbnailData) {
      try {
        await navigator.clipboard.writeText(thumbnailData.thumbnails[selectedQuality])
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)

        // Track analytics event
        if (typeof window !== "undefined" && (window as any).gtag) {
          ;(window as any).gtag("event", "url_copied", {
            video_id: thumbnailData.videoId,
            quality: selectedQuality,
          })
        }
      } catch (err) {
        setError("Failed to copy URL. Please try again.")
      }
    }
  }, [thumbnailData, selectedQuality])

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="animate-fade-in-up shadow-xl border-0 bg-white dark:bg-gray-800 transition-colors duration-300 overflow-hidden relative">
        {/* Animated glowing border */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-red-500 opacity-75 animate-spin-slow blur-sm"></div>
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500 via-pink-500 via-purple-500 to-blue-500 opacity-50 animate-pulse blur-md"></div>

        {/* Inner card content with enhanced glow */}
        <div className="relative m-[2px] rounded-lg bg-white dark:bg-gray-800 shadow-inner">
          <CardContent className="relative z-10 p-6 sm:p-8 rounded-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-lg shadow-purple-500/10 dark:shadow-purple-400/20">
            <div className="mb-6 flex gap-2">
              <Button
                type="button"
                className={mode === 'single' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}
                onClick={() => setMode('single')}
              >
                Single
              </Button>
              <Button
                type="button"
                className={mode === 'bulk' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}
                onClick={() => setMode('bulk')}
              >
                Bulk
              </Button>
            </div>

            {mode === 'single' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Input
                        id="youtube-url"
                        type="url"
                        placeholder="Enter YouTube video URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="h-12 text-base bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:shadow-lg focus:shadow-blue-500/25 hover:shadow-md hover:shadow-purple-500/10 transition-all duration-300 pr-10"
                        required
                        aria-describedby={error ? "url-error" : undefined}
                      />
                      {url && (
                        <button
                          type="button"
                          onClick={clearThumbnailData}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                          title="Clear form"
                          aria-label="Clear form"
                        >
                          ×
                        </button>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={loading || !url.trim()}
                      className="h-12 px-6 sm:px-8 bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed btn-hover-lift"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </div>
                      ) : (
                        "Get Thumbnail"
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <div
                    className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 animate-fade-in"
                    role="alert"
                    id="url-error"
                  >
                    <AlertCircle size={20} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {thumbnailData && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <CheckCircle size={20} aria-hidden="true" />
                      <div className="font-medium">Success, Your YouTube thumbnail is ready!</div>
                      <a
                        href={thumbnailData.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold underline"
                        aria-label="Open original video"
                      >
                        View Video
                      </a>
                      <button
                        onClick={clearThumbnailData}
                        className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                        title="Clear results"
                        aria-label="Clear results"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Quality Selector */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Select Quality
                      </label>
                      <div
                        className="grid grid-cols-2 lg:grid-cols-5 gap-3"
                        role="radiogroup"
                        aria-label="Thumbnail quality options"
                      >
                        {qualityOptions.map((option) => (
                          <button
                            key={option.key}
                            type="button"
                            onClick={() => setSelectedQuality(option.key)}
                            className={`relative p-4 rounded-lg border text-left transition-all duration-200 ${
                              selectedQuality === option.key
                                ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 shadow-md ring-2 ring-red-200 dark:ring-red-800"
                                : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700 hover:shadow-sm"
                            }`}
                            role="radio"
                            aria-checked={selectedQuality === option.key}
                            aria-label={`${option.label} quality - ${option.description}`}
                          >
                            {option.recommended && (
                              <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                                Best
                              </div>
                            )}
                            <div className="font-semibold text-lg">{option.label}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{option.description}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{option.size}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Format</label>
                        <select value={format} onChange={e => setFormat(e.target.value as any)} className="border rounded px-2 py-1">
                          <option value="image/jpeg">JPG</option>
                          <option value="image/png">PNG</option>
                          <option value="image/webp">WEBP</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Aspect Ratio</label>
                        <select value={aspect} onChange={e => setAspect(e.target.value as any)} className="border rounded px-2 py-1">
                          <option value="original">Original</option>
                          <option value="1:1">Square (1:1)</option>
                          <option value="16:9">16:9</option>
                          <option value="4:3">4:3</option>
                        </select>
                      </div>
                    </div>

                    {/* Thumbnail Preview */}
                    <div className="text-center" id="thumbnail-preview">
                      <div className="inline-block bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 shadow-inner">
                        <img
                          src={thumbnailData.thumbnails[selectedQuality] || "/placeholder.svg"}
                          alt={`YouTube Thumbnail Preview - ${thumbnailData.title}`}
                          className="max-w-full h-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-xl"
                          style={{ maxHeight: "400px" }}
                          onError={(e) => {
                            // Fallback chain for better reliability
                            const img = e.target as HTMLImageElement
                            if (selectedQuality === "maxresdefault") {
                              img.src = thumbnailData.thumbnails.hqdefault
                            } else if (selectedQuality === "hqdefault") {
                              img.src = thumbnailData.thumbnails.mqdefault
                            } else if (selectedQuality === "mqdefault") {
                              img.src = thumbnailData.thumbnails.default
                            }
                          }}
                          loading="lazy"
                        />
                      </div>

                      <div className="mt-6 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            onClick={async () => {
                              const url = thumbnailData.thumbnails[selectedQuality];
                              const blob = await processImage(url, format, aspect);
                              const link = document.createElement('a');
                              link.href = URL.createObjectURL(blob);
                              link.download = `youtube-thumbnail-${thumbnailData.videoId}.${format.split('/')[1]}`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                            disabled={downloadingQuality === selectedQuality}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-medium transition-all duration-200 btn-hover-lift relative overflow-hidden"
                          >
                            {downloadingQuality === selectedQuality ? (
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>
                                  {downloadProgress[selectedQuality] === 100
                                    ? "Completed"
                                    : `${downloadProgress[selectedQuality] || 0}%`}
                                </span>
                              </div>
                            ) : (
                              <>
                                <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                                Download
                              </>
                            )}

                            {/* Progress bar overlay */}
                            {downloadingQuality === selectedQuality && downloadProgress[selectedQuality] && (
                              <div
                                className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-300"
                                style={{ width: `${downloadProgress[selectedQuality]}%` }}
                              />
                            )}
                          </Button>

                          <Button
                            onClick={() => {
                              const url = `/edit?img=${encodeURIComponent(thumbnailData.thumbnails[selectedQuality])}`;
                              router.push(url);
                            }}
                            style={{ backgroundColor: '#1976d2', color: '#fff', border: 'none' }}
                            className="px-6 py-3 font-medium transition-all duration-200 btn-hover-lift ml-0 sm:ml-2"
                          >
                            Edit this thumbnail
                          </Button>

                          <Button
                            onClick={() => window.open(thumbnailData.thumbnails[selectedQuality], '_blank', 'noopener,noreferrer')}
                            style={{ backgroundColor: '#FFD600', color: '#333', border: 'none' }}
                            className="px-6 py-3 font-medium transition-all duration-200 btn-hover-lift ml-0 sm:ml-2"
                          >
                            Full Preview
                          </Button>

                          <Button
                            onClick={copyThumbnailUrl}
                            variant="outline"
                            className="px-6 py-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 btn-hover-lift"
                          >
                            <Copy className="w-4 h-4 mr-2" aria-hidden="true" />
                            {copied ? "Copied URL" : "Copy URL"}
                          </Button>
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="font-medium">Video ID:</span>
                            <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs border">
                              {thumbnailData.videoId}
                            </code>
                          </div>
                          <div className="break-all">
                            <span className="font-medium">URL:</span>
                            <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs border ml-2 block mt-1 sm:inline sm:ml-2 sm:mt-0">
                              {thumbnailData?.thumbnails[selectedQuality] || "/placeholder.svg"}
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Share Button Section */}
                    <div className="mt-6 flex flex-col items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Share this tool:</span>
                      <div className="flex gap-3">
                        {/* WhatsApp */}
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent('Check out this free YouTube Thumbnail Downloader! https://youtube-thumbnail-downloader.com')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on WhatsApp"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="16" fill="#25D366"/><path d="M16 6.5c-5.24 0-9.5 4.26-9.5 9.5 0 1.67.44 3.29 1.28 4.71L6 26l5.41-1.77A9.47 9.47 0 0016 25.5c5.24 0 9.5-4.26 9.5-9.5s-4.26-9.5-9.5-9.5zm0 17.5c-1.5 0-2.97-.39-4.25-1.13l-.3-.18-3.21 1.05 1.06-3.13-.19-.32A7.48 7.48 0 018.5 16c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zm4.13-5.63c-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.51.12-.15.23-.58.75-.71.9-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.13-.68-.6-1.14-1.34-1.28-1.57-.13-.23-.01-.35.1-.46.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.29-.02-.41-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39-.13-.01-.29-.01-.45-.01-.15 0-.41.06-.62.29-.21.23-.81.79-.81 1.93s.83 2.24.95 2.4c.12.15 1.63 2.5 3.95 3.41.55.19.98.3 1.31.38.55.14 1.05.12 1.45.07.44-.07 1.36-.56 1.55-1.1.19-.54.19-1.01.13-1.1-.06-.09-.21-.15-.44-.27z" fill="#fff"/></svg>
                        </a>
                        {/* Facebook */}
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://youtube-thumbnail-downloader.com')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on Facebook"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="16" fill="#1877F3"/><path d="M21.5 16h-3v8h-3v-8h-2v-3h2v-2c0-2.07 1.23-3.5 3.5-3.5h2v3h-1.5c-.28 0-.5.22-.5.5v2h2.5l-.5 3z" fill="#fff"/></svg>
                        </a>
                        {/* Twitter/X */}
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out this free YouTube Thumbnail Downloader!')}&url=${encodeURIComponent('https://youtube-thumbnail-downloader.com')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on Twitter"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="16" fill="#1DA1F2"/><path d="M25.5 11.5c-.6.27-1.25.45-1.93.53a3.37 3.37 0 001.48-1.86 6.7 6.7 0 01-2.13.82 3.36 3.36 0 00-5.72 3.06A9.54 9.54 0 019 10.5a3.36 3.36 0 001.04 4.48c-.54-.02-1.05-.17-1.5-.41v.04a3.36 3.36 0 002.7 3.29c-.25.07-.52.11-.8.11-.19 0-.38-.02-.56-.05a3.36 3.36 0 003.14 2.34A6.74 6.74 0 018 23.5c-.44 0-.87-.03-1.3-.08a9.51 9.51 0 005.15 1.51c6.18 0 9.56-5.12 9.56-9.56 0-.15 0-.29-.01-.44.66-.48 1.23-1.08 1.68-1.76z" fill="#fff"/></svg>
                        </a>
                        {/* LinkedIn */}
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://youtube-thumbnail-downloader.com')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on LinkedIn"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="16" fill="#0077B5"/><path d="M12.5 22h-3v-8h3v8zm-1.5-9.25a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zm11 9.25h-3v-4c0-1.1-.9-2-2-2s-2 .9-2 2v4h-3v-8h3v1.1c.41-.63 1.36-1.1 2.25-1.1 1.93 0 3.75 1.57 3.75 4.25v3.75z" fill="#fff"/></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            )}

            {mode === 'bulk' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Format</label>
                    <select value={format} onChange={e => setFormat(e.target.value as any)} className="border rounded px-2 py-1">
                      <option value="image/jpeg">JPG</option>
                      <option value="image/png">PNG</option>
                      <option value="image/webp">WEBP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Aspect Ratio</label>
                    <select value={aspect} onChange={e => setAspect(e.target.value as any)} className="border rounded px-2 py-1">
                      <option value="original">Original</option>
                      <option value="1:1">Square (1:1)</option>
                      <option value="16:9">16:9</option>
                      <option value="4:3">4:3</option>
                    </select>
                  </div>
                </div>
                <textarea
                  className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-base"
                  placeholder="Paste YouTube URLs here, one per line"
                  value={bulkUrls}
                  onChange={e => setBulkUrls(e.target.value)}
                />
                <Button
                  onClick={async () => {
                    setBulkError('');
                    setBulkLoading(true);
                    setBulkThumbnails([]);
                    setBulkResults({success: [], failed: []});
                    let urls = bulkUrls.split('\n').map(u => u.trim()).filter(Boolean);
                    // Playlist support: expand playlist URLs
                    let expandedUrls: string[] = [];
                    for (const url of urls) {
                      const playlistId = extractPlaylistId(url);
                      if (playlistId) {
                        try {
                          const ids = await fetchPlaylistVideoIds(playlistId);
                          expandedUrls.push(...ids.map(id => `https://www.youtube.com/watch?v=${id}`));
                        } catch (e) {
                          setBulkError('Failed to fetch playlist videos.');
                        }
                      } else {
                        expandedUrls.push(url);
                      }
                    }
                    const results: ThumbnailData[] = [];
                    const failed: string[] = [];
                    for (const url of expandedUrls) {
                      try {
                        const videoId = extractVideoId(url);
                        if (!videoId) throw new Error('Invalid URL');
                        const thumbnails = getThumbnailUrls(videoId);
                        const videoInfo = getVideoInfo(url);
                        results.push({
                          videoId,
                          title: videoInfo.title || `YouTube Video ${videoId}`,
                          thumbnails,
                          videoUrl: url,
                        });
                      } catch (e) {
                        failed.push(url);
                      }
                    }
                    const uniqueResults = Array.from(new Map(results.map(item => [item.videoId, item])).values());
                    if (uniqueResults.length === 0) setBulkError('No valid YouTube URLs found.');
                    setBulkThumbnails(uniqueResults);
                    setBulkResults({success: uniqueResults, failed});
                    setBulkLoading(false);
                  }}
                  disabled={bulkLoading || !bulkUrls.trim()}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-medium transition-all duration-200 btn-hover-lift"
                >
                  {bulkLoading ? 'Fetching...' : 'Fetch Thumbnails'}
                </Button>
                {bulkError && <div className="text-red-600 text-sm">{bulkError}</div>}
                {bulkThumbnails.length > 0 && (
                  <div className="flex justify-between items-center mb-4">
                    <Button
                      onClick={async () => {
                        const zip = new JSZip();
                        for (const thumb of bulkThumbnails) {
                          try {
                            const blob = await processImage(thumb.thumbnails.maxresdefault || thumb.thumbnails.hqdefault, format, aspect);
                            zip.file(`youtube-thumbnail-${thumb.videoId}.${format.split('/')[1]}`, blob);
                          } catch (e) {
                            // skip failed
                          }
                        }
                        const content = await zip.generateAsync({type: 'blob'});
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(content);
                        link.download = 'youtube-thumbnails.zip';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 font-medium transition-all duration-200 btn-hover-lift"
                    >
                      Download All as ZIP
                    </Button>
                    <div className="text-xs text-gray-500 ml-4">
                      {bulkResults.success.length} success, {bulkResults.failed.length} failed
                    </div>
                  </div>
                )}
                {bulkResults.failed.length > 0 && (
                  <div className="text-xs text-red-600 mb-2">Failed URLs:<br />{bulkResults.failed.map(url => <div key={url}>{url}</div>)}</div>
                )}
                {bulkThumbnails.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                    {bulkThumbnails.map((thumb, idx) => (
                      <div key={thumb.videoId + idx} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
                        <img
                          src={thumb.thumbnails.maxresdefault || thumb.thumbnails.hqdefault}
                          alt={`YouTube Thumbnail Preview - ${thumb.title}`}
                          className="max-w-full h-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 mb-4"
                          style={{ maxHeight: '200px' }}
                        />
                        <div className="flex gap-2 mb-2">
                          <Button
                            onClick={async () => {
                              const blob = await processImage(thumb.thumbnails.maxresdefault || thumb.thumbnails.hqdefault, format, aspect);
                              const link = document.createElement('a');
                              link.href = URL.createObjectURL(blob);
                              link.download = `youtube-thumbnail-${thumb.videoId}.${format.split('/')[1]}`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-medium transition-all duration-200 btn-hover-lift"
                          >
                            Download
                          </Button>
                          <Button
                            onClick={async () => {
                              await navigator.clipboard.writeText(thumb.thumbnails.maxresdefault || thumb.thumbnails.hqdefault);
                            }}
                            variant="outline"
                            className="px-4 py-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 btn-hover-lift"
                          >
                            Copy URL
                          </Button>
                        </div>
                        <a
                          href={thumb.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold underline text-xs mt-2"
                        >
                          View Video
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </div>
      </Card>

      {/* Related Tools Section */}
      {/*
      <div className="mt-16 mb-8 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Thumbnail Maker/Editor */}
          {/*
          <a href="/edit" className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl mb-2">🎨</div>
            <div className="font-semibold">YouTube Thumbnail Maker</div>
            <div className="text-xs text-gray-500 mt-1">Edit and customize thumbnails instantly</div>
          </a>
          {/* Thumbnail Previewer */}
          {/*
          <a href="https://ytthumbpreviewer.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl mb-2">👁️</div>
            <div className="font-semibold">YouTube Thumbnail Previewer</div>
            <div className="text-xs text-gray-500 mt-1">See how your thumbnail looks on YouTube</div>
          </a>
          {/* Channel Logo Downloader */}
          {/*
          <a href="https://channel-logo-downloader.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl mb-2">🖼️</div>
            <div className="font-semibold">Channel Logo Downloader</div>
            <div className="text-xs text-gray-500 mt-1">Download YouTube channel profile pictures</div>
          </a>
          {/* Playlist Thumbnail Downloader */}
          {/* ... more related tools ... */}
          {/*
        </div>
      </div>
      */}
    </div>
  )
}
