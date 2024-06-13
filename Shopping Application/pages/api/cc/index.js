const db = require('../../../lib/db');

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const { userId } = req.query;
                const cards = await db.query('SELECT * FROM Cust_credcardinfo WHERE Cust_id = $1', [userId]);
                res.status(200).json(cards);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        case 'POST':
            const { custId, creditCardNo, cardExp, cardName, billingAddressId } = req.body;
            try {
                const newCardId = await db.query('SELECT MAX(Card_id) as max_id FROM Cust_credcardinfo;');
                const cardId = (newCardId[0].max_id || 0) + 1;

                const result = await db.query(
                    'INSERT INTO Cust_credcardinfo (Card_id, Cust_id, Creditcardno, Card_exp, Card_name, Billing_address_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                    [cardId, custId, creditCardNo, cardExp, cardName, billingAddressId]
                );
                res.status(201).json(result.rows[0]);
            } catch (error) {
                res.status (500).json({ error: error.message });
            }
            break;

        case 'PUT':
            try {
                const { cardId, creditCardNo, cardExp, cardName, billingAddressId } = req.body;
                const result = await db.query(
                    'UPDATE Cust_credcardinfo SET Creditcardno = $2, Card_exp = $3, Card_name = $4, Billing_address_id = $5 WHERE Card_id = $1 RETURNING *',
                    [cardId, creditCardNo, cardExp, cardName, billingAddressId]
                );
                res.status(200).json(result.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        case 'DELETE':
            try {
                const { cardId } = req.body;
                await db.query('DELETE FROM Cust_credcardinfo WHERE Card_id = $1;', [cardId]);
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
