/**
 * Error Handler Middleware
 */
export const errorHandler = (err, req, res, next) => {
  // Set default values
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error
  console.error(`[${new Date().toISOString()}] Error:`, {
    status,
    message,
    method: req.method,
    path: req.path,
    error: err,
  });

  // Handle specific error types
  if (err.response?.status === 401) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid API credentials',
    });
  }

  if (err.response?.status === 429) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.',
    });
  }

  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      error: 'Service Unavailable',
      message: 'Cannot reach AI provider service',
    });
  }

  if (err.code === 'ECONNABORTED') {
    return res.status(504).json({
      error: 'Gateway Timeout',
      message: 'Request to AI provider timed out',
    });
  }

  // Default error response
  res.status(status).json({
    error: err.name || 'Error',
    message: message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
    }),
  });
};

export default errorHandler;
