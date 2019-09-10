import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
  Button
} from 'reactstrap';
import PortfolioCardDetail from './PortfolioCardDetail';

export default class PortfolioCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    const { portfolio, children } = this.props;
    const { isOpen } = this.state;

    return (
      <span onClick={this.handleToggle}>
        <PortfolioCardDetail
          isOpen={isOpen}
          toggle={this.handleToggle}
          portfolio={portfolio}
        />
        <Card className="portfolio-card">
          <CardHeader className="portfolio-card-header">
            {portfolio.position}
          </CardHeader>
          <CardBody>
            <p className="portfolio-card-city"> {portfolio.location} </p>
            <CardTitle className="portfolio-card-title">
              {portfolio.title}
            </CardTitle>
            <CardText className="portfolio-card-text">
              {portfolio.description}
            </CardText>
            <div className="readMore">{children}</div>
          </CardBody>
        </Card>
      </span>
    );
  }
}
