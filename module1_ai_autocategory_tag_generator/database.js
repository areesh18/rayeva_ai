import fs from 'fs';

const DB_FILE = 'products.json';

export const saveToCatalog = (productData) => {
  let products = [];

  // 1. Read existing products if the file exists
  if (fs.existsSync(DB_FILE)) {
    const rawData = fs.readFileSync(DB_FILE);
    products = JSON.parse(rawData);
  }

  // 2. Add the new AI-generated product
  products.push(productData);

  // 3. Save the updated list back to the file
  fs.writeFileSync(DB_FILE, JSON.stringify(products, null, 2));
};