import React from 'react'
import { Link } from 'gatsby';
import * as styles from './menu.module.scss';

const Menu = ({ menu }) => {

  let currentPath = '';

  if (typeof window !== 'undefined') {
    currentPath = window.location.href;
  }

  return (
    <>
      <ul className={styles.menu}>
        <li className={styles.logo}> 
          <Link activeClassName={styles.logoActive} to="/">Yixuan Dai</Link> 
        </li>
        {
          menu.map(m => 
          <li key={m.url}>
            <Link 
              className={currentPath.includes(m.url) ? styles.active : undefined}
              to={`/${m.url}`}
            >
              {m.label}
            </Link>
          </li>)
        }
      </ul>
    </>
  )
}

export default Menu