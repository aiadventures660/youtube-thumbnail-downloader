"use client";
import React, { useState } from "react";

export default function TitleDescriptionGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<{title: string, desc: string}[]>([]);
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Title & Description Generator</h1>
      <form onSubmit={e => {e.preventDefault(); setResults([{title: "Awesome Video Title", desc: "This is a great description for your video."}]);}} className="flex gap-2 mb-6">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Video topic or keywords" className="flex-1 border rounded px-3 py-2" />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Generate</button>
      </form>
      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((r, i) => (
            <div key={i} className="p-4 bg-gray-100 rounded">
              <div className="font-semibold">{r.title}</div>
              <div className="text-xs text-gray-600 mt-1">{r.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 