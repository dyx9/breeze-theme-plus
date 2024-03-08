import * as React from 'react'
import * as styles from './main.module.scss';
import { motion } from 'framer-motion'


const Main = ({ children }) => {

  return (
    <motion.div
      initial={{ opacity: 0, }}
      animate={{ opacity: 1, }}
      transition={{duration: 0.5}}
      className={styles.content}
    >
      {children}
    </motion.div>

    // <div className={styles.content}>
    // {children}
    // </div>
  )
}

export default Main