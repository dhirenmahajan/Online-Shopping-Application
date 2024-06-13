const db = require('../../../lib/db');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const query = `
                SELECT 
                    w.Warehouse_id, 
                    a.Address_id, 
                    a.Address_line1, 
                    a.Address_line2, 
                    a.City, 
                    a.State, 
                    a.Zipcode, 
                    a.Country
                FROM 
                    Warehouse w
                JOIN 
                    Address a ON w.Address_id = a.Address_id;
            `;
            const warehouses = await db.query(query);
            console.log('Retrieved warehouses:', warehouses);
            res.status(200).json(warehouses);
        } catch (error) {
            console.error('Failed to retrieve warehouses:', error);
            res.status(500).json({ message: 'Failed to load warehouses', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
