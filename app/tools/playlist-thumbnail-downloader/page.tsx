"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import JSZip from "jszip";

const THUMBNAIL_SIZES = [
  { key: "maxresdefault", label: "Max Res" },
  { key: "hqdefault", label: "High" },
  { key: "mqdefault", label: "Medium" },
  { key: "sddefault", label: "Standard" },
  { key: "default", label: "Default" },
];

function getThumbnailUrl(videoId: string, size: string) {
  return `https://img.youtube.com/vi/${videoId}/${size}.jpg`;
}

export default function PlaylistThumbnailDownloader() {
  const [input, setInput] = useState("");
  const [mainThumbnail, setMainThumbnail] = useState<string | null>(null);
  const [mainThumbnailId, setMainThumbnailId] = useState<string | null>(null);
  const [playlistTitle, setPlaylistTitle] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<{ videoId: string, title: string, thumbnail: string }[]>([]);
  const [fallbackIdx, setFallbackIdx] = useState<{ [videoId: string]: number }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zipping, setZipping] = useState(false);

  async function handleFetch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMainThumbnail(null);
    setMainThumbnailId(null);
    setPlaylistTitle(null);
    setThumbnails([]);
    try {
      const res = await fetch("/api/playlist-thumbnails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      setMainThumbnail(data.mainThumbnail);
      setMainThumbnailId(data.playlistId);
      setPlaylistTitle(data.playlistTitle);
      setThumbnails(data.videoThumbnails);
      setFallbackIdx(Object.fromEntries(data.videoThumbnails.map((v: any) => [v.videoId, 0])));
    } catch (err: any) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadZip() {
    setZipping(true);
    const zip = new JSZip();
    // Add main thumbnail
    // (Removed: do not add main thumbnail to ZIP)
    // Add video thumbnails
    for (const vid of thumbnails) {
      const idx = fallbackIdx[vid.videoId] ?? 0;
      const size = THUMBNAIL_SIZES[idx]?.key || "maxresdefault";
      const url = getThumbnailUrl(vid.videoId, size);
      try {
        const res = await fetch(url);
        const blob = await res.blob();
        zip.file(`${vid.title.replace(/[^a-z0-9]/gi, "_")}_${vid.videoId}_${size}.jpg`, blob);
      } catch {}
    }
    const content = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = `${playlistTitle?.replace(/[^a-z0-9]/gi, "_") || "playlist"}_thumbnails.zip`;
    a.click();
    setZipping(false);
  }

  async function handleDirectDownload(url: string, filename: string) {
    const res = await fetch(url);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 100);
  }

  function handleImgError(videoId: string) {
    console.log('Fallback triggered for', videoId, 'current idx:', fallbackIdx[videoId]);
    setFallbackIdx(prev => {
      const currentIdx = prev[videoId] ?? 0;
      const nextIdx = currentIdx + 1;
      if (nextIdx < THUMBNAIL_SIZES.length) {
        return { ...prev, [videoId]: nextIdx };
      } else {
        // All sizes failed
        return { ...prev, [videoId]: -1 };
      }
    });
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Playlist Thumbnail Downloader</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFetch} className="flex gap-2 mb-6">
            <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Playlist URL or ID" className="flex-1" />
            <Button type="submit" disabled={loading}>{loading ? "Fetching..." : "Fetch"}</Button>
          </form>
          {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
          {playlistTitle && (
            <div className="mb-4 text-center">
              <div className="font-semibold mb-2">{playlistTitle}</div>
            </div>
          )}
          {thumbnails.length > 0 && (
            <>
              <div className="flex justify-end mb-2">
                <Button onClick={handleDownloadZip} disabled={zipping}>{zipping ? "Zipping..." : "Download All as ZIP"}</Button>
              </div>
              {/* Deduplicate thumbnails by videoId */}
              <div className="grid grid-cols-2 gap-4">
                {Array.from(new Map(thumbnails.map(v => [v.videoId, v])).values()).map((thumb, i) => {
                  const idx = fallbackIdx[thumb.videoId] ?? 0;
                  const sizeKey = idx >= 0 && idx < THUMBNAIL_SIZES.length ? THUMBNAIL_SIZES[idx].key : null;
                  return (
                    <div key={thumb.videoId || i} className="text-center">
                      {idx === -1 ? (
                        <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded mb-2 text-xs text-gray-500">No thumbnail available</div>
                      ) : (
                        <img
                          key={sizeKey}
                          src={getThumbnailUrl(thumb.videoId, sizeKey || "maxresdefault")}
                          alt={thumb.title}
                          className="w-full rounded mb-2"
                          onError={() => handleImgError(thumb.videoId)}
                        />
                      )}
                      <div className="truncate mb-1 text-xs">{thumb.title}</div>
                      <select
                        value={sizeKey || "maxresdefault"}
                        onChange={e => {
                          const newIdx = THUMBNAIL_SIZES.findIndex(s => s.key === e.target.value);
                          setFallbackIdx(prev => ({ ...prev, [thumb.videoId]: newIdx }));
                        }}
                        className="mb-2 border rounded px-2 py-1"
                      >
                        {THUMBNAIL_SIZES.map((s, j) => <option key={s.key} value={s.key}>{s.label}</option>)}
                      </select>
                      <Button
                        onClick={() => handleDirectDownload(
                          getThumbnailUrl(thumb.videoId, sizeKey || "maxresdefault"),
                          `${thumb.title.replace(/[^a-z0-9]/gi, "_")}_${thumb.videoId}_${sizeKey || "maxresdefault"}.jpg`
                        )}
                      >
                        Download
                      </Button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 