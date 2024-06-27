import { useState } from "react";
import { useSpring, animated } from "react-spring";
import {
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";
import styles from '../pages/HomePage/HomePage.module.css';

export default function AnimatedCard({ el, handleCardClick }) {
  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

  const handleFlip = () => {
    setFlipped(!flipped);
    handleCardClick(el);
  }

  return (
    <Card align="center" key={el.id} className={styles.cardContainer}>
      <animated.div
        style={{ transform }}
        onClick={handleFlip}
        className={`${styles.card} ${flipped ? styles.cardFlipped : ''}`}
      >
        <animated.div
          style={{ opacity }}
          className={styles.cardFront}
        >
          <CardBody>
            <Text>{el.word}</Text>
          </CardBody>
        </animated.div>
        <animated.div
          style={{ opacity: opacity.to((o) => 1 - o), transform }}
          className={styles.cardBack}
        >
          <CardBody>
            <Text fontSize="lg">{el.translate}</Text>
          </CardBody>
        </animated.div>
      </animated.div>
    </Card>
  );
}