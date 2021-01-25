
import React from "react";

import { Container, Row, Col } from 'react-bootstrap';


export default class Testimonials extends React.Component {
 
    render(){
      return (
          <div id="testimonials" className="section">
              <Container>
                  <Row>
                      <Col md={12}>
                          <h2 className="section-heading">
                          See what students say about us
                          </h2>
                      </Col>
                  </Row>
                  <Row>
                      <Col md={6}>
                          <p><strong>Good Website</strong></p>
                          <p>I had no idea where to start finding a web tutor for a project I was working on. Thank goodness a Google search led me to Wyzant. They did all the work for me and I found someone excellent!</p>
                          <img src="images/tutor2-280x300.jpg" alt="customer image" />
                          <p className="author"><strong>Neha</strong> from <strong>Lahore </strong></p>
                          {/* <div className="author-city">from Karachi</div> */}
                      </Col>

                      <Col md={6}>
                          <p><strong>Happy to have found you</strong></p>
                          <p>I am a lawyer struggling with scientific concepts later in life. I find that using Wyzant to shore up my deficiencies has worked well.</p>
                          <img src="images/tutor4-740x792.jpg" alt="customer image" />
                          <p className="author"><strong>Ali</strong> from <strong>Lahore </strong></p>
                          {/* <div className="author-city"></div> */}
                      </Col>

                  </Row>
              </Container>
          </div>
      )
    }
}