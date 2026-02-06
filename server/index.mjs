import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5175;
const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
  console.warn("Missing MISTRAL_API_KEY in environment.");
}

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!apiKey) {
      return res.status(500).json({ error: "Missing MISTRAL_API_KEY" });
    }

    const { messages, context } = req.body || {};
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages must be an array" });
    }

    const system = {
      role: "system",
      content:
        "You are the TimeTravel Agency concierge. Tone: premium, reassuring, minimal. " +
        "Provide concise guidance, avoid long lists, keep it cinematic. " +
        (context ? `Context: ${context}` : "")
    };

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [system, ...messages],
        temperature: 0.7,
        max_tokens: 280
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content ?? "";
    return res.json({ content });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

app.listen(port, () => {
  console.log(`Mistral proxy listening on http://localhost:${port}`);
});
