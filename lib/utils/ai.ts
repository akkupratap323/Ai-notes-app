// Shared utility for API calls
async function callSummaryAPI(endpoint: string, text: string): Promise<string> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || 
        errorData.error || 
        `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    return data.summary || "No summary returned";
  } catch (error) {
    console.error(`${endpoint} error:`, error);
    throw error; // Re-throw to let caller handle or use fallback
  }
}

// Main summarization function with fallback logic
export async function summarizeText(text: string): Promise<string> {
  // Simple fallback for very short text
  if (text.split(/\s+/).length <= 20) {
    return text;
  }

  try {
    // Only try Gemini now
    return await summarizeTextWithGemini(text);
  } catch (geminiError) {
    console.warn("Gemini failed, using simple fallback");
    // Final fallback to simple method
    return getSimpleSummaryFallback(text);
  }
}

// API-specific functions
export async function summarizeTextWithGemini(text: string): Promise<string> {
  return callSummaryAPI("/api/gemini-summary", text);
}

// Simple fallback implementation
function getSimpleSummaryFallback(text: string): string {
  try {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const importantSentences = sentences
      .slice(0, 2)
      .map(s => s.trim())
      .join(". ") + ".";
    return importantSentences || text.slice(0, 150) + "...";
  } catch {
    return text.slice(0, 150) + (text.length > 150 ? "..." : "");
  }
}