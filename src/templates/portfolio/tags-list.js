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
        <TagsList page={"portfolio"} nodes={nodes} />
      </Main>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(filter: {fileAbsolutePath: {regex: "/portfolio/"}}) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
export default TagsListTemplate

