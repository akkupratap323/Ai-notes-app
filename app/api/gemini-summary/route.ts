import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Gemini API key not set" }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `Summarize the following note: ${text}` }
              ]
            }
          ]
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      console.error("Gemini API error details:", data)
      return NextResponse.json({ error: data.error?.message || "Gemini API error" }, { status: response.status });
    }
    // Gemini returns the result in data.candidates[0].content.parts[0].text
    const summary = data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary returned";
    return NextResponse.json({ summary });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}
