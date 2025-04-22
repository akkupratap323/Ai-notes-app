import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const apiKey = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "DeepSeek API key not set" }, { status: 500 });
  }

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: `Summarize the following note: ${text}` }
        ],
        temperature: 0.7
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("DeepSeek API error details:", data)
      return NextResponse.json({ error: data.message || data.error_msg || "DeepSeek API error" }, { status: response.status });
    }

    // DeepSeek returns the result in data.choices[0].message.content
    const summary = data.choices?.[0]?.message?.content || "No summary returned";
    return NextResponse.json({ summary });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}
