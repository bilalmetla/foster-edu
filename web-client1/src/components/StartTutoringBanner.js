import React from "react";

import { Container, Row, Col, Button } from 'react-bootstrap';


export default class StartTutoringBanner extends React.Component {
 
    render(){
      return (
          <div id="startTutoringBanner" class="section" >
              <Container>
                  <Row>
                      <Col md={12}>
                          <h2 class="section-heading">
                          Start tutoring with <strong>Foster</strong>
                          </h2>
                          <p>We’re always looking for talented tutors. Set your own rate, get paid and make a difference.</p>
                          <Button variant="btn" size="lg">Apply Now</Button>{' '}

                      </Col>
                  </Row>
              </Container>
          </div>
      )
    }
}