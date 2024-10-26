import express from 'express';
import * as controller from '../controllers/auth.js';

const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/forgot-password', controller.forgotPassword);

export default router;
