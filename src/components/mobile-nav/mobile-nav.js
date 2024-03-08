import * as React from 'react'
import { Link } from 'gatsby'
import { useLocation } from "@reach/router";
import * as styles from './mobile-nav.module.scss';

const MobileNav = () => {

    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    const parentPaths = [{ name: 'home', path: '/' }];
  
    pathSegments.forEach((segment, index) => {
        const pathToSegment = `/${pathSegments.slice(0, index + 1).join('/')}`;
        parentPaths.push({ name: segment, path: pathToSegment });
    });
    
    if (location.pathname !== '/')
    return (
        <div className={styles.mobileNavContainer}>
        {parentPaths.map((parent, index) => (
            <span key={index}>
                {index > 0 && ' > '}
                <Link to={parent.path}> {parent.name}</Link>
            </span>
        ))}
        </div>
    )
    else return null;
}

export default MobileNav