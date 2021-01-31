import React from "react";

import { Container, Row, Col, Button } from 'react-bootstrap';


export default class HaveQuestion extends React.Component {
 
    render(){
      return (
          <div id="haveQuestion" class="section" >
              <Container>
                  <Row>
                      <Col md={12}>
                          <h2 class="">
                          Have any questions?
                          </h2>
                          
                      </Col>

                  </Row>
                  <Row>
                      <Col md={12} >
                          <div className="helCenter" style={{display:'flex'}}>
                            <i className="fa fa-question"></i>
                            <p >Get answers in our Help Center or connect with Customer Support.</p>
                            <Button onClick={()=> window.location.href = '/contact-us' } variant="btn" size="lg">Ask</Button>{' '}
                          </div>
                     
                      </Col>

                     
                  </Row>

              </Container>
          </div>
      )
    }
}