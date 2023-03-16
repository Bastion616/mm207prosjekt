import express from 'express'
import { create } from 'node:domain';
const { createHmac } = await import('node:crypto');
const router = express.Router();

let userList = [];

router.post('/register', async (req, res) => {
    try {
        const hash = createHmac('sha256', req.body.password).digest('hex');

        const user = { username : req.body.username, password : hash };
        userList.push(user);
        res.send(userList);

        
    } catch (error) {
        console.error();
        res.sendStatus(500);
    }
});

router.post('/login', async (req, res) => {
    let found = false
    const hash = createHmac('sha256', req.body.password).digest('hex');
    for (let i of userList) {
        if (req.body.username === i.username && i.password === hash) {
            res.send({"Login" : "OK!"});
            found = true;
            break;
        }
    } 
    if (!found) {
        res.status(401).send({"Error" : "Invalid username or password"});
    }
});


export default router;