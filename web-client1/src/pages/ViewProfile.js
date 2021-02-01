
import React, {  } from "react";
import {
    Link
  } from "react-router-dom";
import { Container, Row, Col, Badge,
     Button, Spinner,Card
     } from 'react-bootstrap';


export default function ViewProfile (){
    return (
        <div style={{marginTop:'50px', marginBottom:'50px'}} className="section">

            <Container>
                <Row>
                    <Col md={{span: 8}}>
                    <div style={{display:'flex'}}>
                        <img src="images/" alt="user profile image"></img>
                        <span className="user-profile-title">
                            <h2>Muhammad Bilal</h2>
                            <p><strong>Experienced Tutor for Math, Statistics, and Computer Science</strong></p>
                            <p>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                              <strong> 5 </strong>
                              (4)
                              </p>
                        </span>
                    </div>

                    <div className="bio">
                        <h4>About Bilal</h4>
                        <hr></hr>
                                              
                        <span style={{display:'flex'}}>
                            <Col md={2}>
                            <p>Bio</p>
                            </Col>
                            <Col md={10}>
                            <p  >I was a graduate student in mathematics at Caltech and a postdoc at Columbia University. I left academia to work in industry, but I enjoy teaching. I have written dozens of articles and a book on applying mathematics for general audiences. I'm working on a parent's guide to algebra and book on applying economics to improve environmentalism. I've tutored mathematics, statistics, economics, computer science, and programming since 2013 on other sites.</p>
                            </Col>

                        </span>
                                                

                    </div>

                    <div className="education">
                        <hr></hr>
                        <span style={{display:'flex'}}>
                            <Col md={2}>
                            <p>Education</p>
                            </Col>
                            <Col md={10}>
                            <p >
                                I was a graduate student in mathematics at Caltech and a postdoc at Columbia University. I left academia to work in industry, but I enjoy teaching. I have written dozens of articles and a book on applying mathematics for general audiences. I'm working on a parent's guide to algebra and book on applying economics to improve environmentalism. I've tutored mathematics, statistics, economics, computer science, and programming since 2013 on other sites.
                                </p>
                            </Col>
                        </span>

                    </div>
                    
                    <div className="policies">
                        <hr></hr>
                        <span style={{display:'flex'}}>
                            <Col md={2}>
                                <p>Policies</p>
                            </Col>
                            <Col md={10}>
                            <p>Teaching Rate: Rs500/Month</p>
                            </Col>
                        </span>
                       
                    </div>

                    <div className="schedule">
                        <hr></hr>
                        <span style={{display:'flex'}}>
                            <Col md={2}>
                            <p>Schedule</p>
                            </Col>
                            <Col md={10}>
                            <p>Teaches Online</p>
                                <p>Teaches In person</p>
                            </Col>
                        </span>
                       
                    </div>

                    <div className="subjects">
                        <hr></hr>
                        <span style={{display:'flex'}}>
                            <Col md={2}>
                            <p>Subjects</p>
                            </Col>
                            <Col md={10}>
                            <Badge  style={{marginRight:'5px'}} variant="success">Math</Badge>
                            <Badge  style={{marginRight:'5px'}} variant="success">Physics</Badge>
                            <Badge  style={{marginRight:'5px'}} variant="success">BIo</Badge>
                            </Col>
                        </span>

                    </div>

                    <div className="grades">
                        <hr></hr>
                        <span style={{display:'flex'}}>
                            <Col md={2}>
                            <p>Teaching Grades</p>
                            </Col>
                            <Col md={10}>
                            <Badge  style={{marginRight:'5px'}} variant="success">Math</Badge>
                            <Badge  style={{marginRight:'5px'}} variant="success">Physics</Badge>
                            <Badge  style={{marginRight:'5px'}} variant="success">BIo</Badge>
                            </Col>
                        </span>

                    </div>

                    <div className="ratings">
                        <h4>Ratting & Reviews</h4>
                        <hr></hr>
                        <span style={{display:'flex'}}>
                            <Col md={2}>
                            <p>ratings</p>
                            </Col>
                            <Col md={10}>
                            <p>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                              <strong> 5 </strong>
                              (4 ratings)
                              </p>
                              <p><strong>5 stars</strong> ================================ (100)</p>
                              <p><strong>4 stars</strong> ================================ (80)</p>
                              <p><strong>3 stars</strong> ================================ (80)</p>
                              <p><strong>2 stars</strong> ================================ (80)</p>
                              <p><strong>1 stars</strong> ================================ (80)</p>
                            </Col>
                        </span>

                    </div>


                    <div className="reviews">
                        <hr></hr>
                        <span style={{display:'flex'}}>
                            <p>Reviews</p>
                            <span style={{marginLeft:'100px'}}>
                            <p><strong>Greate Experience</strong></p>
                            <p>
                            Douglas is an amazing teacher and I recommend asking for his help!!!! I told him I needed him on Monday morning and I had an appointment scheduled for Tuesday afternoon! I thought the assignment I needed help on was going to take multiple sessions but Douglas helped me.
                            </p>
                            <p> <em>bilal</em></p>
                            </span>
                        </span>

                    </div>

                    </Col>
                        <Col md={{span: 4}}>
                        <Card style={{ width: '18rem', marginTop:'70px' }} className="sticky">
                        <Card.Header>Fees Rs 100/hour</Card.Header>
                            <Card.Body>
                            
                                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                                
                                <Card.Text>No subscriptions or upfront payments</Card.Text>
                                <Card.Text>Only pay for the time you need </Card.Text>
                                <Card.Text>Find the right fit, or your first hour is free</Card.Text>
                                
                                <Link
                                to="/request"
                                className="btn-dark"
                                >
                                    Connect Bilal
                                </Link> 
                                {/* <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link> */}
                            </Card.Body>
                            <Card.Footer className="text-muted">Response Time: 24 hours</Card.Footer>
                        </Card>
                            
                        </Col>
                </Row>
            </Container>
           
        </div>
    )
}