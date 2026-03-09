import express from "express";
import { analyzeProduct } from "./gemini.js";
import { saveToCatalog } from "./database.js";
const app = express();
app.use(express.json());
app.post("/analyze", async (req, res) => {
  try {
    const { description } = req.body;

    const result = await analyzeProduct(description);
    saveToCatalog(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
