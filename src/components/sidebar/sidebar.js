import * as React from 'react'
import { useState } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby';
import { MdClose, MdMenu } from 'react-icons/md';
import * as styles from '../sidebar/sidebar.module.scss'
import Menu from './menu/menu';
import SocialLinks from './social-links/social-links';
import TableOfContents from '../blog/table-of-contents';
import TagsList from '../blog/tags-list';
import Footer from './footer/footer';


const Sidebar = ({ page, toc, tags }) => {

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          sidebarMenu {
            url
            label
          }
          social {
            email
            github
            linkedin
            twitter
            telegram
          }
          footer {
            powered
            inspired
            copyright
          }
        }
      }
    }
  `)

  const [openSidebar, setOpenSidebar] = useState(false)
  //const [active, setActive] = useState(false)

  return (
    <>
      <div className={openSidebar ? styles.sidebar+' '+styles.active : styles.sidebar} >

        {/* mobile header */}
        <ul className={styles.mobileHeader}>
            <li className={styles.logo}> <Link to="/">Yixuan Dai</Link> </li>
            {/* <a href='#' onClick={() => setOpenSidebar(!openSidebar)} onKeyDown={() => setOpenSidebar(!openSidebar)}>
                {!openSidebar && <MdMenu />}
                {openSidebar && <MdClose />}
            </a> */}
            <button className={styles.navButton}
              onClick={() => setOpenSidebar(!openSidebar)} onKeyDown={() => setOpenSidebar(!openSidebar)}
            >
              {!openSidebar && <MdMenu />}
              {openSidebar && <MdClose />}
            </button>
        </ul>

        <Menu menu={data.site.siteMetadata.sidebarMenu}/>
        <SocialLinks social={data.site.siteMetadata.social}/>

        {/* <ul className={toc||tags ? styles.interactiveArea+' '+styles.active : styles.interactiveArea}> */}
        <ul className={styles.interactiveArea}>
          {tags && <TagsList page={page} nodes={tags} />}
          {toc && <TableOfContents items={toc} />}
        </ul>

        <ul>
          <Footer footer={data.site.siteMetadata.footer}/>
        </ul>
      </div>
    </>
  )
}

export default Sidebar