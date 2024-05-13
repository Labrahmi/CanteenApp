import express from 'express';
import * as controller from '../controllers/transactions.js';
import cacheNoStore from '../middlewares/cacheNoStore.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', cacheNoStore, /* authMiddleware, */ controller.listTransactions);
router.post('/', cacheNoStore, /* authMiddleware, */ controller.createTransaction);

export default router;
