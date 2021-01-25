
import React from "react";
import {
  Link
} from "react-router-dom";
import { Container, Row, Col, Accordion, Card } from 'react-bootstrap';


export default class DSMenu extends React.Component {
 
    render(){
      return (
          <div id="dashboar-menu">
               <Container>
                <Row>
                    <Col md={12}>
              <div id="dashboar-menu-heading">
              <img src="images/tutor4-740x792.jpg" alt="user profile image" />
              <h4>Muhammad Bilal </h4>
              {/* <p>
                  <i className="fa fa-user">
                  </i>
                  View Profile
              </p> */}
              </div>
              <h5>Dashboard </h5>
              
            <Accordion defaultActiveKey="0" id="menue-accordion">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" >
                Profile
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" className="accordions-links">
                <Card.Body>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                        <Link class="nav-link active" to="/dashboard/about">About</Link>
                    </p>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                        <Link class="nav-link active" to="/dashboard/contact">Contact Info</Link>
                    </p>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                        <Link class="nav-link active" to="/">Expertise</Link>
                    </p>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                        <Link class="nav-link active" to="/">Education</Link>
                    </p>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                        <Link class="nav-link active" to="/">Location</Link>
                    </p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            

            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1" >
                Account
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1" className="accordions-links">
                <Card.Body>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                    <Link class="nav-link" to="/">Messages</Link>
                    </p>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                    <Link class="nav-link" to="/">Online Classes</Link>
                    </p>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                        <Link class="nav-link" to="#">Get Verified</Link>
                    </p>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                        <Link class="nav-link" to="/">Student Reviews</Link>
                    </p>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                        <Link class="nav-link active" to="/">Location</Link>
                    </p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>

            </Accordion>
            
            <ul class="nav flex-column">
              
                <li class="nav-item">
                    <a class="nav-link " href="#">Log Out</a>
                </li>
                </ul>
           
                </Col>
                </Row>
            </Container>
            </div>
      )
    }
}