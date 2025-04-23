import axios from "axios";

// Default prompt for summarization
const DEFAULT_SUMMARY_PROMPT =
  "Summarize the following note in a concise manner, capturing the key points:";

// Response type
export interface SummaryResponse {
  id: string;
  summary: string;
  finishReason: string;
  createdAt: string;
}

export async function summarizeText(
  text: string,
  customPrompt?: string
): Promise<SummaryResponse> {
  const apiKey =
    process.env.NEXT_GEMINI_API_KEY ||
    "AIzaSyAGeRqIXgLR-ZPsjA6hXjMNjsYBCZo9WXo";
  if (!apiKey) {
    throw new Error(
      "Missing API key for Gemini. Set GEMINI_API_KEY in environment variables."
    );
  }

  const apiUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  // Build the prompt
  const promptText = customPrompt
    ? `${customPrompt}\n\n${text}`
    : `${DEFAULT_SUMMARY_PROMPT}\n\n${text}`;

  try {
    const response = await axios.post(
      `${apiUrl}?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: promptText }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.2,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const candidate = response.data.candidates?.[0];
    const contentParts = candidate?.content?.parts;
    const summaryText =
      contentParts && contentParts.length > 0 ? contentParts[0].text : "";

    return {
      id: candidate?.finishReason || "",
      finishReason: candidate?.finishReason || "",
      summary: summaryText,
      createdAt: new Date().toISOString(),
    };
  } catch (error: unknown) {
    console.error("Error calling Gemini API:", error);

    if (axios.isAxiosError(error) && error.response) {
      console.error("API response:", error.response.data);
      throw new Error(
        `Gemini API Error: ${error.response.status} ${JSON.stringify(
          error.response.data
        )}`
      );
    }

    throw new Error("Failed to generate summary");
  }
}
