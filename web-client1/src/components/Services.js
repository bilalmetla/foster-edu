
import React from "react";

import { Container, Row, Col } from 'react-bootstrap';


export default class Services extends React.Component {
 
    render(){
      return (
          <div id="service-box" className="section">
              <Container>
                  <Row>
                      <Col md={12}>
                          <h2 className="section-heading">Take online lessons & Improve your results.</h2>
                      </Col>
                  </Row>

                  <Row>
                      <Col md={4}>
                      <i className="fa fa-anchor"></i>
                          <h3>Online Lessions</h3>
                          <p>Meet with the expert of your choice, anywhere in the country, online or in-person </p>
                      </Col>

                      <Col md={4}>
                          <i className="fa fa-dashboard"></i>
                          <h3>Right Fits</h3>
                          <p>Find an expert who suits your needs and learning style.</p>
                      </Col>

                      <Col md={4}>
                          <i className="fa fa-book"></i>
                          <h3>Experts</h3>
                          <p>More qualified instructors than anywhere else, ready to help.</p>
                      </Col>
                  </Row>
              </Container>
        </div>
      )
    }
}