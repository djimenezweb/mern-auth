import express from 'express';
import { validateTokens } from '../middleware/validateTokens.js';
import {
  getSessionsFromUserId,
  deleteSessionFromSessionId,
} from '../controllers/sessionController.js';

const router = express.Router();

// /api/session
router.get('/:userId', validateTokens, getSessionsFromUserId);
router.delete('/:sessionId', validateTokens, deleteSessionFromSessionId);

export default router;
