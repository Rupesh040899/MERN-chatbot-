import express from 'express';
import { chatController } from '../controllers/chatController.js';

const router = express.Router();

/**
 * POST /api/chat
 * Send message and get AI response
 */
router.post('/chat', chatController);

export default router;
