import express from 'express';
import * as controller from '../controllers/users.js';
import cacheNoStore from '../middlewares/cacheNoStore.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', cacheNoStore, /* authMiddleware, */ controller.listUsers);
router.get('/username/:username', cacheNoStore, /* authMiddleware, */ controller.listUserByUsername);
router.get('/id/:id', cacheNoStore, /* authMiddleware, */ controller.listUserById);
router.get('/cardId/:cardId', cacheNoStore, /* authMiddleware, */ controller.listUserByCardId);
router.get('/search', cacheNoStore, /* authMiddleware, */ controller.searchUsers);
router.post('/:username/addBalance', cacheNoStore, /* authMiddleware, */ controller.addBalance);
router.post('/:username/subscribe', cacheNoStore, /* authMiddleware, */ controller.subscribe);

export default router;
