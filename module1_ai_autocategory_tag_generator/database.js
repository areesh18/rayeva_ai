import fs from "fs";

const DB_FILE = "products.json";

export const saveToCatalog = (productData) => {
  let products = [];

  if (fs.existsSync(DB_FILE)) {
    const rawData = fs.readFileSync(DB_FILE);
    products = JSON.parse(rawData);
  }

  products.push(productData);

  fs.writeFileSync(DB_FILE, JSON.stringify(products, null, 2));
};


export const getAllProducts = () => {
  if (!fs.existsSync(DB_FILE)) return [];
  const rawData = fs.readFileSync(DB_FILE);
  return JSON.parse(rawData);
};