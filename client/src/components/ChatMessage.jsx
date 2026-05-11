import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { copyToClipboard } from '../utils/helpers';
import { animateMessageSlideIn } from '../animations/gsapAnimations';

// Configure marked for markdown rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Custom renderer for code blocks
const renderer = new marked.Renderer();
renderer.code = ({ text, lang }) => {
  const highlighted = lang ? hljs.highlight(text, { language: lang, ignoreIllegals: true }).value : hljs.highlightAuto(text).value;
  return `<pre class="rounded-lg bg-slate-900 p-4 overflow-x-auto"><code class="language-${lang || 'plaintext'}">${highlighted}</code></pre>`;
};

renderer.codespan = ({ text }) => {
  return `<code class="bg-slate-800 px-2 py-1 rounded text-sm">${text}</code>`;
};

renderer.link = ({ href, text }) => {
  return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">${text}</a>`;
};

marked.setOptions({ renderer });

/**
 * ChatMessage Component
 * Renders individual chat messages with animations
 */
export const ChatMessage = ({ message, index }) => {
  const messageRef = useRef(null);
  const isUser = message.sender === 'user';
  const isError = message.sender === 'error';

  useEffect(() => {
    if (messageRef.current) {
      animateMessageSlideIn(messageRef.current, index * 0.05);
    }
  }, [index]);

  const handleCopy = async () => {
    const copied = await copyToClipboard(message.text);
    if (copied) {
      // Show copy feedback
      const button = event.target;
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 2000);
    }
  };

  // Render markdown for AI responses
  const renderContent = () => {
    if (isUser || isError) {
      return message.text;
    }
    
    try {
      const html = marked.parse(message.text);
      return (
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return message.text;
    }
  };

  return (
    <motion.div
      ref={messageRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 gap-3`}
    >
      <div
        className={`max-w-xs lg:max-w-2xl ${
          isUser
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-3xl rounded-tr-lg'
            : isError
            ? 'bg-red-900/30 border border-red-500/30 text-red-200 rounded-3xl rounded-tl-lg'
            : 'bg-white/10 backdrop-blur-md border border-white/20 text-gray-100 rounded-3xl rounded-tl-lg'
        } px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300`}
      >
        <div className="text-sm leading-relaxed break-words">
          {renderContent()}
        </div>

        {/* Copy Button (only for AI responses) */}
        {!isUser && !isError && (
          <button
            onClick={handleCopy}
            className="mt-3 text-xs text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
            title="Copy message"
          >
            Copy
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
