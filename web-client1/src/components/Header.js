
import React, {useState,useEffect } from "react";
import {
  Link
} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';



export default function Header (){

  const [userid, setuserid] = useState('');
     
      

      useEffect(() => {
        let userId = localStorage.getItem('userId')
        setuserid(userId)

      }, []);
     

      return (
          <div id="header" className="sticky">
            <Container>
            <Row>
            <Col xs={4}>
                {/* <h1 id="logo"> Foster </h1> */}
                <img className="logo" src="/header_logo.png" alt="Foster" />
            </Col>
            <Col xs={8}>
              <ul id="menu" className="float-md-right">
                <li> <Link to="/">Home</Link> </li>
                <li> <Link to="/tutors">Find A Tutor</Link> </li>
                {!userid && <li> <Link to="/register">Join Us</Link> </li> }
                {userid && <li> <Link to="/dashboard/about">Dashboard</Link> </li> }
                {/* <li> <Link to="/register">Register</Link> </li> */}
              </ul>
            </Col>
            </Row>
        </Container>
      </div>
      )

}