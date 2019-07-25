import React, { Component, Fragment } from 'react';
import axios from 'axios';

import BaseLayout from '../components/layouts/BaseLayout';
import SuperComponent from '../components/SuperComponent';

class Index extends SuperComponent {
  // STATIC = functiuon called without initialization of the class
  static async getInitialProps() {
    let userData = {};
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1'
      );
      userData = response.data;
    } catch (err) {
      console.error(err);
    }

    return { initialData: [1, 2, 3, 4], userData };
  }

  constructor(props) {
    super(props);

    this.state = {
      title: 'Index page'
    };
  }

  updateTitle() {
    this.setState({
      title: 'UPDATET INDEX PAGE'
    });
  }

  render() {
    const { title } = this.state;
    const { userData, initialData } = this.props;
    console.log(userData);
    return (
      <BaseLayout>
        <h1>{title}</h1>
        <h2>userData: {userData.title}</h2>
        <button onClick={() => this.updateTitle()}>Change title</button>
      </BaseLayout>
    );
  }
}

export default Index;
