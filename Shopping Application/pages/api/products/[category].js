const db = require('../../../lib/db');

export async function getProductsByCategory(category) {
  console.log('Category is:', category);
  try {
    const sql = `
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
      WHERE
        p.category = $1
    `;
    const rows = await db.query(sql, [category]);
    console.log(rows);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error; // Rethrowing the error for the API handler to catch
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  } else {
    try {
      const products = await getProductsByCategory(req.query.category);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
  }
}
