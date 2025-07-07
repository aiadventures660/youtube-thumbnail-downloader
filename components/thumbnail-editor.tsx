"use client";
import React, { useRef, useMemo } from "react";
import ImageEditor from "@toast-ui/react-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";

const theme = {};

export default function ThumbnailEditor({ imageUrl }: { imageUrl: string }) {
  const editorRef = useRef<any>(null);

  // Memoize editor options to update when imageUrl changes
  const editorOptions = useMemo(() => ({
    includeUI: {
      loadImage: {
        path: imageUrl,
        name: "Thumbnail"
      },
      theme,
      menu: ["crop", "flip", "rotate", "draw", "shape", "icon", "text", "mask", "filter"],
      initMenu: "filter",
      uiSize: {
        width: "100vw",
        height: "100vh"
      },
      menuBarPosition: "bottom"
    },
    cssMaxWidth: undefined,
    cssMaxHeight: undefined,
    selectionStyle: {
      cornerSize: 20,
      rotatingPointOffset: 70
    }
  }), [imageUrl]);

  const handleExport = () => {
    if (editorRef.current) {
      const dataUrl = editorRef.current.getInstance().toDataURL();
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "edited-thumbnail.png";
      link.click();
    }
  };

  if (!imageUrl) return null;

  return (
    <div className="w-screen h-screen">
      <div className="mb-4 absolute top-4 left-4 z-10">
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download Edited Thumbnail
        </button>
      </div>
      <ImageEditor
        key={imageUrl}
        ref={editorRef}
        {...editorOptions}
        usageStatistics={false}
      />
    </div>
  );
} 