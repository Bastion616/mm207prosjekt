import express from 'express';
import userRoute from './routes/users.mjs';
import wishlistRoute from './routes/wishlist.mjs';

const server = express();
const port = (process.env.PORT || 8080);

server.set('port', port);
server.use(express.static('public'));
server.use(express.json());
server.use('/users', userRoute);
server.use('/wishlist', wishlistRoute);

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});
