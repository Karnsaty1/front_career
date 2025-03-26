import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

function AnimatedBackground() {
  const [bgType, setBgType] = useState('stars'); // Toggle between 'gradient' and 'stars'

  // Gradient Background
  const gradientBackground = (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, #ff6b6b, #f06595, #e83e8c, #6f42c1)',
        backgroundSize: '400% 400%',
        zIndex: -1,
      }}
      initial={{ backgroundPosition: "0% 0%" }}
      animate={{ backgroundPosition: "100% 100%" }}
      transition={{ duration: 15, repeat: Infinity, repeatType: "loop" }}
    />
  );

  // Stars Background
  const Star = ({ style }) => {
    const springProps = useSpring({
      to: { opacity: 1 },
      from: { opacity: 0.5 },
      reset: true,
      reverse: true,
      config: { duration: 3000 },
      loop: true,
    });

    return (
      <animated.div
        style={{ 
          ...style, 
          ...springProps, 
          backgroundColor: 'white',
          position: 'absolute',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
    );
  };

  const starsBackground = (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'black' }}>
      {[...Array(100)].map((_, i) => (
        <Star
          key={i}
          style={{ 
            width: `${Math.random() * 3 + 1}px`, 
            height: `${Math.random() * 3 + 1}px`, 
            top: `${Math.random() * 100}vh`, 
            left: `${Math.random() * 100}vw` 
          }}
        />
      ))}
    </div>
  );

  const getBackground = () => {
    switch (bgType) {
      case 'stars':
        return starsBackground;
      case 'gradient':
      default:
        return gradientBackground;
    }
  };

  return (
    <div>
      {getBackground()}
      <button onClick={() => setBgType('gradient')}>Gradient</button>
      <button onClick={() => setBgType('stars')}>Stars</button>
    </div>
  );
}

export default AnimatedBackground;
