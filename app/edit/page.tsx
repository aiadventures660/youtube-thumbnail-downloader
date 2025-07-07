"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { FC } from "react";

// Dynamically import the editor to avoid SSR issues
const ThumbnailEditor = dynamic<{ imageUrl: string }>(
  () => import("../../components/thumbnail-editor"),
  { ssr: false }
);

const EditPageInner: FC = () => {
  const { useSearchParams } = require("next/navigation");
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
};

export default function EditPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading editor...</div>}>
      <EditPageInner />
    </Suspense>
  );
} 