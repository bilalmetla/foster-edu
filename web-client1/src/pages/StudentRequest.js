
import React, {useState} from "react";
import {
  Link,
  useHistory
} from "react-router-dom";
import { Container, Row, Col, Button,
    FormControl, Form, InputGroup } from 'react-bootstrap';
    
import Spinner from '../components/common/Spinner';
import {useForm} from 'react-hook-form';
import { NotificationManager } from 'react-notifications';

import { getCustomerById } from "../services";


export default function StudentRequest (props){
    const { register, handleSubmit, errors, watch } = useForm(); // initialize the hook

    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalHeading, setModalHeading] = useState('Error!');
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccessModal, setisSuccessModal] = useState(false);


    return (
            <div style={{ marginBottom:'50px'}} className="section">
    
                <Container>
                    <Row>
                    <Col md={7}  id="register-signup">
                    {/* <div> */}
                        <h2>
                            Send, Your Request
                        </h2>
                        <p>
                           Your instructor will contact you soon.
                        </p>
                        {/* <Row> */}
                            {/* <Col md={{span:10, offset:2}}> */}
                        <Form  onSubmit={handleSubmit()}>
                        
                        
                        <Form.Label htmlFor="subject" >
                            Subject
                          </Form.Label>
                          <InputGroup>
                              
                              <FormControl size="lg"
                               name="subject" 
                               placeholder="subject" 
                               ref={register({required: 'subject is required'}) } 
                               
                               />
                              
                          </InputGroup>
                          {errors.subject && <p>{errors.subject.message}</p> }

                          <Form.Row>
                              <Col>
                              <Form.Label htmlFor="lessonType" >
                            Lesson Type
                          </Form.Label>
                          <InputGroup>
                              
                              <FormControl size="lg" 
                              as="select"
                               
                               name="lessonType" 
                               ref={register({
                                   required: 'Select a lesson Type',
                                   
                                }) }
                               
                                >
                                    <option value="" />
                                <option value="online">Online Lesson</option>
                                <option value="inperson">In Person Lesson</option>
                                </FormControl>
                          </InputGroup>
                          {errors.lessonType && <p>{errors.lessonType.message}</p> }


                              </Col>

                              <Col>
                              <Form.Label htmlFor="time" >
                            Availability Time
                          </Form.Label>
                          <InputGroup>
                              
                              <FormControl size="lg" 
                              as="select"
                               
                               name="time" 
                               ref={register({
                                   required: 'Select a time',
                                   
                                }) }
                               
                                >
                                    <option value="" />
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="12:00 AM">12:00 AM</option>
                                <option value="1:00 PM">1:00 PM</option>
                                </FormControl>
                          </InputGroup>
                          {errors.time && <p>{errors.time.message}</p> }

                              </Col>
                          </Form.Row>
                                                


                          <Form.Label htmlFor="message" >
                            Message 
                          </Form.Label>
                          <InputGroup>
                              {/* <InputGroup.Prepend>
                             
                              </InputGroup.Prepend> */}
                              <FormControl size="lg"
                               name="message"  
                               placeholder="message" 
                               ref={register({required: 'message is required'}) } 
                               as="textarea"
                               />
                              
                          </InputGroup>
                          {errors.message && <p>{errors.message.message}</p> }


                         
                          <div className="sign-up-link">
                           {/* <Link className="btn-dark" to="/dashboard" size="lg">Sign Up</Link>{' '} */}
                           <Button disabled={isLoading}
                            className="btn-dark"   
                            type="submit"
                            style={{marginLeft:'25%'}}
                             >
                              
                              Send Request
                          </Button>
                          </div>
                          
                        </Form>

                        </Col>
                    </Row>
                </Container>
            </div>
    )
}