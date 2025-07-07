"use client";
import React, { useState } from "react";

export default function AnalyticsTool() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<any>(null);
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">YouTube Analytics Tool</h1>
      <form onSubmit={e => {e.preventDefault(); setData({views: 12345, likes: 678, comments: 90});}} className="flex gap-2 mb-6">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Channel or Video URL" className="flex-1 border rounded px-3 py-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Analyze</button>
      </form>
      {data && (
        <div className="p-4 bg-gray-100 rounded">
          <div>Views: <span className="font-semibold">{data.views}</span></div>
          <div>Likes: <span className="font-semibold">{data.likes}</span></div>
          <div>Comments: <span className="font-semibold">{data.comments}</span></div>
        </div>
      )}
    </div>
  );
} 