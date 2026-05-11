import React, { useEffect, useRef } from 'react';
import { animateTypingDots } from '../animations/gsapAnimations';

/**
 * TypingIndicator Component
 * Shows animated dots while AI is "typing"
 */
export const TypingIndicator = () => {
  const dotsRef = useRef([]);

  useEffect(() => {
    if (dotsRef.current.length > 0) {
      animateTypingDots(dotsRef.current);
    }
  }, []);

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-3xl rounded-tl-lg w-fit">
      <span className="text-gray-400 text-sm">AI is typing</span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className="w-2 h-2 rounded-full bg-blue-500 opacity-40"
          />
        ))}
      </div>
    </div>
  );
};

export default TypingIndicator;
