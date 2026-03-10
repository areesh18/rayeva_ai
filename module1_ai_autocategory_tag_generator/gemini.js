import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

// Predefined category list
const PRIMARY_CATEGORIES = [
  "Personal Care",
  "Kitchen & Dining",
  "Home & Living",
  "Fashion & Apparel",
  "Baby & Kids",
  "Office & Stationery",
  "Food & Beverages",
  "Garden & Outdoors",
  "Pet Care",
  "Travel & Accessories",
];

export const analyzeProduct = async (productDescription) => {
  const prompt = `
    You are a product catalog AI for a sustainable e-commerce platform.

    Analyze this product: "${productDescription}"

    Rules:
    - "primary_category" MUST be one of: ${PRIMARY_CATEGORIES.join(", ")}
    - "sub_category" should be a specific niche within the primary category
    - "seo_tags" should be an array of 5-10 lowercase search-friendly tags
    - "sustainability_filters" should be an array of applicable filters from:
      ["Plastic-Free", "Compostable", "Vegan", "Recycled", "Reusable",
       "Zero Waste", "Organic", "Biodegradable", "Non-Toxic", "Locally Sourced",
       "Fair Trade", "Carbon Neutral", "Cruelty-Free", "Natural Ingredients"]

    Return a JSON object with exactly these keys:
    "primary_category", "sub_category", "seo_tags", "sustainability_filters"
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const jsonResponse = JSON.parse(response.text());

  // Validate that primary_category is from the predefined list
  if (!PRIMARY_CATEGORIES.includes(jsonResponse.primary_category)) {
    jsonResponse.primary_category = "Home & Living"; // safe fallback
  }

  return { result: jsonResponse, prompt };
};
