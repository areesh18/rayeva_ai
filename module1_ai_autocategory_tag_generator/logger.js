import { supabase } from "./supabase.js";

export const logInteraction = async (prompt, response, productId) => {
  const { error } = await supabase.from("ai_logs").insert([
    {
      product_id: productId,
      prompt,
      response,
      created_at: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
    },
  ]);
  if (error) throw new Error(`Log insert failed: ${error.message}`);
};
