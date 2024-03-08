import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout/layout'
import Sidebar from '../../components/sidebar/sidebar'
import Main from '../../components/layout/main'
import PortfolioList from '../../components/portfolio/portfolio-list'

const PortfolioTagsPage = ({ data, pageContext }) => {

    const nodes = data.allMdx.nodes
    const { tags } = pageContext

  return(
    <Layout pageTitle="Portfolio Tag List">
      <Sidebar page={'portfolio'} tags={tags} />
      <Main>
        <PortfolioList nodes = {nodes} />
      </Main>
    </Layout>
  )
}

export default PortfolioTagsPage

export const query = graphql`
query ($currentTag: [String]) {
    allMdx(
    filter: {frontmatter: {tags: {in: $currentTag}}, fileAbsolutePath: {regex: "/portfolio/"}}
      sort: {fields: frontmatter___date, order: DESC}
    ) {
      nodes {
        slug
        id
        frontmatter {
          title
          description
          date
          hero_image {
            childImageSharp {
              gatsbyImageData
            }
          }
          hero_image_alt
          tags
        }
      }
    }
  }
`