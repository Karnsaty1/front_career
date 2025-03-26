import React from 'react';
import { useSpring, animated } from '@react-spring/web';

function GradientBackground() {
  const props = useSpring({
    from: { backgroundPosition: '0% 0%' },
    to: { backgroundPosition: '100% 100%' },
    config: { duration: 15000 },
    reset: true,
    loop: true
  });

  return (
    <animated.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, #FFB6C1, #FF69B4, #FFC0CB, #FF6347)',
        backgroundSize: '400% 400%',
        ...props,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}

export default GradientBackground;
