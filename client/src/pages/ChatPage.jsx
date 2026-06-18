import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundGradient from '../components/BackgroundGradient';
import Sidebar from '../components/Sidebar';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import { useChat } from '../hooks/useChat';

/**
 * ChatPage Component
 * Main chat interface
 */
export const ChatPage = () => {
  const { messages, loading, error, sendMessage, clearChat } = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSendMessage = async (message) => {
    try {
      await sendMessage(message);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleNewChat = () => {
    clearChat();
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white flex flex-col overflow-hidden">
      <BackgroundGradient />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
      />

      {/* Main Chat */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex flex-col max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between py-4 border-b border-white/10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors lg:hidden"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>

          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Rupex AI
          </h1>

          <button
            onClick={handleNewChat}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="New chat"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9h-3V8.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V11h-3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3v3c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3h3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <MessageList messages={messages} loading={loading} />

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/30 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg text-sm"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0">⚠️</span>
              <p>{error}</p>
            </div>
          </motion.div>
        )}

        {/* Input Area */}
        <div className="py-4">
          <ChatInput
            onSend={handleSendMessage}
            disabled={loading}
            placeholder="Ask me anything... (Shift+Enter for new line)"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ChatPage;
