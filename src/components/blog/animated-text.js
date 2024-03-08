import React from 'react';
import { motion } from 'framer-motion';
import * as styles from './blog-post.module.scss';

const AnimatedText = ({ text }) => {

  const textChars = text.split("");
  const totalAnimationTime = 1; // Total animation time in seconds
  const numChars = textChars.length;
  const staggerDuration = totalAnimationTime / numChars;

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
    }
  };


  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      {textChars.map((char, index) => (
        <motion.span className={styles.title} key={index} variants={item}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
