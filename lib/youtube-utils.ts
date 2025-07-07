export function extractVideoId(url: string): string | null {
  // Remove whitespace and normalize URL
  url = url.trim()

  // YouTube URL patterns - comprehensive list
  const patterns = [
    // Standard YouTube URLs
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|m\.youtube\.com\/watch\?v=|youtube\.com\/watch\?.*&v=)([^&\n?#]+)/,
    // YouTube Shorts (with or without www)
    /(?:youtube\.com|www\.youtube\.com)\/shorts\/([a-zA-Z0-9_-]{11})/,
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

// Extract playlist ID from a YouTube playlist URL
export function extractPlaylistId(url: string): string | null {
  url = url.trim();
  try {
    const urlObj = new URL(url);
    if (urlObj.searchParams.has("list")) {
      const listId = urlObj.searchParams.get("list");
      // Basic validation: playlist IDs are usually at least 13 chars, start with PL, UU, FL, RD, etc.
      if (listId && /^[A-Za-z0-9_-]{13,}$/.test(listId)) {
        return listId;
      }
    }
  } catch (e) {
    // Not a valid URL, ignore
  }
  // Also support direct playlist ID
  if (/^(PL|UU|FL|RD)[A-Za-z0-9_-]{11,}$/.test(url)) {
    return url;
  }
  return null;
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

// Extract channel ID from a YouTube channel URL or username URL
export function extractChannelId(input: string): string | null {
  input = input.trim();
  // Direct channel ID
  if (/^UC[a-zA-Z0-9_-]{22}$/.test(input)) {
    return input;
  }
  // Channel URL
  const channelMatch = input.match(/(?:youtube\.com|youtu\.be)\/channel\/([a-zA-Z0-9_-]{24})/);
  if (channelMatch && channelMatch[1]) {
    return channelMatch[1];
  }
  // Username URL
  const userMatch = input.match(/(?:youtube\.com|youtu\.be)\/user\/([a-zA-Z0-9]+)/);
  if (userMatch && userMatch[1]) {
    return userMatch[1]; // Will need to resolve to channelId via API
  }
  // Handle custom URLs (youtube.com/c/CustomName or youtube.com/@handle)
  const customMatch = input.match(/(?:youtube\.com|youtu\.be)\/(c|@)\/([a-zA-Z0-9_\-]+)/);
  if (customMatch && customMatch[2]) {
    return customMatch[2]; // Will need to resolve to channelId via API
  }
  return null;
}
