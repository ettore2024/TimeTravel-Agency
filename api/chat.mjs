export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.MISTRAL_API_KEY;
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

  try {
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
}
