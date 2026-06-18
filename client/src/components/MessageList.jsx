import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { useAutoScroll } from '../hooks/useAutoScroll';

/**
 * MessageList Component
 * Displays chat messages with auto-scroll
 */
export const MessageList = ({ messages, loading }) => {
  useAutoScroll(messages.length);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      id="message-list"
      className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {messages.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center h-full text-center"
        >
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Welcome to Rupex AI !
            </h2>
            <p className="text-gray-400 text-sm">
              Start a conversation by typing a message below
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          {messages.map((message, index) => (
            <motion.div key={message.id} variants={itemVariants}>
              <ChatMessage message={message} index={index} />
            </motion.div>
          ))}

          {loading && (
            <motion.div variants={itemVariants}>
              <TypingIndicator />
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default MessageList;
