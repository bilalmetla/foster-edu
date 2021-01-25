
import React from "react";
import {
  Link
} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
export default class Header extends React.Component {
 
    render(){
      return (
          <div id="header" className="sticky">
            <Container>
            <Row>
            <Col xs={4}>
                <h1 id="logo"> Foster </h1>
            </Col>
            <Col xs={8}>
              <ul id="menu" className="float-md-right">
                <li> <Link to="/">Home</Link> </li>
                <li> <Link to="/tutors">Find A Tutor</Link> </li>
                <li> <Link to="/register">Join Us</Link> </li>
                {/* <li> <Link to="/register">Register</Link> </li> */}
              </ul>
            </Col>
            </Row>
        </Container>
      </div>
      )
    }
}