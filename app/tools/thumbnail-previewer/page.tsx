"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extractVideoId } from "@/lib/youtube-utils";

export default function ThumbnailPreviewer() {
  const [img, setImg] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [imgError, setImgError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgError(null);
      setImg(URL.createObjectURL(file));
    }
  };

  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setImgError(null);
    // Check if input is a YouTube link
    const ytId = extractVideoId(urlInput);
    if (ytId) {
      setImg(`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`);
    } else {
      setImg(urlInput);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>YouTube Thumbnail Previewer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            <form
              onSubmit={handleUrlSubmit}
              className="flex gap-2 w-full"
            >
              <Input
                type="url"
                placeholder="Paste image URL (jpg/png/webp)"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                className=""
              />
              <Button type="submit" variant="secondary">Preview from Link</Button>
            </form>
          </div>
          {img && (
            <div className="space-y-8">
              {imgError ? (
                <div className="text-red-600 font-semibold text-center py-8">
                  Failed to load image. Please check the URL or try another image.
                </div>
              ) : (
                <>
                  <div>
                    <div className="font-semibold mb-2">YouTube Desktop</div>
                    <div className="border p-4 bg-gray-100 flex items-center" style={{width: 480, height: 270}}>
                      <img src={img} alt="Desktop preview" className="max-w-full max-h-full mx-auto" onError={() => setImgError("error")}/>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">YouTube Mobile</div>
                    <div className="border p-4 bg-gray-100 flex items-center" style={{width: 320, height: 180}}>
                      <img src={img} alt="Mobile preview" className="max-w-full max-h-full mx-auto" onError={() => setImgError("error")}/>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">YouTube Search Result</div>
                    <div className="border p-4 bg-gray-100 flex items-center" style={{width: 210, height: 118}}>
                      <img src={img} alt="Search preview" className="max-w-full max-h-full mx-auto" onError={() => setImgError("error")}/>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">YouTube Sidebar</div>
                    <div className="border p-4 bg-gray-100 flex items-center" style={{width: 168, height: 94}}>
                      <img src={img} alt="Sidebar preview" className="max-w-full max-h-full mx-auto" onError={() => setImgError("error")}/>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 