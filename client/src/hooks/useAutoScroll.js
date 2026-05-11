import { useEffect } from 'react';

/**
 * Custom hook for auto-scrolling to bottom
 */
export const useAutoScroll = (dependency = null) => {
  useEffect(() => {
    const scrollContainer = document.getElementById('message-list');
    if (scrollContainer) {
      // Use requestAnimationFrame for smooth scrolling
      requestAnimationFrame(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      });
    }
  }, [dependency]);
};

export default useAutoScroll;
