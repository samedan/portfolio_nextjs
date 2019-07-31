import React, { Component } from 'react';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm';
import { Row, Col } from 'reactstrap';

class PortfolioNew extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage
          className="portfolio-create-page"
          title="Create new portfolio"
        >
          <Row>
            <Col md="6">
              <PortfolioCreateForm />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth('siteOwner')(PortfolioNew);
