import * as React from 'react'
import { graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import Layout from '../../components/layout/layout'
import SEO from '../../components/seo'
import Sidebar from '../../components/sidebar/sidebar'
import Main from '../../components/layout/main'
import BlogPost from '../../components/blog/blog-post'


const PortfolioPage = ({ data }) => {
  const frontmatter = data.mdx.frontmatter;
  const body = data.mdx.body;
  const tableOfContents = data.mdx.tableOfContents.items;
  return (
    <Layout pageTitle={frontmatter.title}>
      <SEO 
        title={frontmatter.title}
        description={frontmatter.description || data.mdx.excerpt}
        image={getImage(frontmatter.hero_image)}
      />
      <Sidebar toc={tableOfContents}/>
      <Main>
        <BlogPost
          page={'portfolio'}
          frontmatter={frontmatter}
          body={body}
        />
        {/* <MyDisqus pageContext={pageContext} frontmatter={frontmatter}/> */}
      </Main>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String) {
    mdx(slug: {eq: $slug}) {
      body
      frontmatter {
        date(formatString: "DD MM YYYY")
        date_updated(formatString: "DD MM YYYY")
        tags
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        title
      }
      tableOfContents
    }
  }  
`

export default PortfolioPage