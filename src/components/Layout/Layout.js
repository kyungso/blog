import React from 'react';
import Helmet from 'react-helmet';
import styles from './Layout.module.scss';

const Layout = ({ children, title, description }) => (
  <div className={styles.layout}>
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="google-site-verification" content="mbgLz8ZMqCut4Jt1gFK1_ie6CSHvAN39Mijkn1EpPGc" />
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </div>
);

export default Layout;
