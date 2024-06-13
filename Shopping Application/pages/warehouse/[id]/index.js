const db = require('../../../../lib/db');

export default async function handler(req, res) {
    const { id } = req.query;  // Warehouse ID from the URL

    if (req.method === 'GET') {
        try {
            const query = `
                SELECT 
                    p.Prod_id AS prod_id,
                    p.Name AS name,
                    p.Category AS category,
                    p.Brand AS brand,
                    p.Type AS type,
                    p.Size AS size,
                    p.Description AS description,
                    s.Quantity AS quantity,
                    pp.Price AS price
                FROM 
                    Product p
                JOIN 
                    Stock s ON p.Prod_id = s.Prod_id
                JOIN 
                    Product_price pp ON s.Stock_id = pp.Stock_id
                WHERE 
                    s.Warehouse_id = $1;
            `;
            const products = await db.query(query, [id]);  // Ensure your db.query method supports parameterized queries
            console.log('Products retrieved:', products);
            res.status(200).json(products);
        } catch (error) {
            console.error('Failed to retrieve products:', error);
            res.status(500).json({ message: 'Failed to load products', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}