import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout/layout'
import Sidebar from '../../components/sidebar/sidebar';
import Main from '../../components/layout/main';
import BlogList from '../../components/blog/blog-list';
import Pagination from '../../components/blog/pagination';


const BlogListTemplate = ({data, pageContext}) => {
  const { currentPage, numPages, tags } = pageContext;
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < numPages;
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <Layout pageTitle="Blog">
      <Sidebar page={'blog'} tags={tags}/>
      <Main>
        <BlogList nodes={data.allMdx.nodes} pageContext={pageContext}/>
        <Pagination 
          hasPrev={hasPrev} 
          hasNext={hasNext}
          prev={prevPage}
          next={nextPage}
        />
      </Main>
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMdx(
      sort: {
        fields: frontmatter___date
        order: DESC 
      }
      limit: $limit
      skip: $skip
      filter: {fileAbsolutePath: {regex: "/blog/"}}
    ) 
    {
      nodes {
        frontmatter {
          title
          description
          date(formatString: "DD MM YYYY")
          hero_image {
            childImageSharp {
              gatsbyImageData
            }
          }
          hero_image_alt
        }
        id
        slug
      }
    }
  }
`

export default BlogListTemplate