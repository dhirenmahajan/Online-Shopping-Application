const db = require('../../../lib/db');

export async function getProducts() {
    try {
        const query = `
            SELECT 
              p.prod_id, 
              p.name, 
              p.category, 
              p.image, 
              pp.price
            FROM 
              Product p
            INNER JOIN 
              Stock s ON p.prod_id = s.prod_id
            INNER JOIN 
              Product_price pp ON s.stock_id = pp.stock_id
        `;
        const products = await db.query(query);
        console.log("Fetched products with prices:", products);
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // Rethrowing the error after logging it is usually a good practice
    }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  } else {
    try {
      const products = await getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
  }
}
