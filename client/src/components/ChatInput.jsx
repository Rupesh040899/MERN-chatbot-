import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { animateInputFocus, animateInputBlur } from '../animations/gsapAnimations';

/**
 * ChatInput Component
 * Handles user input with animations
 */
export const ChatInput = ({ onSend, disabled = false, placeholder = "Ask me anything..." }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);
  const containerRef = useRef(null);

  // Handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
    // Auto-grow textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  // Handle send
  const handleSend = async () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Animate focus
  const handleFocus = () => {
    if (containerRef.current) {
      animateInputFocus(containerRef.current);
    }
  };

  // Animate blur
  const handleBlur = () => {
    if (containerRef.current) {
      animateInputBlur(containerRef.current);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex gap-3 items-flex-end bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
      style={{
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}
    >
      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
        rows="1"
        className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none max-h-32 font-medium text-base"
      />

      {/* Send Button */}
      <motion.button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        className={`flex-shrink-0 w-10 h-10 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
          disabled || !input.trim()
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
        }`}
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16151496 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.98721575 L3.03521743,10.4282088 C3.03521743,10.5853061 3.19218622,10.7424035 3.50612381,10.7424035 L16.6915026,11.5278905 C16.6915026,11.5278905 17.1624089,11.5278905 17.1624089,12.0991827 C17.1624089,12.6704748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default ChatInput;
