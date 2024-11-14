import express from 'express';
import { login, signup } from '../controllers/userController.js';

const router = express.Router();
// /api/auth
router.post('/login', login);
router.post('/signup', signup);

export default router;
