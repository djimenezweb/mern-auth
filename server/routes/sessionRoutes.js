import express from 'express';
import { validateTokens } from '../middleware/validateTokens.js';
import {
  getSessionsFromUserId,
  deleteSessionFromSessionId,
  updateSession,
} from '../controllers/sessionController.js';
import { validateId } from '../middleware/validateId.js';
import { validateAdmin } from '../middleware/validateAdmin.js';

const router = express.Router();

// ENDPOINTS:

// GET (base_url)/api/session/:userId
router.get(
  '/:userId',
  validateId('userId'),
  validateTokens,
  getSessionsFromUserId
);

// DELETE (base_url)/api/session/:sessionId
router.delete(
  '/:sessionId',
  validateId('sessionId'),
  validateTokens,
  deleteSessionFromSessionId
);

// PUT (base_url)/api/session/:sessionId
router.put(
  '/:sessionId',
  validateId('sessionId'),
  validateTokens,
  validateAdmin,
  updateSession
);

export default router;
