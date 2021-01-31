
import React, {setState, useState} from "react";
import {
  Link
} from "react-router-dom";
import { Container, Row, Col, Button,
    FormControl, Form, InputGroup, } from 'react-bootstrap';

import {useForm} from 'react-hook-form';
import { MessageBox, forGotPassword } from "../../services"
import Spinner from '../../components/common/Spinner';
import { NotificationManager } from 'react-notifications';




function ForgotPasswordView (props){

    const { register, handleSubmit, errors, watch } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalHeading, setModalHeading] = useState('Error!');
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccessModal, setisSuccessModal] = useState(false);

    const onSubmit = (data) => {
        setIsLoading(true)
        forGotPassword(data)
        .then((responseJson) => {
            setIsLoading(false)
            // Do something with the response
            console.log('responseJson', responseJson)
            if(responseJson.ok === false){
                NotificationManager.error(responseJson.statusText, 'Error!', 2000);

                return
            }
            if(responseJson.resultCode && responseJson.resultCode != 2001 ){
                NotificationManager.error(responseJson.message, 'Error!', 2000);

                return
            }
          
            window.location.href =`/customers/${responseJson.customerId}/reset-password`;
        

          })
          .catch((error) => {
            setIsLoading(false)
            console.trace(error)
            NotificationManager.error(error.toString(), 'Error!', 2000);

          });
    };


    return (
        <div id="register" className="section">
            {isLoading && <Spinner />}
            <MessageBox
                show={modalShow}
                onHide={() => setModalShow(false)}
                heading={modalHeading}
                message={modalMessage}
                isSuccess={isSuccessModal}
            />
        <Container>
            <Row>
                <Col md={5} id="register-left-side">
                    <h1>
                        Welcome To Foster!
                    </h1>
                    <p>
                        Meet with your tutor. We provide best online tutoring service.
                    </p>
                    <Link className="btn-link" to="/register" size="lg">Register</Link>{' '}
                </Col>

                <Col md={7}  id="register-signup">
                    <div>
                        <h2>
                            Foster
                        </h2>
                        <p>
                            Reset password with your email.
                        </p>
                        <Row>
                            <Col md={{span:10, offset:2}}>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                        
                        <Form.Label htmlFor="email" srOnly>
                              Email
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" 
                              id="email" 
                              name="username" 
                              placeholder="Email" 
                              ref={register({required:'Enter your email address'})}
                              />
                          </InputGroup>
                          {errors.email && <p>{errors.email.message}</p>}
                                                   
                          <div className="sign-up-link">
                           {/* <Link className="btn-dark" to="/dashboard" size="lg">Sign Up</Link>{' '} */}
                           <Button disabled={isLoading} 
                           className="btn-dark" 
                           type="submit"
                           >
                               
                              Reset Passowrd
                          </Button>
                          
                          </div>
                          
                        </Form>

                        </Col>
                        </Row>
                            

                    </div>
                </Col>
            </Row>
        </Container>
    </div>
    )
}

export default ForgotPasswordView