"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import React from "react";

// Dynamically import the editor to avoid SSR issues
const ThumbnailEditor = dynamic(() => import("../../components/thumbnail-editor"), { ssr: false });

export default function EditPage() {
  const searchParams = useSearchParams();
  const img = searchParams.get("img");

  if (!img) {
    return <div className="p-8 text-center text-red-600">No image provided. Please return to the downloader and select a thumbnail to edit.</div>;
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-white dark:bg-gray-900 z-50">
      <ThumbnailEditor imageUrl={img} />
    </div>
  );
} 