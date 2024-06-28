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
    <div onClick={() => setFlipped(state => !state)} style={{ position: 'relative', width: '300px', height: '200px' }}>
      <animated.div
        style={{
          opacity: opacity.to(o => 1 - o),
          transform,
          position: 'absolute',
          backfaceVisibility: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        {frontContent}
      </animated.div>
      <animated.div
        style={{
          opacity: opacity.to(o => o),
          transform: transform.to(t => `${t} rotateY(180deg)`),
          position: 'absolute',
          backfaceVisibility: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        {backContent}
      </animated.div>
    </div>
  );
};

export default AnimatedCard;