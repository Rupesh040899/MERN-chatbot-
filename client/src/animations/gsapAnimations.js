import gsap from 'gsap';

/**
 * Animate a message element sliding in from the left
 */
export const animateMessageSlideIn = (element, delay = 0) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      x: -30,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'power2.out',
      delay,
    }
  );
};

/**
 * Animate a message element fading in
 */
export const animateMessageFadeIn = (element, delay = 0) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.95,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
      delay,
    }
  );
};

/**
 * Animate multiple messages with stagger
 */
export const animateMessageStagger = (elements, delayBetween = 0.1) => {
  if (!elements || elements.length === 0) return;
  
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: delayBetween,
    }
  );
};

/**
 * Animate sidebar opening
 */
export const animateSidebarOpen = (sidebar, overlay) => {
  if (!sidebar) return;
  
  const timeline = gsap.timeline();
  
  if (overlay) {
    timeline.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      0
    );
  }
  
  timeline.fromTo(
    sidebar,
    {
      x: -100,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    },
    0
  );
};

/**
 * Animate sidebar closing
 */
export const animateSidebarClose = (sidebar, overlay) => {
  if (!sidebar) return;
  
  const timeline = gsap.timeline();
  
  if (overlay) {
    timeline.to(overlay, { opacity: 0, duration: 0.3 }, 0);
  }
  
  timeline.to(
    sidebar,
    {
      x: -100,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    },
    0
  );
};

/**
 * Animate input focus effect
 */
export const animateInputFocus = (input) => {
  if (!input) return;
  
  gsap.to(input, {
    boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
    duration: 0.3,
    ease: 'power2.out',
  });
};

/**
 * Animate input blur effect
 */
export const animateInputBlur = (input) => {
  if (!input) return;
  
  gsap.to(input, {
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    duration: 0.3,
    ease: 'power2.out',
  });
};

/**
 * Animate hover effect on button
 */
export const animateButtonHover = (button) => {
  if (!button) return;
  
  gsap.to(button, {
    scale: 1.05,
    duration: 0.2,
    ease: 'power2.out',
  });
};

/**
 * Animate button unhover
 */
export const animateButtonUnhover = (button) => {
  if (!button) return;
  
  gsap.to(button, {
    scale: 1,
    duration: 0.2,
    ease: 'power2.out',
  });
};

/**
 * Create floating background animation
 */
export const animateFloatingGradient = (element) => {
  if (!element) return;
  
  const timeline = gsap.timeline({ repeat: -1 });
  
  timeline
    .to(element, {
      backgroundPosition: '200% center',
      duration: 8,
      ease: 'none',
    })
    .to(
      element,
      {
        backgroundPosition: '0% center',
        duration: 8,
        ease: 'none',
      }
    );
};

/**
 * Animate typing indicator dots
 */
export const animateTypingDots = (dots) => {
  if (!dots || dots.length === 0) return;
  
  const timeline = gsap.timeline({ repeat: -1 });
  
  dots.forEach((dot, index) => {
    timeline.to(
      dot,
      {
        opacity: 1,
        duration: 0.4,
        ease: 'power1.inOut',
      },
      index * 0.15
    );
    
    timeline.to(
      dot,
      {
        opacity: 0.4,
        duration: 0.4,
        ease: 'power1.inOut',
      }
    );
  });
};

/**
 * Pulse animation for attention
 */
export const animatePulse = (element) => {
  if (!element) return;
  
  gsap.to(element, {
    opacity: 0.5,
    duration: 0.5,
    repeat: 1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

/**
 * Bounce animation
 */
export const animateBounce = (element) => {
  if (!element) return;
  
  gsap.to(element, {
    y: -10,
    duration: 0.3,
    ease: 'power2.out',
    onComplete: () => {
      gsap.to(element, {
        y: 0,
        duration: 0.3,
        ease: 'bounce.out',
      });
    },
  });
};
