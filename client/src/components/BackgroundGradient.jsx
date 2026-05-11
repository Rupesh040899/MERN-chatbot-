import React, { useEffect, useRef } from 'react';
import { animateFloatingGradient } from '../animations/gsapAnimations';

/**
 * BackgroundGradient Component
 * Creates animated floating gradient background
 */
export const BackgroundGradient = () => {
  const gradientRef = useRef(null);

  useEffect(() => {
    if (gradientRef.current) {
      animateFloatingGradient(gradientRef.current);
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-dark-950">
      {/* Base gradient */}
      <div
        ref={gradientRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-dark-950 to-purple-900/20 animate-pulse-subtle"
        style={{
          backgroundSize: '200% 200%',
          backgroundPosition: '0% center',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-4000" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
    </div>
  );
};

export default BackgroundGradient;
