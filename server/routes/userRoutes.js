import express from 'express';
import { login, signup, getUser } from '../controllers/userController.js';
import { validateTokens } from '../middleware/validateTokens.js';

const router = express.Router();
// /api/auth
router.post('/login', login);
router.post('/signup', signup);
router.get('/user', validateTokens, getUser);

export default router;
