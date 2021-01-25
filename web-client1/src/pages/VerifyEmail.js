
import React, {useState} from "react";

import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { verifyEmail, MessageBox } from "../services";

function VerifyEmail (props){

    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalHeading, setModalHeading] = useState('Error!');
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccessModal, setisSuccessModal] = useState(false);


    const emailVerificationClickHandler = ()=>{
        
        let data = {
            phone: props.match.params.id,
            emailCode: +props.match.params.code
        }
        setIsLoading(true)
        verifyEmail(data)
        .then(responseJson => {
            setIsLoading(false)
            if(responseJson.ok === false){
                setModalHeading(responseJson.status || 'Error')
                setModalMessage(`${responseJson.statusText}`)
                setModalShow(true)
                return
            }

            if(responseJson.error && responseJson.error.resultCode !== '2001'){
                setModalHeading(responseJson.error.code || 'Error')
                setModalMessage(`${responseJson.error.message}`)
                setModalShow(true)

            
                return
            }

            setisSuccessModal(true)
            setModalHeading(responseJson.error.code || 'Success')
            setModalMessage(`${responseJson.error.message}`)
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
                                    Email Confirmation
                                </h2>
                                <p>
                                    Hi You are all most ready to start with Foster.
                                    Hope, You will enjoy your learning path.
                                    </p>
                                    <p>
                                    <strong>Click </strong> below button to verify <strong> Email Address </strong>
                                        </p>

                                        <Button
                                        size="lg"
                                        className="btn-dark"
                                        disabled={props.isLoading}
                                        onClick={emailVerificationClickHandler}
                                        > 
                                        {props.isLoading && <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            />}
                                        Verify Email Address
                                        </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    
}

export default VerifyEmail