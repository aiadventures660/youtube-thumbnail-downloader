"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Download, AlertCircle, CheckCircle, Copy, ExternalLink } from "lucide-react"
import { extractVideoId, getThumbnailUrls, getVideoInfo } from "@/lib/youtube-utils"

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

export default function ThumbnailDownloader() {
  const [url, setUrl] = useState("")
  const [thumbnailData, setThumbnailData] = useState<ThumbnailData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedQuality, setSelectedQuality] = useState<QualityKey>("maxresdefault")
  const [copied, setCopied] = useState(false)
  const [downloadingQuality, setDownloadingQuality] = useState<string | null>(null)
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({})

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
                    <span className="font-medium">Success</span>
                    <a
                      href={thumbnailData.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      aria-label="Open original video"
                    >
                      <ExternalLink size={16} />
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
                          onClick={() => downloadThumbnail(thumbnailData.thumbnails[selectedQuality], selectedQuality)}
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
                </div>
              )}
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
