export function extractVideoId(url: string): string | null {
  // Remove whitespace and normalize URL
  url = url.trim()

  // YouTube URL patterns - comprehensive list
  const patterns = [
    // Standard YouTube URLs
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|m\.youtube\.com\/watch\?v=|youtube\.com\/watch\?.*&v=)([^&\n?#]+)/,
    // YouTube Shorts
    /youtube\.com\/shorts\/([^&\n?#]+)/,
    // YouTube Music
    /music\.youtube\.com\/watch\?v=([^&\n?#]+)/,
    // Direct video ID (11 characters)
    /^([a-zA-Z0-9_-]{11})$/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      // Validate video ID format (YouTube video IDs are 11 characters)
      const videoId = match[1]
      if (videoId.length === 11 && /^[a-zA-Z0-9_-]+$/.test(videoId)) {
        return videoId
      }
    }
  }

  return null
}

export function getThumbnailUrls(videoId: string) {
  const baseUrl = "https://img.youtube.com/vi"

  return {
    maxresdefault: `${baseUrl}/${videoId}/maxresdefault.jpg`,
    hqdefault: `${baseUrl}/${videoId}/hqdefault.jpg`,
    mqdefault: `${baseUrl}/${videoId}/mqdefault.jpg`,
    sddefault: `${baseUrl}/${videoId}/sddefault.jpg`,
    default: `${baseUrl}/${videoId}/default.jpg`,
  }
}

export function getVideoInfo(url: string) {
  const videoId = extractVideoId(url)
  if (!videoId) return { title: null, videoId: null }

  // Extract title from URL if available (some URLs contain title)
  let title = null
  try {
    const urlObj = new URL(url)
    // Some YouTube URLs contain title information
    if (urlObj.searchParams.has("title")) {
      title = urlObj.searchParams.get("title")
    }
  } catch (e) {
    // URL parsing failed, ignore
  }

  return {
    title,
    videoId,
  }
}

export function isValidYouTubeUrl(url: string): boolean {
  return extractVideoId(url) !== null
}

export function generateThumbnailFilename(videoId: string, quality: string): string {
  const timestamp = new Date().toISOString().split("T")[0]
  return `youtube-thumbnail-${videoId}-${quality}-${timestamp}.jpg`
}

// Utility to check if thumbnail exists
export async function checkThumbnailExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD", mode: "no-cors" })
    return response.ok
  } catch {
    return false
  }
}
