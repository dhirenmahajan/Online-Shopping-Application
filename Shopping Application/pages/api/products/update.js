import { query } from '../../../lib/db';

export default async function handler(req, res) {
    const { method } = req;
    
    // TODO: need to handle creation and deletion of products
    switch (method) {
        case 'PUT':
            // Update the price of a product
            const { prod_id: updateId, price: updatePrice } = req.body;
            if (!updateId || !updatePrice) {
                return res.status(400).json({ message: 'Product ID and new price are required.' });
            }
            try {
                const updatePriceQuery = `
                UPDATE Product_price
                SET Price = $1
                FROM Stock
                WHERE Product_price.Stock_id = Stock.Stock_id AND Stock.Prod_id = $2;
                `;
                await query(updatePriceQuery, [updatePrice, updateId]);
                res.status(200).json({ message: 'Price updated successfully' });
            } catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ message: 'Failed to update price', error: error.message });
            }
            break;
 
        default:
            res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
            res.status(405).json({ message: `Method ${method} not allowed` });
            break;
    }
}
