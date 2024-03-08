import React from 'react'
import { Disqus } from 'gatsby-plugin-disqus';
import * as styles from './disqus.module.scss';

const MyDisqus = ({ pageContext, frontmatter }) => {

    const disqusConfig = {
        url: `https://daiyixuan.com/blog/${pageContext.slug}`,
        identifier: pageContext.slug,
        title: frontmatter.title,
    }

    return (
        <div className={styles.commentContainer}>
            <Disqus config={disqusConfig} />
        </div>

    )
    
}

export default MyDisqus