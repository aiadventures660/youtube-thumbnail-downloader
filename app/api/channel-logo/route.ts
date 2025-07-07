import { NextRequest, NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Helper to resolve username or custom URL to channelId
async function resolveChannelId(input: string): Promise<string | null> {
  // If input is already a channel ID
  if (/^UC[a-zA-Z0-9_-]{22}$/.test(input)) return input;

  // Try username (user/ or c/ or @handle)
  // Try search endpoint for username or custom URL
  const url = `https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=${encodeURIComponent(input)}&key=${YOUTUBE_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.items && data.items.length > 0) {
    return data.items[0].id;
  }
  // Try search by handle or custom URL (using search endpoint)
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(input)}&key=${YOUTUBE_API_KEY}`;
  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();
  if (searchData.items && searchData.items.length > 0) {
    return searchData.items[0].snippet.channelId;
  }
  return null;
}

export async function POST(req: NextRequest) {
  const { input } = await req.json();
  if (!input) {
    return NextResponse.json({ error: 'Missing input', debug: { input } }, { status: 400 });
  }

  let channelId = input;
  let debug: any = { input };
  // If not a channel ID, try to resolve
  if (!/^UC[a-zA-Z0-9_-]{22}$/.test(input)) {
    channelId = await resolveChannelId(input);
    debug.resolvedChannelId = channelId;
    if (!channelId) {
      return NextResponse.json({ error: 'Channel not found', debug }, { status: 404 });
    }
  }

  // Fetch channel info
  const infoUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${YOUTUBE_API_KEY}`;
  const infoRes = await fetch(infoUrl);
  const infoData = await infoRes.json();
  debug.infoUrl = infoUrl;
  debug.infoData = infoData;
  if (!infoData.items || infoData.items.length === 0) {
    return NextResponse.json({ error: 'Channel not found', debug }, { status: 404 });
  }
  const channel = infoData.items[0];
  const logo = channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.default?.url;
  const title = channel.snippet.title;
  return NextResponse.json({ logo, title, channelId });
} 