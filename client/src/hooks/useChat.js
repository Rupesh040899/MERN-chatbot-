import { useState, useCallback } from 'react';
import { sendChatMessage } from '../services/chatService';

/**
 * Custom hook for chat functionality
 */
export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMessage = useCallback((text, sender = 'user') => {
    const message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
    return message;
  }, []);

  const sendMessage = useCallback(
    async (userMessage) => {
      setError(null);
      setLoading(true);

      // Add user message
      addMessage(userMessage, 'user');

      try {
        // Get AI response
        const aiResponse = await sendChatMessage(userMessage);
        
        // Add AI response
        addMessage(aiResponse, 'ai');
        
        return aiResponse;
      } catch (err) {
        const errorMessage = err.message || 'Failed to get AI response';
        setError(errorMessage);
        addMessage(`Error: ${errorMessage}`, 'error');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [addMessage]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    addMessage,
    clearChat,
    clearError,
  };
};

export default useChat;
