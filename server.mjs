import express from 'express';
import router from './routes/users.mjs';

const server = express();
const port = (process.env.PORT || 8080);

server.set('port', port);
server.use(express.static('public'));
server.use(express.json());
server.use('/users', router);


server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});
