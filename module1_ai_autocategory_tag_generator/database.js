import { supabase } from "./supabase.js";



export const saveToCatalog =async (productData) => {
  const {error} = await supabase.from("products").insert([productData]);
  if(error){
    throw new Error(`DB insert failed: ${error.message}`);
  }
};


export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`DB fetch failed: ${error.message}`);
  return data;
};