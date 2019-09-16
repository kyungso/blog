import React from 'react';
import Helmet from 'react-helmet';
import styles from './Layout.module.scss';

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Helmet defaultTitle="Kingso's blog">
      <html lang="en" />
      <meta name="google-site-verification" content="mbgLz8ZMqCut4Jt1gFK1_ie6CSHvAN39Mijkn1EpPGc" />
    </Helmet>
    {children}
  </div>
);

export default Layout;
