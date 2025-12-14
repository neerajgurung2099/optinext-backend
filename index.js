import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recommendRoute from "./routes/recommend.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api", recommendRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AI Recommendation API running on port ${PORT}`);
});
