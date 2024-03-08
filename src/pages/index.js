import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout/layout'
import Sidebar from '../components/sidebar/sidebar'
import Main from '../components/layout/main'
import * as styles from './index.module.scss';


const IndexPage = ({ data }) => {

  return (
    <Layout pageTitle="Home Page">
      <Sidebar />
      <Main >
        <div className={styles.indexContainer} >
          <p id={styles.lineOne}>Hi 👋</p>
          <p>It's great to have you here, where you can find more <Link to='about'>about me</Link>.</p>
          <p>I write <Link to='blog'>blogs</Link> occasionally - some delve into technical subjects, while others record daily musings. </p>
          
          <p>My <Link to='portfolio'>portfolio</Link> 
            {' '} showcases a variety of projects, spanning
            {' '} <Link className={styles.tag} to='portfolio/tags/software-development'><span>#software development</span></Link> {' '} 
            to <Link className={styles.tag} to='portfolio/tags/interaction-design'><span>#interaction design</span></Link>.</p>
          
          
          <p>Feel free to <Link to='contact'>reach out</Link> if anything catches your interest!</p>
          {/* <StaticImage
          {/* <StaticImage
            alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
            src="https://images.unsplash.com/photo-1571988840298-3b5301d5109b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80"
          /> */}
        </div>

      </Main>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: {fields: frontmatter___date, order: DESC}, limit: 2000) {
      nodes {
        slug
      }
    }
  }

`

export default IndexPage