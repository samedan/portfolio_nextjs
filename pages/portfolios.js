import React, { Component, Fragment } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import axios from 'axios';
import { Link } from '../routes';

class Portfolios extends Component {
  static async getInitialProps() {
    let posts = {};
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      posts = response.data;
    } catch (err) {
      console.error(err);
    }

    return { posts: posts.splice(0, 10) };
  }

  renderPosts(somePosts) {
    return somePosts.map((post, index) => {
      return (
        <li key={post.id}>
          <Link route={`/portfolio/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      );
    });
  }

  render() {
    console.log(this.props);
    const { posts } = this.props;
    return (
      <BaseLayout>
        <h1>Portfolios</h1>
        <ul>{this.renderPosts(posts)}</ul>
      </BaseLayout>
    );
  }
}

export default Portfolios;
