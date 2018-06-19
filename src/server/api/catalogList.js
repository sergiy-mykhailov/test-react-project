
import express from 'express';

const router = express.Router();

router.get('/', async (req, res, next) => {
    const testData = [
        { id: '1', name: 'catalog' },
        { id: '2', name: 'new catalog' },
    ];

    res.json(testData);
});

export default router;