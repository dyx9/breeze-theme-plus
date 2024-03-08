import * as React from 'react'
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import Layout from '../../components/layout/layout'
import Sidebar from '../../components/sidebar/sidebar';
import Main from '../../components/layout/main';
import BlogPost from '../../components/blog/blog-post';
import Pagination from '../../components/blog/pagination';
import MyDisqus from '../../components/blog/disqus';
import SEO from '../../components/seo';



const BlogPostTemplate = ({ data, pageContext }) => {
  const frontmatter = data.mdx.frontmatter;
  const body = data.mdx.body;
  const tableOfContents = data.mdx.tableOfContents.items;

  const hasPrev = pageContext.prev !== null;
  const hasNext = pageContext.next !== null;
  const prevPage = pageContext.prev?.slug
  const nextPage = pageContext.next?.slug
  const prevTitle = pageContext.prev?.frontmatter.title
  const nextTitle = pageContext.next?.frontmatter.title

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
          page = {'blog'}
          frontmatter={frontmatter}
          body={body}
        />
        <Pagination 
          hasPrev={hasPrev} 
          hasNext={hasNext}
          prev={prevPage}
          next={nextPage}
          prevText={prevTitle}
          nextText={nextTitle}
        />
        <MyDisqus pageContext={pageContext} frontmatter={frontmatter}/>
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
      excerpt(pruneLength: 160)
    }
  }  
`

export default BlogPostTemplate