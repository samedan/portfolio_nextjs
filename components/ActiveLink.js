import React, { Children } from 'react';
import { Link } from '../routes';
import { withRouter } from 'next/router';

const ActiveLink = ({ children, router, ...props }) => {
  // 'Children.only' only returns one child, never more
  const child = Children.only(children);
  let className = child.props.className || '';

  // 'router.path' reads the url, 'props.router' is sent from Header.js
  if (router.asPath === props.route && props.activeClassName) {
    className = `${className} ${props.activeClassName}`;
  }

  delete props.activeClassName;

  // it will return the 'child' : the '<a href...>' and provide additional props
  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(ActiveLink);
