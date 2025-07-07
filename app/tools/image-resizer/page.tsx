"use client";
import React, { useState } from "react";

export default function ImageResizer() {
  const [img, setImg] = useState<string | null>(null);
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Image Resizer & Compressor</h1>
      <input type="file" accept="image/*" onChange={e => {
        const file = e.target.files?.[0];
        if (file) setImg(URL.createObjectURL(file));
      }} className="mb-6" />
      {img && (
        <div className="text-center">
          <img src={img} alt="Uploaded" className="max-w-full max-h-64 mx-auto mb-2" />
          <button className="bg-green-600 text-white px-4 py-2 rounded">Download Resized</button>
        </div>
      )}
    </div>
  );
} 