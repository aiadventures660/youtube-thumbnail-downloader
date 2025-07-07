"use client";
import React, { useState } from "react";

export default function YoutubeToMp3() {
  const [input, setInput] = useState("");
  const [mp3, setMp3] = useState<string | null>(null);
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">YouTube to MP3 Converter</h1>
      <form onSubmit={e => {e.preventDefault(); setMp3("/placeholder.mp3");}} className="flex gap-2 mb-6">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="YouTube Video URL" className="flex-1 border rounded px-3 py-2" />
        <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded">Convert</button>
      </form>
      {mp3 && (
        <div className="text-center">
          <a href={mp3} download className="text-blue-600 underline">Download MP3</a>
        </div>
      )}
      <div className="text-xs text-gray-500 mt-8">
        Legal notice: Downloading YouTube videos as MP3 may violate YouTube's Terms of Service. Use at your own risk.
      </div>
    </div>
  );
} 