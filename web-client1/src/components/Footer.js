import React, {useState,useEffect } from "react";
import {
    Link
  } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import FooterData from "../fixtures/footer.json";

export default function Footer () {
    const [enableLinks, setenableLinks] = useState(true);
    const [socialLinks, setsocialLinks] = useState([]);

    useEffect(() => {
        
        let pathname = window.location.pathname
        if(pathname.includes('calling-route') || pathname.includes('calling')){ 
          setenableLinks(false)
        }
        setsocialLinks(FooterData.socialLinks)

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
                              <img className="logo" src={FooterData.logo} alt={FooterData.title} />

                              <p>{FooterData.description}</p>
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
                                {FooterData.contactus.addressline}
                            </p>

                            <p>
                                <i className="fa fa-envelope"></i>
                                {FooterData.contactus.email}
                            </p>
                            <p>
                                <i className="fa fa-phone"></i>
                                {FooterData.contactus.phone}
                            </p>

                        </div>
                        <div id="social-links" >
                           
                        {socialLinks.map(item=>{
                            return <a target="_blank" href={item.link}>
                                    <i className={item.icon}>
                                    </i>
                                    </a>
                        })}
                               
                              
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