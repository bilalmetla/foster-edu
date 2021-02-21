
import React, { useState, useEffect, useRef } from "react";
import {
    Link
  } from "react-router-dom";
import { Container, Row, Col, Badge,
     Button, Spinner,Card
     } from 'react-bootstrap';



import { getCustomerById } from "../services";
import { constants } from "../constants";
import { RatingStars } from "../components";

export default function ViewProfile (props){

    const [feedbackMessage, setfeedbackMessage] = useState('');
    const [feedbackstars, setfeedbackstars] = useState(5);
    const [sharefeedback, setsharefeedback] = useState(false);
    const [feedbackreason, setfeedbackreason] = useState('');

    
    let userId = localStorage.getItem('userId')

    if(!props.match || !props.match.params){
        window.location.href = "/"
    }
   // console.log('props.match.params:', props.match.params)
   const [tutor, settutor] = useState({});

   useEffect(() => {
    getCustomerById(props.match.params.id)
    .then(result=>{
        console.log(result)
        settutor(result)
        settutor(prevState =>{
            return {
                ...prevState,
                teachingSubjects: result.teachingSubjects || [],
                teachingGrades: result.teachingGrades || [],
                education: result.education || []
            }
        })

        console.log('tutor.teachingSubjects ', tutor.teachingSubjects)
   

    }).catch(error=>{
        console.log(error)
    })
      
   }, []);

const submitRating = ()=>{
    console.log('submitRating clicked feedbackMessage', feedbackMessage)
    console.log('submitRating clicked feedbackstars', feedbackstars)
}


    return (
        <div style={{marginTop:'50px', marginBottom:'50px'}} className="section">

            <Container>
                <Row>
                    <Col md={{span: 8}}>
                    <div style={{display:'flex'}}>
                    <img className="profile-img" src={constants.api_server() + tutor.imageUrl || "/images/tutor2-280x300.jpg"}alt="user profile image"></img>
                        <span style={{marginLeft:'20px'}} className="user-profile-title">
                            <h2>{tutor.firstName} {tutor.lastName}</h2>
                            <p><strong>
                                {tutor.tagLine}
                                </strong></p>
                            {/* <p>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                              <strong> 5 </strong>
                              (4)
                              </p> */}
                              <RatingStars.profileListingStars stars={4}> </RatingStars.profileListingStars>
                        </span>
                    </div>

                    <div className="bio">
                        <h4>About {tutor.lastName}</h4>
                        <hr></hr>
                                              
                        <span style={{display:'flex'}}>
                            <Col md={2}>
                            <p>Bio</p>
                            </Col>
                            <Col md={10}>
                            <p>
                                {tutor.greateTutorLine}
                                </p>
                                <p>
                                {tutor.teachingExperienceLine}
                                </p>
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
                               
                            { tutor.education &&
                            tutor.education.map((edu, index)=>  <span key={index}>
                                <p>{edu.institute}</p>
                                <p>{edu.degree}</p>
                                <p>Passing year <strong>{edu.passingYear}</strong></p>
                                </span>)
                            }
                            {/* <p >
                                {tutor.education.institute}
                            </p>
                            <p >
                                {tutor.education.institute}
                            </p> */}
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
                            <p>Teaching Rate: <strong>Rs{tutor.fees}</strong>/{tutor.feesPer}</p>
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
                            {tutor.isOnlineTeaching && <p>Teaches Online</p> }
                            {tutor.isOfflineTeaching && <p>Teaches In person</p> }
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
                                
                            {/* {teachingSubjects} */}
                            { tutor.teachingSubjects &&
                            tutor.teachingSubjects.map(subject=> <Badge key={subject} style={{marginRight:'5px'}} variant="success">{subject}</Badge>  ) }
                            
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
                                <p>
                                { tutor.teachingGrades &&
                                tutor.teachingGrades.map(grade=> <Badge key={grade} style={{marginRight:'5px'}} variant="success">{grade}</Badge>  )}
                                </p>
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
                            {/* <p>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                              <strong> 5 </strong>
                              (4 ratings)
                              </p> */}
                              <p style={{display:'flex'}}>
                              <RatingStars.profileView stars={4} > 
                              </RatingStars.profileView >
                              <strong> {" 4 (10 ratings)" } </strong>
                              
                              </p>
                             {!sharefeedback && <a className="feedback-link" href="javascript:void(0)" onClick={()=>setsharefeedback(true)}>Share Your Feedback </a>}
                              
                             {sharefeedback && <a className="feedback-link" href="javascript:void(0)" onClick={()=>setsharefeedback(false)}>Hide Feedback </a> }
                              {/* <p><strong>5 stars</strong> ================================ (100)</p>
                              <p><strong>4 stars</strong> ================================ (80)</p>
                              <p><strong>3 stars</strong> ================================ (80)</p>
                              <p><strong>2 stars</strong> ================================ (80)</p>
                              <p><strong>1 stars</strong> ================================ (80)</p> */}
                            </Col>
                        </span>

                    </div>

                    {sharefeedback && 
                    
                    <div className="ratings">
                        <h4>Share Your Feedback </h4>
                        <hr></hr>
                        <span style={{display:'flex'}}>
                            <Col md={2}>
                            {/* <p>Feed Back</p> */}
                            </Col>
                            <Col md={10}>
                            <RatingStars>
                              <RatingStars.rating
                                onChange={value=>{setfeedbackstars(value) }}
                               >
                             </RatingStars.rating >
                             
                             {feedbackstars <= 3 ? 
                             <RatingStars.feedbackReasons
                                className="feedback-select"
                                label="Choose Your Reason"
                                onChange={(event)=>setfeedbackreason(event.target.value)}

                             >
                                 
                                 </RatingStars.feedbackReasons>
                                 : null
                             }
                              
                              
                              <RatingStars.messageBox 
                              placeholder="Enter Your Feedback"
                              value={feedbackMessage}
                              rows={4}
                              cols={50}
                              onChange={event => {setfeedbackMessage(event.target.value)}}
                              > 
                              </RatingStars.messageBox >

                              <RatingStars.ratingSubmit
                              className="btn-dark" 
                              style={{margin:'0px auto'}}
                              onClick={submitRating}

                              >{"Feedback"}
                                  </RatingStars.ratingSubmit>

                              </RatingStars>
                              
                            </Col>
                        </span>

                    </div>
                    
                    }


                    <div className="reviews">
                        <hr></hr>
                        <span style={{display:'flex'}}>
                            <p>Reviews</p>
                            {/* <span style={{marginLeft:'100px'}}>
                            <p><strong>Greate Experience</strong></p>
                            <p>
                            Douglas is an amazing teacher and I recommend asking for his help!!!! I told him I needed him on Monday morning and I had an appointment scheduled for Tuesday afternoon! I thought the assignment I needed help on was going to take multiple sessions but Douglas helped me.
                            </p>
                            <p> <em>bilal</em></p>
                            </span> */}
                        </span>

                    </div>

                    </Col>
                        <Col md={{span: 4}}>
                        <Card style={{ width: '18rem', marginTop:'70px' }} className="sticky">
                        <Card.Header style={{background:'#e74c3c', color:'#fff'}}>Fees Rs{tutor.fees}/{tutor.feesPer}</Card.Header>
                            <Card.Body>
                            
                                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                                
                                <Card.Text>No subscriptions or upfront payments</Card.Text>
                                <Card.Text>Only pay for the time you need </Card.Text>
                                <Card.Text>Find the right fit, or your first hour is free</Card.Text>
                                
                                <Link
                                to={`/request/to/${props.match.params.id}`}
                                className="btn-dark"
                                style={{marginLeft:'10%',}}
                                >
                                    Connect to {tutor.lastName}
                                </Link> 
                                {/* <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link> */}
                            </Card.Body>
                            <Card.Footer  className="text-muted">Response Time: 24 hours</Card.Footer>
                        </Card>
                            
                        </Col>
                </Row>
            </Container>
           
        </div>
    )
}