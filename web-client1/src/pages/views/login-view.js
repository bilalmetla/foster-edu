
import React, { useState} from "react";
import {
  Link
} from "react-router-dom";
import { Container, Row, Col, Button,
    FormControl, Form, InputGroup, } from 'react-bootstrap';
    
import {useForm} from 'react-hook-form';
import { MessageBox, login } from "../../services"
import Spinner from '../../components/common/Spinner';
import { NotificationManager } from 'react-notifications';




function LoginView (props){
    const { register, handleSubmit, errors, watch } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalHeading, setModalHeading] = useState('Error!');
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccessModal, setisSuccessModal] = useState(false);

    const onSubmit = (data) => {
        setIsLoading(true)
        login(data)
        .then((responseJson) => {
            setIsLoading(false)
            // Do something with the response
            console.log('responseJson', responseJson)
            if(responseJson.ok === false){
                // setisSuccessModal(false)
                // setModalHeading(responseJson.status || 'Error')
                // setModalMessage(`${responseJson.statusText}`)
                
                // setModalShow(true)
                NotificationManager.error(responseJson.statusText, 'Error!', 2000);

                return
            }
            if(responseJson.resultCode && responseJson.resultCode != 2001){
                // setisSuccessModal(false)
                // setModalHeading(responseJson.code || 'Error')
                // setModalMessage(`${responseJson.message}`)
                // setModalShow(true)
                NotificationManager.error(responseJson.message, 'Error!', 2000);

                return
            }
          
            localStorage.setItem('userId', responseJson.id);
            localStorage.setItem('access_token', responseJson.access_token);
            localStorage.setItem('userType', responseJson.userType);
            localStorage.setItem('user', JSON.stringify(responseJson));
            window.location.href ='/dashboard/about';
        

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
                            Login with your email.
                        </p>
                        <Row>
                            <Col md={{span:10, offset:2}}>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                        
                        <Form.Label htmlFor="email" srOnly>
                              Email
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text>
                              <i className="fa fa-user"></i>
                              </InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" 
                              id="email" 
                              name="username" 
                              placeholder="Email"
                              ref={register({required: 'Enter Your Email'})}
                               />
                          </InputGroup>
                          
                          <Form.Label htmlFor="password" srOnly>
                              Password
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg"
                              type="password"
                               id="password"
                               name="password"
                                placeholder="Password" 
                                ref={register({required: 'Enter Your Password'})}
                                />
                          </InputGroup>

                          
                          <div className="sign-up-link">
                           {/* <Link className="btn-dark" to="/dashboard" size="lg">Sign Up</Link>{' '} */}
                           <Button disabled={isLoading} 
                           className="btn-dark"
                           type="submit"
                           >
                              
                              Login
                          </Button>
                          <Link className="forgot-password" to="/forgotpassword" size="lg">Forgot Password?</Link>{' '}
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

export default LoginView