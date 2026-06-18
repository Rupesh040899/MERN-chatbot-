import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

/**
 * Create API client instance
 */
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Send chat message to AI
 * @param {string} message - User message
 * @returns {Promise<string>} - AI response
 */
export const sendChatMessage = async (message, history = []) => {
  const formattedHistory = history
    .filter(m => m.sender === 'user' || m.sender === 'ai')
    .map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text,
    }));

  try {
    const response = await apiClient.post('/api/chat', {
      message: message.trim(),
      history: formattedHistory,
    });
    
    if (!response.data || !response.data.reply) {
      throw new Error('Invalid response from server');
    }
    
    return response.data.reply;
  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Handle different error types
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please wait before sending another message.');
    } else if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection and try again.');
    } else if (error.message === 'Network Error') {
      throw new Error('Network error. Make sure the backend server is running on port 5000.');
    } else {
      throw new Error(error.response?.data?.error || error.message || 'Failed to get AI response');
    }
  }
};

/**
 * Check if API is available
 * @returns {Promise<boolean>} - True if API is reachable
 */
export const checkApiHealth = async () => {
  try {
    const response = await apiClient.get('/health', {
      timeout: 5000,
    });
    return response.status === 200;
  } catch {
    return false;
  }
};

export default apiClient;
