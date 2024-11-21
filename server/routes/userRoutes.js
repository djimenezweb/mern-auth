import express from 'express';
import {
  getUserFromCookies,
  getAllUsers,
} from '../controllers/userController.js';
import { validateTokens } from '../middleware/validateTokens.js';
import { validateAdmin } from '../middleware/validateAdmin.js';

const router = express.Router();

// ENDPOINTS:

// GET (base_url)/api/users
router.get('/', validateTokens, validateAdmin, getAllUsers);

// GET (base_url)/api/users/me
router.get('/me', validateTokens, getUserFromCookies);

export default router;
