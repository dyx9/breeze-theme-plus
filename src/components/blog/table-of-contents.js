import { Link } from 'gatsby';
import React, { useEffect, useState, useMemo } from 'react';
import * as styles from './table-of-contents.module.scss';

const TableOfContents = ({ items }) => {
  const idList = useMemo(() => getIds(items), [items]);
  const activeId = useActiveId(idList);

  function getIds(items) {
    return items.reduce((acc, item) => {
      if (item.url) {
        acc.push(item.url.slice(1));
      }
      if (item.items) {
        acc.push(...getIds(item.items));
      }
      return acc;
    }, []);
  }

  function useActiveId(itemIds) {
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: '0% 0% -80% 0%' }
      );

      itemIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });

      return () => {
        itemIds.forEach((id) => {
          const element = document.getElementById(id);
          if (element) observer.unobserve(element);
        });
      };
    }, [itemIds]); // Dependencies

    return activeId;
  }

  const renderItemsRecursively = (items, activeId) => {
    return (
      <ol>
        {items.map(i => (
          <li key={i.url}>
            <Link to={i.url} className={activeId === i.url.slice(1) ? styles.active : undefined}>
              {i.title}
            </Link>
            {i.items && renderItemsRecursively(i.items, activeId)}
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className={styles.tocContainer}>
      {renderItemsRecursively(items, activeId)}
    </div>
  );
};

export default TableOfContents;
