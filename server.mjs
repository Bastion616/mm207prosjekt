import express from 'express'
import Dictionary from './public/DictionaryModule/dictionary.mjs';
import Joke from "./joke.mjs"

const server = express();
const port = (process.env.PORT || 8080);
const noJoke = new Joke(Dictionary.no.joke);
const enJoke = new Joke(Dictionary.en.joke);

server.set('port', port);

server.use(express.static('public'));

server.get("/joke/no", function (req,res,next) {
    let joke = noJoke.tellAJoke();
    res.json({joke: joke});
  });
  
  server.get("/joke/en", function (req,res,next) {
    let joke = enJoke.tellAJoke();
    res.json({joke: joke});
  });

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});