const db = require('../../../../lib/db');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { warehouseId, productId, quantity } = req.body;
        try {
            const query = `
                UPDATE Stock
                SET Quantity = $1
                WHERE Warehouse_id = $2 AND Prod_id = $3;
            `;
            await db.query(query, [quantity, warehouseId, productId]);
            res.status(200).json({ message: 'Stock updated successfully' });
        } catch (error) {
            console.error('Error updating stock:', error);
            res.status(500).json({ message: 'Failed to update stock', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
