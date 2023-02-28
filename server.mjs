import express from 'express'
import Dictionary from './public/DictionaryModule/dictionary.mjs';

const server = express();
const port = (process.env.PORT || 8080);

server.set('port', port);

server.use(express.static('public'));

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});