import React from "react";

import { Container, Row, Col, Form } from 'react-bootstrap';
import SearchTutors from "./SearchTutors";
import TutorsFilterControls from "./TutorsFilterControls";

export default class TutorsFilter extends React.Component {
 
    render(){
      return (
          <div>
              <Container>
                    <Row>
                    <Col md={3} >
                       <TutorsFilterControls />
                      </Col>

                    <Col md={9} >
                        
                       <SearchTutors />

                    </Col>

                    </Row>

                </Container>
              
          </div>
      )
    }
}