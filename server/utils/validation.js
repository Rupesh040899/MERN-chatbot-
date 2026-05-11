/**
 * Message Validation Utilities
 */

const MIN_MESSAGE_LENGTH = 1;
const MAX_MESSAGE_LENGTH = 4000;

/**
 * Validate user message
 * @param {string} message - Message to validate
 * @returns {object} - Validation result { valid: boolean, error?: string }
 */
export const validateMessage = (message) => {
  if (!message || typeof message !== 'string') {
    return {
      valid: false,
      error: 'Message must be a non-empty string',
    };
  }

  const trimmed = message.trim();

  if (trimmed.length < MIN_MESSAGE_LENGTH) {
    return {
      valid: false,
      error: 'Message is too short',
    };
  }

  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return {
      valid: false,
      error: `Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters`,
    };
  }

  return { valid: true };
};

/**
 * Sanitize message
 * @param {string} message - Message to sanitize
 * @returns {string} - Sanitized message
 */
export const sanitizeMessage = (message) => {
  return message
    .trim()
    .replace(/[\n\r]+/g, ' ')
    .replace(/\s+/g, ' ');
};

/**
 * Validate API request
 * @param {object} req - Express request object
 * @returns {object} - Validation result
 */
export const validateRequest = (req) => {
  if (!req.body) {
    return {
      valid: false,
      error: 'Request body is required',
    };
  }

  return { valid: true };
};

export default {
  validateMessage,
  sanitizeMessage,
  validateRequest,
};
