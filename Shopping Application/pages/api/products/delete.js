import { query } from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { prod_id } = req.body;
        if (!prod_id) {
            return res.status(400).json({ message: 'Product ID is required.' });
        }
        try {
            const deleteProductPriceQuery = `
                DELETE FROM product_price WHERE Stock_id IN (SELECT Stock_id FROM Stock WHERE Prod_id = $1);
            `;
            await query(deleteProductPriceQuery, [prod_id]);
            const deleteStockQuery = `
                DELETE FROM Stock WHERE Prod_id = $1;
            `;
            await query(deleteStockQuery, [prod_id]);
            const deleteProductQuery = `
                DELETE FROM Product WHERE Prod_id = $1;
            `;
            await query(deleteProductQuery, [prod_id]);
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Failed to delete product:', error);
            res.status(500).json({ message: 'Failed to delete product', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end('Method Not Allowed');
    }
}
