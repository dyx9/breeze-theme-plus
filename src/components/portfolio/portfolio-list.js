import * as React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from './portfolio-list.module.scss';


const PortfolioList = ({ nodes }) => {

  return (
    <div className={styles.portfolioBlock}>
      {
        nodes.map(node => (
          <Link 
            key={node.id} 
            className={styles.portfolioItem} 
            to={`/portfolio/${node.slug}`} 
          >
            <GatsbyImage 
              className={styles.backgroundImageContainer}
              image={getImage(node.frontmatter.hero_image)}
              alt={node.frontmatter.hero_image_alt}
            />

            <div className={styles.overlay}>
              <p className={styles.portfolioTitle}>{node.frontmatter.title}</p>
              <div className={styles.portfolioInfo}>
                <p>{node.frontmatter.description}</p>
                {node.frontmatter.tags.map(tag => {
                  return <span key={tag} className={styles.tags}>{tag}</span>
                })}
                
              </div>
            </div>
            

          </Link>
        ))
      }
    </div>
  )
}

export default PortfolioList