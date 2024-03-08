import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout/layout'
import Sidebar from '../../components/sidebar/sidebar'
import Main from '../../components/layout/main'
import TagsList from '../../components/blog/tags-list'


const TagsListTemplate = ({ data }) => {

  const nodes = data.allMdx.group;

  return(
    <Layout pageTitle="Tags List">
      <Sidebar />
      <Main>
        {/* {nodes.map(node => 
          <p>{node.fieldValue}</p>
        )} */}
        <TagsList page={"blog"} nodes={nodes} />
      </Main>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(filter: {fileAbsolutePath: {regex: "/blog/"}}) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
export default TagsListTemplate

