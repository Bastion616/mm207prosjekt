import express from 'express'
import * as pg from 'pg'
import dotenv from 'dotenv'
dotenv.config();
const { Client } = pg.default;
const { createHmac } = await import('node:crypto');
const router = express.Router();

let userList = [];

const db = process.env.DATABASE_URL;

router.post('/register', async (req, res) => {
    const client = new Client(db);
    let results = null;
    try {
        const hash = createHmac('sha256', req.body.password).digest('hex');
        await client.connect();

        const query = 'INSERT INTO "users"("username", "password") VALUES ($1, $2)';
        const values = [req.body.username, hash];
        results = await client.query(query, values);

        const user = { username: req.body.username, password: hash };
        userList.push(user);
        res.send(userList);

    } catch (error) {
        console.error('Error in /register:', error.message);
        res.sendStatus(500);
    } finally {
        await client.end();
    }
});

router.post('/login', async (req, res) => {
    const client = new Client(db);
    try {
        const hash = createHmac('sha256', req.body.password).digest('hex');
        await client.connect();

        // Query the database to find the user with the provided username and hashed password
        const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        const values = [req.body.username, hash];
        const result = await client.query(query, values);

        if (result.rowCount > 0) {
            // If a user is found, send a successful login response
            res.send({ "Login": "OK!" });
        } else {
            // If no user is found, send an error response
            res.status(401).send({ "Error": "Invalid username or password" });
        }

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        await client.end(); // Make sure to close the database connection
    }
});

export default router;