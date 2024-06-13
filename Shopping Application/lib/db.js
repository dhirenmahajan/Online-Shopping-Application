// lib/db.js
const { Pool } = require("pg");
const fs = require("fs");

const sslCert = fs.readFileSync("/Users/jaykothari/Documents/DBMS/group15/Part-2/shopping-cart/ca.crt").toString();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        ca: sslCert,
        rejectUnauthorized: true // This is recommended for security, adjust according to your needs
    }
});

async function connect() {
    const client = await pool.connect();
    return client;
}

module.exports = {
    connect,
    query: async (query, params = []) => {
        const client = await connect();
        try {
            const { rows } = await client.query(query, params);
            return rows;
        } finally {
            client.release();
        }
    }
};
