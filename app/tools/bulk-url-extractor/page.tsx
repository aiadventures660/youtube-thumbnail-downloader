"use client";
import React, { useState } from "react";

export default function BulkUrlExtractor() {
  const [input, setInput] = useState("");
  const [urls, setUrls] = useState<string[]>([]);
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Bulk YouTube URL Extractor</h1>
      <form onSubmit={e => {e.preventDefault(); setUrls(["https://youtube.com/watch?v=abc123", "https://youtube.com/watch?v=def456"]);}} className="flex gap-2 mb-6">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Channel or Playlist URL" className="flex-1 border rounded px-3 py-2" />
        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">Extract</button>
      </form>
      {urls.length > 0 && (
        <div className="bg-gray-100 rounded p-4">
          <ul className="list-disc pl-6">
            {urls.map((url, i) => <li key={i}>{url}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
} 