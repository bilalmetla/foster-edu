import React, {useState, useEffect} from "react";
import {
    Link
  } from "react-router-dom";
import { Container, Row, Col,Form, Button, Table, InputGroup, FormControl } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {  getStudentRequests } from "../services"
import Spinner from '../components/common/Spinner';
import { NotificationManager } from 'react-notifications';



function DSChatBox  (props){
    
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, errors, } = useForm();
    const [requests, setrequests] = useState([]);
    let userId = localStorage.getItem('userId')


    return (
        <div className="section">
        {isLoading && <Spinner />}
        <Container>
            <Row> 
                <Col md={{span:8, offset:0}} style={{marginBottom:'10%', marginTop:'50%', }}>
                {/* <h2 className="section-heading"></h2> */}
                <div  style={{display: 'flex',  background:'#e8eae7', margin:'10px'}}>
                    <img  src="" alt="user image" />
                    <p>
                        Hello how are you popopopo lkklklklklk
                        Hello how are you popopopo lkklklklklk
                        Hello how are you popopopo lkklklklklk
                        Hello how are you popopopo lkklklklklk
                    </p>
                </div>

                <div style={{display: 'flex', background:'#e74c3c', float:'right',margin:'10px'}}>
                   
                    <p >
                        I am fine.
                        I am fine.
                        I am fine.
                        I am fine.
                        I am fine.
                        I am fine.
                        I am fine.
                        I am fine.
                        I am fine.
                        I am fine.
                        I am fine.
                        I am fine.
                        I am fine.
                    </p>
                    <img src="" alt="user image"  />
                </div>
                {/* <div style={{width:'100%', }}> <hr /> </div> */}
                <div style={{display:'block', width:'100%', marginTop:'100px'}}>
                <Form>
                    <Form.Row className="align-items-center">
                        
                        <Col xs="auto" md="10">
                        <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                            Message
                        </Form.Label>
                        <InputGroup className="">
                            <InputGroup.Prepend>
                            <InputGroup.Text>@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl 
                            id="inlineFormInputGroup"
                             placeholder="type your message" 
                             as="textarea"
                             />
                        </InputGroup>
                        </Col>
                       
                        <Col xs="auto">
                        <Button type="submit" className="mb-2">
                            Send
                        </Button>
                        </Col>
                    </Form.Row>
                    </Form>
                </div>

                </Col>
                <Col md={{span:4, offset:0}}>
                <h2 className="">Connected Users</h2>

                    <div style={{display:'flex'}}>
                        <img width="59px" src="" alt="user image" />
                        <span>
                            <p><strong>bilal </strong></p>
                            <p>from: karachi</p>
                        </span>
                        <span style={{background:'red', height:'30px', width:'30px',textAlign:'center', borderRadius:'50%', color:'#fff' }}> 1 </span>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
      )

}

export default DSChatBox