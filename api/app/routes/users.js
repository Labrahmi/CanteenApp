import express from 'express';
import * as controller from '../controllers/users.js';
import cacheNoStore from '../middlewares/cacheNoStore.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', cacheNoStore, /* authMiddleware, */ controller.listUsers);
router.get('/:username', cacheNoStore, /* authMiddleware, */ controller.getUser);
router.post('/:username/addBalance', cacheNoStore, /* authMiddleware, */ controller.addBalance);

export default router;
