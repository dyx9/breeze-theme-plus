import * as React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase'
import { FiTag } from 'react-icons/fi'
import { BiCalendar, BiCalendarEdit } from 'react-icons/bi'
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
import * as styles from './blog-post.module.scss';
import { motion } from 'framer-motion'
import AnimatedText from './animated-text';


const BlogPost = ({ page, frontmatter, body }) => {

  deckDeckGoHighlightElement();

  return (
    <>
      <div className={styles.heroImageContainer}>
        <GatsbyImage
            className={styles.heroImage}
            image={getImage(frontmatter.hero_image)}
            alt={frontmatter.hero_image_alt}
        />
        <div className={styles.overlay}>
          <a href={frontmatter.hero_image_credit_link} target="_blank" rel="noreferrer">
            {frontmatter.hero_image_alt} by: {frontmatter.hero_image_credit_text}
          </a>
        </div>
      </div>

      <div className = {styles.titleWrapper}>
        <AnimatedText text={frontmatter.title} />
      </div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay:1}}

        className={styles.date}> <BiCalendar /> 
        <p className={styles.dateText}>
          {frontmatter.date}
        </p>
      </motion.span>
      
      { 
        frontmatter.date_updated && 
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay:1}}
          className={styles.date}> <BiCalendarEdit />
          <p className={styles.dateText}>
            {frontmatter.date_updated}
          </p>
        </motion.span>
      }

      { 
        frontmatter.tags && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay:1}}
            className={styles.tags}>
            <FiTag />
            {
              frontmatter.tags.map(tag => 
              <Link
                to={`/${page}/tags/${kebabCase(tag)}`}
                key={tag}
              >
                {`${tag}`}
              </Link>
              )
            }
          </motion.span>

        )

      }

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay:1.5}}
        className={styles.MDXBody}>
        <MDXRenderer>
          {body}
        </MDXRenderer>
      </motion.div>
    </>

  )
}

export default BlogPost