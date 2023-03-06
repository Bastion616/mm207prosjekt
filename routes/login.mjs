import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send({ data: 'This page is for user login' });
});

export default router;