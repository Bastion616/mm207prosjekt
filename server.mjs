import express from 'express';
import pg from 'pg';

const server = express();
const port = (process.env.PORT || 8080);

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

server.set('port', port);
server.use(express.static('public'));
server.use(express.json());

server.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const created_on = new Date();
        const last_login = new Date();

        await pool.query(
            'INSERT INTO users (username, password, created_on, last_login) VALUES ($1, $2, $3, $4)',
            [username, password, created_on, last_login]
        );
        res.sendStatus(201);
    } catch (error) {
        console.error();
        res.sendStatus(500);
    }
});

server.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (rows.length === 0) {
            return res.status(401).send('Invalid username or password');
        }

        const user = rows[0];
        if (password !== user.password) {
            return res.status(401).send('Invalid username or password');
        }

        const last_login = new Date();
        await pool.query('UPDATE users SET last_login = $1 WHERE user_id = $2', [last_login, user_id]);

        res.status(200).send('Login successful!');
    } catch (error) {
        console.error();
        res.sendStatus(500);
    }
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected to database');
    }
});

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});
