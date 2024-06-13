import { query } from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') { // Add stock to a warehouse
        const { prod_id, warehouse_id, quantity } = req.body;
        try {
            await query(`
                INSERT INTO Stock (Warehouse_id, Prod_id, Quantity)
                VALUES ($1, $2, $3);
            `, [warehouse_id, prod_id, quantity]);
            res.status(201).json({ message: 'Stock added successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to add stock', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
