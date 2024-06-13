// pages/api/cart/place.js
const db = require('../../../lib/db');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { cart, deliveryType, userId } = req.body;
    try {
        // Begin transaction
        const client = await db.connect();
        try {
            await client.query('BEGIN');

            // Insert into CustomerOrder for each item in the cart
            const orderPromises = cart.map(async (item) => {
                const insertOrderQuery = 'INSERT INTO CustomerOrder(product_id, Quantity, Cust_ID) VALUES($1, $2, $3) RETURNING Order_id';
                const orderResult = await client.query(insertOrderQuery, [item.prod_id, item.quantity, userId]);
                const orderId = orderResult.rows[0].order_id;

                // Handle Delivery Plan
                const insertDeliveryQuery = 'INSERT INTO Deliveryplan(Order_id, Deliverytype, Delivery_price, Delivery_date, Ship_date) VALUES($1, $2, $3, CURRENT_DATE, CURRENT_DATE + INTERVAL \'1 day\')';
                const deliveryPrice = deliveryType === 'express' ? 20.00 : 5.00; // Express or standard delivery price
                await client.query(insertDeliveryQuery, [orderId, deliveryType, deliveryPrice]);
            });

            await Promise.all(orderPromises);

            // Commit transaction
            await client.query('COMMIT');
            res.status(200).json({ message: 'Order placed successfully!' });
        } catch (error) {
            // Rollback transaction on error
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Failed to place order:', error);
        res.status(500).json({ message: 'Failed to place order' });
    }
}
