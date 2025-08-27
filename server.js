import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ⬇️ Replace with your OpenRouter API Key
const OPENROUTER_API_KEY = "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";

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // free & fast
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    console.log("OpenRouter raw response:", data);

    const reply = data.choices?.[0]?.message?.content || "⚠️ No reply from AI.";
    res.json({ reply });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ reply: "⚠️ AI request failed." });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));

