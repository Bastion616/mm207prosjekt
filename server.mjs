import express from 'express';
import pg from 'pg';
import router from './routes/users.mjs';

const server = express();
const port = (process.env.PORT || 8080);

/*const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
*/

server.set('port', port);
server.use(express.static('public'));
server.use(express.json());
server.use('/users', router);


server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});
