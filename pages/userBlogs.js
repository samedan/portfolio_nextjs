import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Link } from '../routes';

import withAuth from '../components/hoc/withAuth';
import { getUserBlogs } from '../actions';

class UserBlogs extends Component {
  static async getInitialProps({ req }) {
    let blogs = [];
    try {
      blogs = await getUserBlogs(req);
    } catch (err) {
      console.error(err);
    }
    return { blogs };
  }

  separateBlogs(blogs) {
    const published = [];
    const drafts = [];

    blogs.forEach(blog => {
      blog.status === 'draft' ? drafts.push(blog) : published.push(blog);
    });
    return { published, drafts };
  }

  renderBlogs(blogs) {
    return (
      <ul className="user-blogs-list">
        {blogs.map((blog, index) => (
          <li key={index}>
            <Link route={`/blogs/${blog._id}/edit`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { blogs } = this.props;
    const { published, drafts } = this.separateBlogs(blogs);

    console.log(blogs);
    return (
      <BaseLayout headerType={'landing'} className="" {...this.props.auth}>
        <div
          className="masthead"
          style={{ backgroundImage: "url('/static/images/home-bg.jpg')" }}
        >
          <div className="overlay"></div>
          <Container>
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Fresh Blogs</h1>
                  <span className="subheading">Programming, travelling...</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <BasePage className="blog-user-page">
          <Row>
            <Col md="6" className="mx-auto text-center">
              <h2 className="blog-title">Published Blogs</h2>
              {this.renderBlogs(published)}
            </Col>
            <Col md="6" className="mx-auto text-center">
              <h2 className="blog-title">Drafts Blogs</h2>
              {this.renderBlogs(drafts)}
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth('siteOwner')(UserBlogs);
