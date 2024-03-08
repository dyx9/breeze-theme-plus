import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import * as styles from './layout.module.scss';
import MobileNav from '../mobile-nav/mobile-nav';


const Layout = ({ pageTitle, children }) => {

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={styles.container}>
      <title>{pageTitle} | {data.site.siteMetadata.title}</title>
      <div className={styles.mobileNav}>
        <MobileNav />
      </div>
      {children}
    </div>
  )
}

export default Layout