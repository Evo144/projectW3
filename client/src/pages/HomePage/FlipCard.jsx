import React from 'react';
import { motion } from 'framer-motion';
import styles from './FlipCard.module.css';

function FlipCard({ frontContent, backContent, flipped, onClick }) {
  return (
    <div className={styles.flipCard} onClick={onClick}>
      <motion.div
        className={styles.flipCardInner}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.flipCardFront}>
          <div className={styles.cardWrapper}>
            {frontContent}
          </div>
        </div>
        <div className={styles.flipCardBack}>
          <div className={styles.cardWrapper}>
            {backContent}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default FlipCard;