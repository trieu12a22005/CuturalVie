import axios from "axios";

const apitest = import.meta.env.VITE_API_KEY;
const systemContext = import.meta.env.VITE_CONTEXT;

export async function generateContent(prompt, abortSignal) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemContext,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apitest}`,
        },
        signal: abortSignal,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.warn("Request cancelled");
      return null;
    }

    console.error(
      "Error generating content:",
      error.response?.data || error.message
    );
    throw error;
  }
}
