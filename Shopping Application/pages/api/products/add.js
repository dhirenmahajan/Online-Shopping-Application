const db = require('../../../lib/db');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, category, brand, type, size, description, price } = req.body;
        try {
            // Insert into Product table
            const insertProductQuery = `
                INSERT INTO Product (Name, Category, Brand, Type, Size, Description)
                VALUES ($1, $2, $3, $4, $5, $6);
            `;
            const { rows } = await db.query(insertProductQuery, [name, category, brand, type, size, description]);

            // Assuming the price should be added to a 'Product_price' table linked to 'Product'
            await query(`INSERT INTO Product_price (Prod_id, Price) VALUES ($1, $2)`, [prod_id, price]);
            res.status(201).json({ message: 'Product added successfully' });
        } catch (error) {
            console.error('Failed to add product:', error);
            res.status(500).json({ message: 'Failed to add product', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}
