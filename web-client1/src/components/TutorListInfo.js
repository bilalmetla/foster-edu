
import React from "react";
import {
    Link
  } from "react-router-dom";
import { Container, Row, Col, 
    Form, InputGroup, FormControl,
    Button, Badge
  } from 'react-bootstrap';


export default function TutorListInfo (props) {
    let teachingSubjects = []
    if(props.tutor.teachingSubjects && props.tutor.teachingSubjects.length>0){
        teachingSubjects = props.tutor.teachingSubjects.map(subject=> <Badge key={subject} style={{marginRight:'5px'}} variant="success">{subject}</Badge>  )
    }
    
  
      return (
          <div id="tutors-list-info">
              <Container>
                  <Row>
                      <Col md={12}  >
                          <div>
                              <Link to={`/profile/${props.tutor.id}`} style={{display:'flex',}}>
                                  <Col md={8}>
                              <div id="tutors-details-list" style={{display:'flex'}}>
                              <img src={props.tutor.imageUrl} alt="tutor image" />
                              <div>
                              <h4>{props.tutor.firstName} {props.tutor.lastName}</h4>
                              <h6>{props.tutor.tagLine}</h6>
                              <p>
                              {teachingSubjects}
                              </p>
                              <p>
                              {props.tutor.greateTutorLine !== "" ? 
                                    props.tutor.greateTutorLine  :
                             // props.tutor.greateTutorLine && 
                              'this teacher does not have a description of his profile.'
                              }
                              </p>
                              {/* <p>
                              {props.tutor.greateTutorLine}
                              </p> */}
                              </div>
                          </div>

                          </Col>
                          <Col md={3} style={{float:'right'}}  >
                          <div  id="tutor-scoring-board" className="float-md-right">
                              <p><strong>Rs {props.tutor.fees}/{props.tutor.feesPer}</strong></p>
                              <p>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                              <strong> 5 </strong>
                              (4)
                              </p>
                              <p className="Offers-margin">
                              Offers 
                              </p>
                            
                              {props.tutor.isOnlineTeaching &&
                              <p className="Offers-margin">
                                  <strong> Online </strong> Classes 
                                 
                              </p>}

                              {props.tutor.isOfflineTeaching &&
                              <p> <strong> In Person </strong> Classes
                              </p>}
                           </div>
                              </Col>
                           </Link>
                         </div>
                            
                     
                      </Col>
                  </Row>
              </Container>
             
           </div>
      )
    
}