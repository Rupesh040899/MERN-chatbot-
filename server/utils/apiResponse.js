/**
 * API Response Utilities
 */

/**
 * Create success response
 * @param {object} data - Response data
 * @param {string} message - Response message
 * @returns {object} - Formatted response
 */
export const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Create error response
 * @param {string} error - Error type
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @returns {object} - Formatted error response
 */
export const errorResponse = (error, message, statusCode = 500) => {
  return {
    success: false,
    error,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Format API response with pagination
 * @param {object} data - Response data
 * @param {number} total - Total items
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @returns {object} - Paginated response
 */
export const paginatedResponse = (data, total, page = 1, limit = 10) => {
  return {
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
    timestamp: new Date().toISOString(),
  };
};

export default {
  successResponse,
  errorResponse,
  paginatedResponse,
};
