import express from 'express'
import * as pg from 'pg'
const { Client } = pg.default;
const { createHmac } = await import('node:crypto');
const router = express.Router();

const db = process.env.DATABASE_URL

const credentials = {
    connectionString: db,
    ssl: {
        rejectUnauthorized: false
    }
};

router.post('/register', async (req, res) => {
    const client = new Client(credentials);
    let results = null;
    try {
        const hash = createHmac('sha256', req.body.password).digest('hex');
        await client.connect();

        const query = 'INSERT INTO users("username", "password") VALUES ($1, $2)';
        const values = [req.body.username, hash];
        results = await client.query(query, values);
    } catch (error) {
        console.error('Error in /register:', error.message);
        res.sendStatus(500);
    } finally {
        await client.end();
    }
});

router.post('/login', async (req, res) => {
    const client = new Client(credentials);
    try {
        const hash = createHmac('sha256', req.body.password).digest('hex');
        await client.connect();

        const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        const values = [req.body.username, hash];
        const result = await client.query(query, values);

        if (result.rowCount > 0) {
            res.send({ "Login": "OK!" });
        } else {
            res.status(401).send({ "Error": "Invalid username or password" });
        }

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        await client.end();
    }
});

export default router;