import { NextRequest, NextResponse } from 'next/server';
import { extractPlaylistId } from '@/lib/youtube-utils';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function POST(req: NextRequest) {
  const { input } = await req.json();
  if (!input) {
    return NextResponse.json({ error: 'Missing input', debug: { input } }, { status: 400 });
  }

  const playlistId = extractPlaylistId(input);
  if (!playlistId) {
    return NextResponse.json({ error: 'Invalid playlist URL or ID', debug: { input } }, { status: 400 });
  }

  // Fetch playlist info (for main thumbnail)
  const playlistUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${YOUTUBE_API_KEY}`;
  const playlistRes = await fetch(playlistUrl);
  const playlistData = await playlistRes.json();
  if (!playlistData.items || playlistData.items.length === 0) {
    return NextResponse.json({ error: 'Playlist not found', debug: { playlistId, playlistData } }, { status: 404 });
  }
  const playlist = playlistData.items[0];
  const mainThumbnail = playlist.snippet.thumbnails?.maxres?.url || playlist.snippet.thumbnails?.high?.url || playlist.snippet.thumbnails?.default?.url;
  const playlistTitle = playlist.snippet.title;

  // Fetch playlist items (videos)
  let videoThumbnails: { videoId: string, title: string, thumbnail: string }[] = [];
  let nextPageToken = '';
  do {
    const itemsUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
    const itemsRes = await fetch(itemsUrl);
    const itemsData = await itemsRes.json();
    if (itemsData.items) {
      videoThumbnails.push(...itemsData.items.map((item: any) => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
      })));
    }
    nextPageToken = itemsData.nextPageToken;
  } while (nextPageToken);

  return NextResponse.json({
    playlistId,
    playlistTitle,
    mainThumbnail,
    videoThumbnails,
  });
} 