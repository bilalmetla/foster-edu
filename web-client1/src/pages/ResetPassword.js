
import React, {useState} from "react";

import { Container, Row, Col, Button,
    FormControl, Form, InputGroup, Spinner
 } from 'react-bootstrap';
 import {useForm} from 'react-hook-form';
import { passwordReset, MessageBox } from "../services";

function ResetPassword (props){
    const { register, handleSubmit, errors, watch } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalHeading, setModalHeading] = useState('Error!');
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccessModal, setisSuccessModal] = useState(false);


    const onSubmit = (formData)=>{
        
        let data = {
            customerId: props.match.params.customerId,
            phone: props.match.params.customerId,
            emailCode: +formData.code,
            newPassword: formData.password,
        }
        setIsLoading(true)
        passwordReset(data, {customerId: data.customerId})
        .then(responseJson => {
            setIsLoading(false)
            if(responseJson.ok === false){
                setisSuccessModal(false)
                setModalHeading(responseJson.status || 'Error')
                setModalMessage(`${responseJson.statusText}`)
                setModalShow(true)
                return
            }

            if(responseJson.resultCode && responseJson.resultCode !== '2001'){
                setisSuccessModal(false)
                setModalHeading(responseJson.code || 'Error')
                setModalMessage(`${responseJson.message}`)
                setModalShow(true)

            
                return
            }

            setisSuccessModal(true)
            setModalHeading(responseJson.code || 'Success')
            setModalMessage(`${responseJson.message}`)
                setModalShow(true)
                setTimeout(() => {
                    window.location.href = '/login'
                }, 1500);
            
        })
        .catch( error => {
            setIsLoading(true)
            console.log(error)
            setModalMessage(error.toString())
                setModalShow(true)
                return
        })
    }

        return(
            <div id="verify-email">
                <MessageBox 
                show={modalShow}
                onHide={() => setModalShow(false)}
                heading={modalHeading}
                message={modalMessage}
                isSuccess={isSuccessModal}
                />
                <Container>
                <Row>
                    <Col md={{span: 12}}>
                    <div className="custom-header">
                                <img src="" alt="foster logo" />
                                {/* <h1>Foster</h1> */}
                                    </div>
                        </Col>
                </Row>

                    <Row>
                    
                        <Col md={{span: 8, offset:2}}>
                            <div className="section" >
                               
                               
                                <h2 className="section-heading">
                                    Reset Password
                                </h2>
                                    <p>
                                    Enter code and new password, click below button to <strong> reset password </strong>
                                        </p>
                                        <Row>
                                            <Col md={{span:8, offset:2}}>
                                            
                                            <Form onSubmit={handleSubmit(onSubmit)}>

                                                <Form.Label htmlFor="code" srOnly>
                                                    Code
                                                </Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                    <InputGroup.Text>
                                                    <i className="fa fa-user"></i>
                                                    </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl size="lg" 
                                                    id="code" 
                                                    name="code" 
                                                    placeholder="Code"
                                                    type="number"
                                                    ref={register({required: 'Enter Your Code'})}
                                                    />
                                                </InputGroup>
                                                {errors.code && <p>{errors.code.message}</p>}

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
                                                {errors.password && <p>{errors.password.message}</p>}

                                                <div className="sign-up-link">
                                                    <Button
                                                        size="lg"
                                                        className="btn-dark"
                                                        disabled={props.isLoading}
                                                        type="submit"
                                                        > 
                                                        {props.isLoading && <Spinner
                                                        as="span"
                                                        animation="grow"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        />}
                                                        Reset Password
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

export default ResetPassword