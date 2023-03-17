import express from 'express'
import * as pg from 'pg'
const { Client } = pg.default;
const { createHmac } = await import('node:crypto');
const router = express.Router();

let userList = [];

const db = process.env.DATABASE_URL || "postgres://zryxfihxityyul:8bd19b164d0ff355cf853e4278b0f11bdf09ed92fd3e5a52dac07f47afb92a0f@ec2-54-73-22-169.eu-west-1.compute.amazonaws.com:5432/de8j36jedqlqrt";

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
    const client = new Client(credentials);
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
        await client.end(); 
    }
});

export default router;