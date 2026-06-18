import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animateSidebarOpen, animateSidebarClose } from '../animations/gsapAnimations';

/**
 * Sidebar Component
 * Handles navigation and chat history
 */
export const Sidebar = ({ isOpen, onClose, onNewChat }) => {
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      animateSidebarOpen(sidebarRef.current, overlayRef.current);
    } else {
      animateSidebarClose(sidebarRef.current, overlayRef.current);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          />

          {/* Sidebar */}
          <motion.div
            ref={sidebarRef}
            initial={{ x: -100, opacity: 0 }}
            exit={{ x: -100, opacity: 0 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-white/10 z-40 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Rupesh AI
              </h1>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
              </button>
            </div>

            {/* New Chat Button */}
            <button
              onClick={onNewChat}
              className="m-4 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9h-3V8.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V11h-3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3v3c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3h3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
              </svg>
              New Chat
            </button>

            {/* Chat History (Placeholder) */}
            <div className="flex-1 px-4 py-6 overflow-y-auto">
              <p className="text-gray-500 text-sm text-center py-8">
                Chat history will appear here
              </p>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 space-y-2">
              <button className="w-full px-4 py-2 text-gray-300 hover:bg-white/10 rounded-lg transition-colors text-sm">
                Settings
              </button>
              <button className="w-full px-4 py-2 text-gray-300 hover:bg-white/10 rounded-lg transition-colors text-sm">
                Help & Feedback
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
