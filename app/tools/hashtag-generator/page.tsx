"use client";
import React, { useState } from "react";

export default function HashtagGenerator() {
  const [input, setInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Hashtag Generator</h1>
      <form onSubmit={e => {e.preventDefault(); setHashtags(["#hashtag1", "#hashtag2", "#hashtag3"]);}} className="flex gap-2 mb-6">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Video topic or keywords" className="flex-1 border rounded px-3 py-2" />
        <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded">Generate</button>
      </form>
      {hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {hashtags.map((h, i) => <span key={i} className="bg-gray-200 rounded px-2 py-1 text-sm">{h}</span>)}
        </div>
      )}
    </div>
  );
} 