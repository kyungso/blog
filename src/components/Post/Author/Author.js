// @flow
import React from 'react';
import { graphql, StaticQuery, withPrefix } from 'gatsby';

import styles from './Author.module.scss';

export const PureAuthor = ({ data }: Object) => {
  const { author } = data.site.siteMetadata;

  return (
    <div className={styles['author']}>
      <p className={styles['author__bio']}>
        <span className={styles['author__photo']}>
          <img  
            src={withPrefix(author.photo)}
            alt={author.name}
          />
        </span>
        <span>
          <strong>{author.name}</strong>
          <br/>
          <span>{author.bio}</span>
        </span>
      </p>
    </div>
  );
};

export const Author = () => (
  <StaticQuery
    query={graphql`
      query AuthorQuery {
        site {
          siteMetadata {
            author {
              name
              bio
              photo
            }
          }
        }
      }
    `}
    render={(data) => <PureAuthor data={data} />}
  />
);

export default Author;
