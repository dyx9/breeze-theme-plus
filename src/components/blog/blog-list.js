import * as React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from './blog-list.module.scss';


const BlogList = ({ nodes }) => {

  return (
    <>
      {
        nodes.map(node => (
          <Link 
            key={node.id} 
            className={styles.blogBlock}
            to={`/blog/${node.slug}`}
          >
            <div className={styles.nonImagePart}>
                <p className={styles.title}>{node.frontmatter.title}</p>
                <p className={styles.postBrief}>
                  {node.frontmatter.description}
                </p>
                <p className={styles.postTime}>Posted: {node.frontmatter.date}</p>
            </div>

            <div className={styles.imagePart}>
                <GatsbyImage 
                  class={styles.img}
                  image={getImage(node.frontmatter.hero_image)}
                  alt={node.frontmatter.hero_image_alt}
                />
            </div>
          </Link>
        ))
      }
    </>
  )
}

export default BlogList