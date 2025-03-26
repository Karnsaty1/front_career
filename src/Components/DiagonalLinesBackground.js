import React from 'react';
import { useSpring, animated } from '@react-spring/web';

function DiagonalLinesBackground() {
  const props = useSpring({
    from: { backgroundPosition: '0% 0%' },
    to: { backgroundPosition: '100% 100%' },
    config: { duration: 10000 },
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
        background: 'linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1))',
        backgroundSize: '50px 50px',
        ...props,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}

export default DiagonalLinesBackground;
