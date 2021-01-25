
import React, {setState} from "react";
import {
  Link
} from "react-router-dom";
import { Container, Row, Col, Button,
    FormControl, Form, InputGroup, Spinner } from 'react-bootstrap';

import { signUp } from "../../services/user";

function RegisterView (props){

    function submitSignUp (){
        //this.setState({loading: true})
        signUp('/customers')
      .then(
        (result) => {
        //   this.setState({
        //     loading: false,
        //   });

          console.log(result)
        },
      
        (error) => {
        //   this.setState({
        //     loading: false,
        //     error
        //   });
        }
      )
    }

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
                    <Link className="btn-link" to="/login" size="lg">Login</Link>{' '}
                </Col>

                <Col md={7}  id="register-signup">
                    <div>
                        <h2>
                            Foster
                        </h2>
                        <p>
                            Sign up with your email.
                        </p>
                        <Row>
                            <Col md={{span:10, offset:2}}>
                        <Form >
                        
                        <Form.Label htmlFor="firstName" srOnly>
                              First Name
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" id="firstName" name="firstName" placeholder="first name" />
                          </InputGroup>
                          
                          <Form.Label htmlFor="lastName" srOnly>
                              Last Name
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" id="lastName" name="lastName" placeholder="last name" />
                          </InputGroup>


                          <Form.Label htmlFor="email" srOnly>
                              Email
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" type="email" id="email" name="email" placeholder="Email" />
                          </InputGroup>


                          <Form.Label htmlFor="Password" srOnly>
                              Password
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" type="password" id="password" name="password" placeholder="Password" />
                          </InputGroup>

                          <Form.Label htmlFor="confirmPassword" srOnly>
                              Confirm Password
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" type="password" id="confirmPassword" placeholder="Confirm Password" />
                          </InputGroup>
                        
                          <Form.Label htmlFor="confirmPassword" srOnly>
                              select
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" 
                                as="select"
                                className="mr-sm-2"
                                id="userType"
                                custom
                                placeholder="select" 
                                >
                                <option value="">user Type...</option>
                                <option value="tutor">Tutor</option>
                                <option value="student">Student</option>
                                <option value="parents">Parents</option>
                            </FormControl>
                          </InputGroup>
{/* 
                          <Form.Group controlId="userType">
                            <Form.Label className="mr-sm-2" htmlFor="userType" srOnly >
                            User Type
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="userType"
                                custom
                            >
                                <option value="">user Type...</option>
                                <option value="tutor">Tutor</option>
                                <option value="student">Student</option>
                                <option value="parents">Parents</option>
                            </Form.Control>
                            </Form.Group> */}


                          <div className="sign-up-link">
                           {/* <Link className="btn-dark" to="/dashboard" size="lg">Sign Up</Link>{' '} */}
                           <Button disabled={props.loading} className="btn-dark" onClick={submitSignUp} >
                               {props.loading && <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              />}
                              Sign Up
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

export default RegisterView