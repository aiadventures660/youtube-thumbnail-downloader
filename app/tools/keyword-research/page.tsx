"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function KeywordResearchTool() {
  const [input, setInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSuggest(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setKeywords([]);
    try {
      const res = await fetch("/api/keyword-suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch suggestions");
      setKeywords(data.keywords);
    } catch (err: any) {
      setError(err.message || "Failed to fetch suggestions");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Keyword Research Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSuggest} className="flex gap-2 mb-6">
            <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Video topic or seed keyword" className="flex-1" />
            <Button type="submit" disabled={loading || !input.trim()}>{loading ? "Suggesting..." : "Suggest"}</Button>
          </form>
          {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
          {keywords.length > 0 && (
            <ul className="list-disc pl-6">
              {keywords.map((kw, i) => <li key={i}>{kw}</li>)}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 