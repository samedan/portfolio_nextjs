import React, { Component, Fragment } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import PortfolioCard from '../components/portfolios/PortfolioCard';

import BasePage from '../components/BasePage';
import { Col, Row, Button } from 'reactstrap';
import { getPortfolios, deletePortfolio } from '../actions';
import { Router } from '../routes';

class Portfolios extends Component {
  static async getInitialProps() {
    let portfolios = [];
    try {
      portfolios = await getPortfolios();
    } catch (err) {
      console.error(err);
    }
    return { portfolios };
  }

  navigateToEdit(portfolioId, e) {
    e.stopPropagation();
    Router.pushRoute(`/portfolios/${portfolioId}/edit`);
  }

  displayDeleteWarning(portfolioId, e) {
    e.stopPropagation();
    const isConfirm = confirm('Are you sure ?');
    if (isConfirm) {
      // delete portfolio
      this.deletePortfolio(portfolioId);
    }
  }

  deletePortfolio(portfolioId, e) {
    deletePortfolio(portfolioId)
      .then(() => {
        Router.pushRoute('/portfolios');
      })
      .catch(err => console.error(err));
  }

  renderPortfolios(portfolios) {
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return portfolios.map((portfolio, index) => {
      return (
        <Col md="4" key={index}>
          <PortfolioCard portfolio={portfolio}>
            {isAuthenticated && isSiteOwner && (
              <React.Fragment>
                <Button
                  onClick={e => {
                    this.navigateToEdit(portfolio._id, e);
                  }}
                  color="warning"
                >
                  Edit
                </Button>{' '}
                <Button
                  onClick={e => this.displayDeleteWarning(portfolio._id, e)}
                  color="danger"
                >
                  Delete
                </Button>
              </React.Fragment>
            )}
          </PortfolioCard>
        </Col>
      );
    });
  }

  render() {
    const { portfolios } = this.props;
    const { isAuthenticated, isSiteOwner } = this.props.auth;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-page" title="Portfolios">
          {isAuthenticated && isSiteOwner && (
            <Button
              onClick={() => Router.pushRoute('/portfolioNew')}
              color="success"
              className="create-port-btn"
            >
              Create Portfolio
            </Button>
          )}

          <Row>{this.renderPortfolios(portfolios)}</Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolios;
