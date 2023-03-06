import express from 'express'
const router = express.Router();

router.get('/', (req, res) => {
    res.send({ data: 'This page is for user registration' });
});

export default router;