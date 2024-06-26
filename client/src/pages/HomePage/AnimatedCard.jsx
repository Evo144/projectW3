import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const AnimatedCard = ({ frontContent, backContent }) => {
  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div onClick={() => setFlipped(state => !state)} 
      style={{  
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'relative',
        width: '100%', 
        height: 'auto', 
      }}
    >
      <animated.div
        style={{
          opacity: opacity.to(o => 1 - o),
          transform,
          backfaceVisibility: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        {frontContent}
      </animated.div>
      <animated.div
        style={{
          opacity,
          transform: transform.to(t => `${t} rotateY(180deg)`),
          backfaceVisibility: 'hidden',
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(to right, #fae3f5, #ffeecb, #f6ffe7)'
        }}
      >
        {backContent}
      </animated.div>
    </div>
  );
};

export default AnimatedCard;