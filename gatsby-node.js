const path = require("path")
const _ = require("lodash")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const postResult = await graphql(
    `
      {
        allMdx(sort: {fields: frontmatter___date, order: DESC}, limit: 2000, filter: {fileAbsolutePath: {regex: "/blog/"}}) {
          edges {
            node {
              slug
            }
            next {
              slug
              frontmatter {
                title
              }
            }
            previous {
              slug
              frontmatter {
                title
              }
            }
          }
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `
  )

  const portfolioResult = await graphql(
    `
      {
        allMdx(sort: {fields: frontmatter___date, order: DESC}, limit: 2000, filter: {fileAbsolutePath: {regex: "/portfolio/"}}) {
          edges {
            node {
              slug
            }
            next {
              slug
              frontmatter {
                title
              }
            }
            previous {
              slug
              frontmatter {
                title
              }
            }
          }
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `
  )

  if (postResult.errors || portfolioResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = postResult.data.allMdx.edges;
  const postTags = postResult.data.allMdx.group;

  const portfolioTags = portfolioResult.data.allMdx.group;

  // Generate blog-list page with pagination
  const postsPerPage = 4
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blog/blog-list.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        tags: postTags,
      },
    })
  })

  // Generate blog-post page with links to adjacent posts
  posts.forEach((edge) => {
    createPage({
      path: `/blog/${edge.node.slug}`,
      component: path.resolve("./src/templates/blog/blog-post.js"),
      context: {
        slug: edge.node.slug,
        prev: edge.previous,
        next: edge.next,
      },
    })
  })

  // Generate post tags-list page
  createPage({
    path: `/blog/tags`,
    component: path.resolve("./src/templates/blog/tags-list.js"),
  })

  // Generate post tags page
  postTags.forEach(tag => {
    createPage({
      path: `/blog/tags/${_.kebabCase(tag.fieldValue)}`,
      component: path.resolve("./src/templates/blog/tags.js"),
      context: { 
        currentTag: tag.fieldValue,
        count: tag.totalCount,
        tags: postTags,
      }
    })
  });

    // Generate portfolio tags-list page
    createPage({
      path: `/portfolio/tags`,
      component: path.resolve("./src/templates/portfolio/tags-list.js"),
    })

  // Generate portfolio tags page
  portfolioTags.forEach(tag => {
    createPage({
      path: `/portfolio/tags/${_.kebabCase(tag.fieldValue)}`,
      component: path.resolve("./src/templates/portfolio/tags.js"),
      context: { 
        currentTag: tag.fieldValue,
        count: tag.totalCount,
        tags: portfolioTags
      }
    })
  });

}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    if (node.internal.type === `Mdx`) {
      const value = createFilePath({ node, getNode })
      createNodeField({
        name: `slug`,
        node,
        value,
      })
    }
  }