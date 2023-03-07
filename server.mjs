import express from 'express'
import loginRoute from './routes/login.mjs';
import registerRoute from './routes/register.mjs'

const app = express();
const port = (process.env.PORT || 8080);



app.set('port', port);
app.use(express.static('public'));
app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.listen(app.get('port'), function () {
    console.log('server running', app.get('port'));
});