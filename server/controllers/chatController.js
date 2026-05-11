import { generateAIResponse } from '../services/aiProvider.js';
import { validateMessage } from '../utils/validation.js';

/**
 * Chat Controller
 * Handles chat message requests
 */
export const chatController = async (req, res, next) => {
  try {
    // Extract and validate message
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Message is required',
      });
    }

    // Validate message
    const validation = validateMessage(message);
    if (!validation.valid) {
      return res.status(400).json({
        error: 'Invalid Message',
        message: validation.error,
      });
    }

    // Generate AI response
    const reply = await generateAIResponse(message);

    // Return response
    res.json({
      success: true,
      message: message,
      reply: reply,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
