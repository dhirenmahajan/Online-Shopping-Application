const db = require('../../../lib/db');

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            // Code to fetch all addresses for a user
            // Assuming the user ID is provided via query string for simplicity
            try {
                const { userId } = req.query;
                const addresses = await db.query('SELECT * FROM Address WHERE Cust_id = $1', [userId]);
                res.status(200).json(addresses);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        case 'POST':
            // Code to add a new address
            const { custId, addressLine1, addressLine2, city, state, zipcode, country, addressType } = req.body;
            try {
                // Generate a new Address_id by finding the current max and adding 1
                const idResult = await db.query('SELECT MAX(Address_id) as max_id FROM Address;');
                const newAddressId = (idResult[0].max_id || 0) + 1;

                console.log(newAddressId, custId, addressLine1, addressLine2, city, state, zipcode, country, addressType)
    
                const result = await db.query(
                    'INSERT INTO Address (Address_id, Cust_id, Address_line1, Address_line2, City, State, Zipcode, Country, Address_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
                    [newAddressId, custId, addressLine1, addressLine2, city, state, zipcode, country, "CustomerAddress"]
                );
                res.status(201).json(result.rows[0]);
            } catch (error) {
                console.error('Error inserting new address:', error);
                res.status(500).json({ error: error.message });
            }
            break;

        case 'PUT':
            // Code to update an existing address
            try {
                const { addressId, addressLine1, addressLine2, city, state, zipcode, country, addressType } = req.body;
                const result = await db.query(
                    'UPDATE Address SET Address_line1 = $2, Address_line2 = $3, City = $4, State = $5, Zipcode = $6, Country = $7, Address_type = $8 WHERE Address_id = $1 RETURNING *',
                    [addressId, addressLine1, addressLine2, city, state, zipcode, country, addressType]
                );
                res.status(200).json(result.rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        case 'DELETE':
            // Code to delete an address
            try {
                const { addressId } = req.body;
                await db.query('DELETE FROM Address WHERE Address_id = $1;', [addressId]);
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
