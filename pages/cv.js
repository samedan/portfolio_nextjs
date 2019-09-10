import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Row, Col } from 'reactstrap';

class Cv extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage title="Preview my CV" className="cv-page">
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <div className="cv-title">
                <a
                  download="Avis_d_impot_2019_sur_les_revenus_et_prelev_sociaux_2018.pdf"
                  href="/static/Avis_d_impot_2019_sur_les_revenus_et_prelev_sociaux_2018.pdf"
                  className="btn btn-success"
                >
                  Download Avis d'inpots
                </a>
              </div>
              <iframe
                src="/static/Avis_d_impot_2019_sur_les_revenus_et_prelev_sociaux_2018.pdf"
                style={{ width: '100%', height: '800px' }}
              ></iframe>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Cv;
