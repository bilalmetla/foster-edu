
import React, {setState} from "react";
import {
  Link
} from "react-router-dom";
import { Container, Row, Col, Button,
    FormControl, Form, InputGroup, Spinner } from 'react-bootstrap';


function LoginView (props){
    return (
        <div id="register" className="section">
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
                        <Form >
                        
                        <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                              Email
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" id="inlineFormInputGroupUsername" placeholder="Username" />
                          </InputGroup>
                          
                          <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
                              Password
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" id="inlineFormInputGroupUsername" placeholder="Password" />
                          </InputGroup>

                          
                          <div className="sign-up-link">
                           {/* <Link className="btn-dark" to="/dashboard" size="lg">Sign Up</Link>{' '} */}
                           <Button disabled={props.loading} className="btn-dark" >
                               {props.loading && <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              />}
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