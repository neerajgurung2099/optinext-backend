import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API,
});

router.post("/recommend", async (req, res) => {
  try {
    const { products, userHistory, itemsCount = 5 } = req.body;

    if (!products || !userHistory) {
      return res.status(400).json({
        error: "Missing products or userHistory",
      });
    }
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that recommends products based on similarity, category, and user interests. Return only JSON.",
        },
        {
          role: "user",
          content: `
            Products: ${JSON.stringify(products)}
            User history: ${JSON.stringify(userHistory)}

            Recommend ${itemsCount} products ONLY from the product list.
            Prioritize what the user has purchased or viewed.
            Respond ONLY in JSON:
            {
              "recommended": Product[]
            }
          `,
        },
      ],
      temperature: 0.4,
    });

    const aiText = completion.choices[0]?.message?.content ?? "{}";

    const cleaned = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return res.json(parsed);
  } catch (err) {
    console.error("AI Recommendation Error:", err);
    return res.status(500).json({
      error: "AI recommendation failed",
      details: err.message,
    });
  }
});

export default router;
