
import React, {useState, useEffect} from "react";
import {
  Link,
  useHistory
} from "react-router-dom";
import { Container, Row, Col, Button,
    FormControl, Form, InputGroup } from 'react-bootstrap';
    
import Spinner from '../components/common/Spinner';
import {useForm} from 'react-hook-form';
import { NotificationManager } from 'react-notifications';

import { getStudentRequestById, createClassRequest } from "../services";




export default function AcceptStudentRequest (props){
    const { register, handleSubmit, errors, setValue } = useForm(); // initialize the hook
    const [classrequest, setclassrequest] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalHeading, setModalHeading] = useState('Error!');
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccessModal, setisSuccessModal] = useState(false);


    const onSubbmit = (data)=>{
      

        data.instructorId = classrequest.to
        data.studentId = classrequest.from
        data.requestId = classrequest.id
        data.fees = parseInt(data.fees)

        setIsLoading(true)
        createClassRequest(data)
        .then(result => {
            setIsLoading(false)
            if(result.ok && result.ok === false){
                NotificationManager.error(result.statusText, 'Error!', 2000);
                return
            }
            NotificationManager.success(result.message, 'Successful!', 2000);

        })
        .catch(error => {
            setIsLoading(false)
            NotificationManager.error(error.toString(), 'Error!', 2000);

        })
    }


    useEffect(() => {
        setIsLoading(true)
        getStudentRequestById(props.match.params.requestId)
        .then(request => {
            setIsLoading(false)
            const fields = [
            'lessonType',
            'timeFrom',
            'timeTo',
           ];
           fields.forEach(field => setValue(field, request[field]));
           setclassrequest(request);

        }).catch(error=>{
            setIsLoading(false)
            console.log(error)
            NotificationManager.error(error.toString(), 'Error!', 2000);

        })
    }, []);

    return (
            <div style={{ marginBottom:'50px'}} className="section">
            {isLoading && <Spinner />}

                <Container>
                    <Row>
                    <Col md={{span:8, offset:2}}  id="register-signup">
                    {/* <div> */}
                        <h2>
                            Accepting Student Request
                        </h2>
                        <p>
                           You can teach online as well.
                        </p>
                        {/* <Row> */}
                            {/* <Col md={{span:10, offset:2}}> */}
                        <Form  onSubmit={handleSubmit(onSubbmit)}>
                        
                          <Form.Row>
                              <Col>
                              <Form.Label htmlFor="lessonType" >
                            Lesson Type
                          </Form.Label>
                          <InputGroup>
                              
                              <FormControl size="lg" 
                              as="select"
                               value={props.lessonType}
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
                              <Form.Label htmlFor="timeFrom" >
                            Start Time
                          </Form.Label>
                          <InputGroup>
                              
                              <FormControl size="lg" 
                              as="select"
                              value={props.timeFrom}
                               name="timeFrom" 
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
                          {errors.timeFrom && <p>{errors.timeFrom.message}</p> }

                              </Col>

                              <Col>
                              <Form.Label htmlFor="timeTo" >
                            End Time
                          </Form.Label>
                          <InputGroup>
                              
                              <FormControl size="lg" 
                              as="select"
                              value={props.timeTo}
                               name="timeTo" 
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
                          {errors.timeTo && <p>{errors.timeTo.message}</p> }
                          </Col>
                         
                          </Form.Row>
                                                
                          <Form.Row>
                        <Form.Group as={Col} controlId="fees">
                        <Form.Label>Fees</Form.Label>
                        <Form.Control 
                        type="number"
                        placeholder="fees"
                        name="fees"
                        value={props.fees}
                        ref={register({required:'Set Your Fees'})}
                        />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Per</Form.Label>
                        <Form.Control as="select" 
                        defaultValue="Month"
                        name="feesPer"
                        value={props.feesPer}
                        ref={register()}
                        >
                            {/* <option  /> */}
                            <option value="month" >Month</option>
                            <option value="week">Week</option>
                            <option value="hour">Hour</option>
                        </Form.Control>
                        </Form.Group>

                    </Form.Row>
                    {errors.fees && errors.fees.message}

                         
                          <div className="sign-up-link">
                           {/* <Link className="btn-dark" to="/dashboard" size="lg">Sign Up</Link>{' '} */}
                           <Button disabled={isLoading}
                            className="btn-dark"   
                            type="submit"
                            style={{marginLeft:'25%'}}
                             >
                              
                              Accept Request
                          </Button>
                          </div>
                          
                        </Form>

                        </Col>
                    </Row>
                </Container>
            </div>
    )
}