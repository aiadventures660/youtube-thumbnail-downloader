"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChannelLogoDownloader() {
  const [input, setInput] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFetch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setLogo(null);
    setTitle(null);
    try {
      const res = await fetch("/api/channel-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      setLogo(data.logo);
      setTitle(data.title);
    } catch (err: any) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Channel Logo Downloader</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFetch} className="flex gap-2 mb-6">
            <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Channel URL, ID, @handle, or username" className="flex-1" />
            <Button type="submit" disabled={loading}>{loading ? "Fetching..." : "Fetch"}</Button>
          </form>
          {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
          {logo && (
            <div className="text-center">
              <img src={logo} alt="Channel logo" className="w-32 h-32 rounded-full mx-auto border mb-2" />
              {title && <div className="font-semibold mb-2">{title}</div>}
              <a href={logo} download style={{ textDecoration: 'none' }}>
                <Button asChild>
                  <span>Download Logo</span>
                </Button>
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 