import React from 'react';
import Header from '../shared/Header';
import Head from 'next/head';

const BaseLayout = props => {
  const {
    className,
    children,
    isAuthenticated,
    user,
    isSiteOwner,
    title
  } = props;
  const headerType = props.headerType || 'default';
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap"
          rel="stylesheet"
        />
        <script src="https://kit.fontawesome.com/f4769bebe7.js"></script>

        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=1, user-scalable=no"
        ></meta>
      </Head>
      <div className="layout-container">
        <Header
          className={`port-nav-${headerType}`}
          isAuthenticated={isAuthenticated}
          user={user}
          isSiteOwner={isSiteOwner}
        />
        <main className={`cover ${className}`}>
          <div className="wrapper">{children}</div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default BaseLayout;
