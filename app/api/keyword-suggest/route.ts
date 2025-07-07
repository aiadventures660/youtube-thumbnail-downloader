import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();
    if (!input || typeof input !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid input' }, { status: 400 });
    }
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Missing Gemini API key' }, { status: 500 });
    }
    // Call Gemini API to generate keyword suggestions
    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [
          { parts: [
            { text: `Suggest 10 YouTube keywords for the topic: "${input}". Return only a JSON array of keywords, with no explanation or formatting. Example: ["keyword1", "keyword2", ...]` }
          ] }
        ]
      })
    });
    const geminiData = await geminiRes.json();
    // Try to extract the JSON array from the response
    let keywords: string[] = [];
    if (geminiData.candidates && geminiData.candidates[0]?.content?.parts[0]?.text) {
      try {
        keywords = JSON.parse(geminiData.candidates[0].content.parts[0].text);
      } catch {
        // fallback: try to extract array from text
        const match = geminiData.candidates[0].content.parts[0].text.match(/\[.*\]/s);
        if (match) {
          try { keywords = JSON.parse(match[0]); } catch {}
        }
        // fallback: split lines if still no array
        if (!keywords.length) {
          keywords = geminiData.candidates[0].content.parts[0].text.split(/\n|,|;/).map((s: string) => s.replace(/^[\d\-\*\s]+/, '').replace(/"/g, '').trim()).filter(Boolean);
        }
      }
    }
    if (!Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json({ error: 'No keywords found in Gemini response', debug: geminiData }, { status: 500 });
    }
    return NextResponse.json({ keywords });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
} 