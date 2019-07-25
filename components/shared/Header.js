import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import '../../styles/main.scss';

class Header extends Component {
  render() {
    const title = this.props.title;

    return (
      <Fragment>
        <p>{title}</p>
        {this.props.children}
        <p className="customClass">styled P element</p>
        <p className="customClassFromFile">styled P element scss</p>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/portfolios">
          <a>Portfolios</a>
        </Link>
        <Link href="/blogs">
          <a>Blogs</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/cv">
          <a>CV</a>
        </Link>
        <style jsx>
          {`
            a {
              font-size: 20px;
              padding: 5px;
            }
            .customClass {
              color: red;
            }
          `}
        </style>
      </Fragment>
    );
  }
}

export default Header;
