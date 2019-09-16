import React from 'react';
import Helmet from 'react-helmet';
import styles from './Layout.module.scss';

const Layout = ({ children, title, description }) => (
  <div className={styles.layout}>
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="google-site-verification" content="MCm_cYCezJM95Emnu_1rZXyl6mEmtu25683fp_py6Qk" />
    </Helmet>
    {children}
  </div>
);

export default Layout;
