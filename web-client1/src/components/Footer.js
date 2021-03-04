import React, {useState,useEffect } from "react";
import {
    Link
  } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';


export default function Footer () {
    const [enableLinks, setenableLinks] = useState(true);


    useEffect(() => {
        
        let pathname = window.location.pathname
        if(pathname.includes('calling-route') || pathname.includes('calling')){ 
          setenableLinks(false)
        }

      }, []);

      return (
          <>
        {enableLinks ?
          <div id="footer">
              
              <Container>
                  <Row>
                      <Col md={4}>
                          <div id="logo">
                              {/* <h2>Foster</h2> */}
                              <img className="logo" src="/footer_logo.png" alt="Foster" />

                              <p>
                              Foster connects people who need to know with the experts who can teach them.

                              </p>
                          </div>
                      </Col>
                      
                      <Col md={4}>
                      <h4>Quick Links</h4>
                          <div style={{display: 'flex'}}>
                                <div style={{marginRight:'10px'}}>
                                <p >
                                 <a href="/">About Us </a>
                                 </p>
                                 <p>
                                <Link to="/contact-us">Contact Us </Link>
                                </p>
                                <p>
                                <Link to="/faqs">Faqs </Link>
                                </p>
                                
                             </div>

                             <div style={{marginLeft:'10px'}}>
                                <p >
                                 <Link to="/register">Become a Tutor </Link>
                                 </p>
                                 <p>
                                <Link to="/tutors">Hire a Tutor </Link>
                                </p>
                                <p>
                                <Link to="/calling" target="_blank">Video Lecture </Link>
                                </p>
                             </div>


                          </div>
                      </Col>
                      <Col md={4}>
                      <h4>Our Contacts</h4>
                        <div id="footer-contact">
                            <p>
                                <i className="fa fa-user"></i>
                                Evacuee Trust Complex.
                            </p>

                            <p>
                                <i className="fa fa-envelope"></i>
                                info@thefoster.life
                            </p>
                            <p>
                                <i className="fa fa-phone"></i>
                                +92-301-5339780
                            </p>

                        </div>
                        <div id="social-links" >
                           
                                <a target="_blank" href="https://www.facebook.com/The-Foster-112666314196501/?view_public_for=112666314196501">
                                <i className="fa fa-facebook">
                                </i>
                                </a>
                                
                                <a target="_blank" href="https://twitter.com/Foster38235316">
                                <i className="fa fa-twitter"></i>
                                </a>
                        </div>
                      </Col>
                  </Row>
              </Container>
             
          </div>
          :
          null
          
        }
        </>
      )
    
}