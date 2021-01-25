
import React from "react";

import { Container, Row, Col, 
    Form, InputGroup, FormControl,
    Button, Badge
  } from 'react-bootstrap';


export default class TutorListInfo extends React.Component {
 
    render(){
      return (
          <div id="tutors-list-info">
              <Container>
                  <Row>
                      <Col md={12}  >
                          <div>
                              <a href="" style={{display:'flex',}}>
                          <div id="tutors-details-list" style={{display:'flex'}}>
                              <img src="images/tutor2-280x300.jpg" alt="tutor image" />
                              <div>
                              <h4>Muhammad BIlal</h4>
                              <h6>Math expertiese</h6>
                              <p>
                              <Badge variant="success">Math 1</Badge>{' '}
                              <Badge variant="success">Math 2</Badge>{' '}
                              <Badge variant="success">Math 3</Badge>{' '}
                              </p>
                              <p>
                              ASSALAM o ALAIKUM ! I am well qualified and verified tutor . I love teaching coz i really enjoy it .
                              </p>
                              </div>
                          </div>

                          <div id="tutor-scoring-board" className="float-md-right">
                              <p><strong>Rs400/hour</strong></p>
                              <p>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                                  <i className="fa fa-star"> </i>
                              <strong> 5 </strong>
                              (4)
                              </p>
                              <p>
                                  Offers 
                                  <strong> Online Classes</strong> &
                                  <strong> In Person Classes</strong>
                              </p>
                           </div>

                           </a>
                           </div>
                            
                      </Col>
                  </Row>
              </Container>
             
           </div>
      )
    }
}