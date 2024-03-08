import React from 'react'
import * as styles from './footer.module.scss';

const Footer = ({ footer }) => {

  return (
    <div className={styles.footerContainer}>
      <p>
        Powered by&nbsp;
        <a href={footer.powered} target="_blank" rel="noreferrer">Gatsby</a>
        &nbsp;and &nbsp;
        <a href={footer.inspired} target="_blank" rel="noreferrer">Breeze Theme+</a>
      </p>
      <p>© 2024 Copyright&nbsp;
        <a href={footer.copyright} target="_blank" rel="noreferrer">Yixuan</a>
        &nbsp;All rights reserved.</p>
    </div>
  )
}

export default Footer