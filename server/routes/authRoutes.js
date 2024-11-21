import express from 'express';
import { login, signup, logOut } from '../controllers/authController.js';
import { validateTokens } from '../middleware/validateTokens.js';

const router = express.Router();

// ENDPOINTS:

// POST (base_url)/api/auth/login
router.post('/login', login);

// POST (base_url)/api/auth/signup
router.post('/signup', signup);

// GET (base_url)/api/auth/logout
router.get('/logout', validateTokens, logOut);

export default router;
