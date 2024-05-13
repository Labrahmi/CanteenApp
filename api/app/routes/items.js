import express from 'express';
import * as controller from '../controllers/items.js';
import cacheNoStore from '../middlewares/cacheNoStore.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', cacheNoStore, /* authMiddleware, */ controller.listItems);

export default router;
