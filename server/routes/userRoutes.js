import express from 'express';
import {
  getUserFromCookies,
  getAllUsers,
  deleteUser,
  updateUser,
} from '../controllers/userController.js';
import { validateTokens } from '../middleware/validateTokens.js';
import { validateAdmin } from '../middleware/validateAdmin.js';
import { validateId } from '../middleware/validateId.js';

const router = express.Router();

// ENDPOINTS:

// GET (base_url)/api/users
router.get('/', validateTokens, validateAdmin, getAllUsers);

// GET (base_url)/api/users/me
router.get('/me', validateTokens, getUserFromCookies);

// PUT (base_url)/api/users/:userId
router.put(
  '/:userId',
  validateId('userId'),
  validateTokens,
  validateAdmin,
  updateUser
);

// DELETE (base_url)/api/users/:userId
router.delete(
  '/:userId',
  validateId('userId'),
  validateTokens,
  validateAdmin,
  deleteUser
);

export default router;
