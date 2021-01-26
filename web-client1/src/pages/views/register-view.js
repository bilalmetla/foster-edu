
import React, {useState} from "react";
import {
  Link,
  useHistory
} from "react-router-dom";
import { Container, Row, Col, Button,
    FormControl, Form, InputGroup, Spinner } from 'react-bootstrap';
    

import {useForm} from 'react-hook-form';
import { MessageBox, signUp } from "../../services"

function RegisterView (props){
    const { register, handleSubmit, errors, watch } = useForm(); // initialize the hook
    const password = {}
    password.current = watch("password", "");

    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalHeading, setModalHeading] = useState('Error!');
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccessModal, setisSuccessModal] = useState(false);

    const onSubmit = (data) => {
        setIsLoading(true)
        signUp(data)
        .then((responseJson) => {
            setIsLoading(false)
            // Do something with the response
            console.log('responseJson', responseJson)
            if(responseJson.ok === false){
                setisSuccessModal(false)
                setModalHeading(responseJson.status || 'Error')
                setModalMessage(`${responseJson.statusText}`)
                
                setModalShow(true)
                return
            }
            if(responseJson.resultCode != 2001){
                setisSuccessModal(false)
                setModalHeading(responseJson.error.code || 'Error')
                setModalMessage(`${responseJson.error.message}`)
                setModalShow(true)
                return
            }
          //  window.location.href ='/dashboard';
          setisSuccessModal(true)
          setModalHeading('Thanks')
          setModalMessage(`Thanks for Signup. please verify you Email: ${data.email}`)          
          setModalShow(true)

          })
          .catch((error) => {
            setIsLoading(false)
            console.trace(error)
          setModalHeading('Error!')
          setModalMessage(error.toString())
            setModalShow(true)
          });
    };

   // props.user= {}
    /**
     * {
            
            "name": "25231656232",
            "phone": "25231656232",
            "isWebRegistered": true,
            userType:'tutor',
            emailAddress:'bilal@gmail.com',
           
          }
     */
     
    return (
        <div id="register" className="section">
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
                        <Form  onSubmit={handleSubmit(onSubmit)}>
                        
                        <Form.Label htmlFor="confirmPassword" srOnly>
                            User Type
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" 
                                as="select"
                                className="mr-sm-2"
                                id="userType"
                                name="userType"
                                custom
                                placeholder="user tyoe" 
                               value={props.userType}
                                ref={register({
                                    required: "Select User Type"
                                  })}
                                 title="userType is required"
                                >
                                <option value="" />
                                <option value="tutor">Tutor</option>
                                <option value="student">Student</option>
                                <option value="parents">Parents</option>
                            </FormControl>
                          </InputGroup>
                          {errors.userType && <p>{errors.userType.message}</p> }

                        <Form.Label htmlFor="firstName" srOnly>
                              First Name 
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" id="firstName"
                               name="firstName" 
                               value={props.firstName} 
                               placeholder="first name" 
                               ref={register({required: 'first name is required'}) } 
                               title="first name is required" 
                               />
                              
                          </InputGroup>
                          {errors.firstName && <p>{errors.firstName.message}</p> }

                          <Form.Label htmlFor="lastName" srOnly>
                              Last Name
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" id="lastName" 
                              name="lastName" 
                              value={props.lastName} 
                              placeholder="last name" 
                              ref={register({required: 'Required Last Name'}) } 
                              title="last name is required"
                               />
                          </InputGroup>
                          {errors.lastName && <p>{errors.lastName.message}</p> }

                          <Form.Label htmlFor="email" srOnly>
                              Email
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" type="email"
                               value={props.emailAddress} 
                               id="email" 
                               name="email" 
                               placeholder="Email" 
                               ref={register({
                                   required: 'required a valid email',
                                   
                                }) }
                                title="email is required" />
                          </InputGroup>
                          {errors.email && <p>{errors.email.message}</p> }

                          <Form.Label htmlFor="Password" srOnly>
                              Password
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" type="password" id="password" name="password" 
                              value={props.password} placeholder="Password" 
                              ref={register({
                                required: "You must specify a password",
                                minLength: {
                                  value: 4,
                                  message: "Password must have at least 4 characters"
                                }
                              })}
                               title="password is required" 
                               />
                          </InputGroup>
                          {errors.password && <p>{errors.password.message}</p>}
                          

                          {/* <Form.Label htmlFor="confirmPassword" srOnly>
                              Confirm Password
                          </Form.Label>
                          <InputGroup>
                              <InputGroup.Prepend>
                              <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl size="lg" type="password" 
                              id="confirmPassword" 
                              name="confirmPassword" 
                              placeholder="Confirm Password" 
                              ref={register({
                                validate: value =>
                                
                                  value === password.password || "The passwords do not match"
                              })}
                               />
                               {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
                          </InputGroup> */}
                        



                          <div className="sign-up-link">
                           {/* <Link className="btn-dark" to="/dashboard" size="lg">Sign Up</Link>{' '} */}
                           <Button disabled={props.loading}
                            className="btn-dark"   
                            type="submit"
                             >
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