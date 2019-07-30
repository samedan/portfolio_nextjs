import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import { withRouter } from 'next/router';
import axios from 'axios';
import BasePage from '../components/BasePage';

class Portfolio extends Component {
  static async getInitialProps({ query }) {
    const portfolioId = query.id;
    let portfolio = {};

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${portfolioId}`
      );
      portfolio = response.data;
      console.log(portfolio);
    } catch (err) {
      console.error(err);
    }

    return { portfolio };
  }

  render() {
    const { portfolio } = this.props;
    console.log(portfolio);
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>{portfolio.title}</h1>
          <p>BODY: {portfolio.body}</p>
          <p>ID: {portfolio.id}</p>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(Portfolio);
