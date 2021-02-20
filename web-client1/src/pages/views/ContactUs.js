
import React, {useState} from "react";
import {
  Link,
  useHistory
} from "react-router-dom";
import { Container, Row, Col, Button,
    FormControl, Form, InputGroup } from 'react-bootstrap';
    
import Spinner from '../../components/common/Spinner';
import {useForm} from 'react-hook-form';
import { MessageBox, sendContactUs } from "../../services"
import { NotificationManager } from 'react-notifications';




function ContactUs (props){
    const { register, handleSubmit, errors, watch } = useForm(); // initialize the hook

    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalHeading, setModalHeading] = useState('Error!');
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccessModal, setisSuccessModal] = useState(false);


    const onSubmit = (data) => {
        setIsLoading(true)
        sendContactUs(data)
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
                // setModalHeading(responseJson.error.code || 'Error')
                // setModalMessage(`${responseJson.error.message}`)
                // setModalShow(true)

                NotificationManager.error(responseJson.message, 'Error!', 2000);

                return
            }
          //  window.location.href ='/dashboard';
          setisSuccessModal(true)
          setModalHeading('Thank You')
          setModalMessage(`Our team will contact you soon.`)          
          setModalShow(true)

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
                <Col md={5} id="contact-us-left-side">
                    <h1>
                        Contact Information
                    </h1>
                    <div id="contact-us-info">
                            <p>
                               <strong>Address: </strong> 
                               {/* <i className="fa fa-user"></i> */}
                                Evacuee Trust Complex.
                            </p>

                            <p>
                            <strong>Email: </strong> 
                                <i className="fa fa-envelope"></i>
                                info@thefoster.life
                            </p>
                            <p>
                            <strong>Phone: </strong> 
                                <i className="fa fa-phone"></i> 
                                +92-301-5339780
                            </p>

                        </div>
                        <div id="contact-us-social-links"  style={{float:'right', marginRight:'25px'}} >
                            <a target="_blank" href="https://www.facebook.com/The-Foster-112666314196501/?view_public_for=112666314196501">
                                <i className="fa fa-facebook"></i>
                                </a>
                                
                                {/* <a target="_blank" href="">
                                <i className="fa fa-twitter"></i>
                                </a> */}
                        </div>
                </Col>

                <Col md={7}  id="register-signup">
                    <div>
                        <h2>
                            Send, Your Query
                        </h2>
                        <p>
                           We will get back to you in short. 
                        </p>
                        <Row>
                            <Col md={{span:10, offset:2}}>
                        <Form  onSubmit={handleSubmit(onSubmit)}>
                        
                        
                        <Form.Label htmlFor="fullname" >
                            Full Name 
                          </Form.Label>
                          <InputGroup>
                              
                              <FormControl size="lg"
                               name="fullname" 
                               placeholder="full name" 
                               ref={register({required: 'full name is required'}) } 
                               
                               />
                              
                          </InputGroup>
                          {errors.fullname && <p>{errors.fullname.message}</p> }

                          
                          <Form.Label htmlFor="phone" >
                              Phone or Email
                          </Form.Label>
                          <InputGroup>
                              
                              <FormControl size="lg" 
                              type="text"
                               
                               name="phone" 
                               placeholder="phone or email" 
                               ref={register({
                                   required: 'required a valid phone or email',
                                   
                                }) }
                               
                                />
                          </InputGroup>
                          {errors.phone && <p>{errors.phone.message}</p> }


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
                             >
                              
                              Send Request
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

export default ContactUs