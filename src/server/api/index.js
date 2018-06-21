
import express from 'express';
import * as db from '../db';
// import catalogList from './catalogList';

const router = express.Router();

// router.use('/catalogList', catalogList);
router.get('/catalogList', async (req, res, next) => {
  const testData = await db.getCatalogList();

  res.json(testData);
});

router.get('/catalog/:id', async (req, res, next) => {
  const id = req.params.id;

  const testData = await db.getCatalogById(id);

  res.json(testData);
});

// catch 404 and forward to error handler
router.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

export default router;
