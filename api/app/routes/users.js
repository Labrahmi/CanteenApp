import express from 'express';
import * as controller from '../controllers/users.js';
import cacheNoStore from '../middlewares/cacheNoStore.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', cacheNoStore, /* authMiddleware, */ controller.listUsers);

export default router;
