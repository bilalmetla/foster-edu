
import React, {useState, useEffect} from "react";
import { Container, Row, Col,Form, Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {  getCustomerById, updateCustomerInfo } from "../services"
import Spinner from '../components/common/Spinner';
import { NotificationManager } from 'react-notifications';
import { RatingStars } from "../components";


function DSFeedback  (props){
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, errors, } = useForm();
    const [feedbackMessage, setfeedbackMessage] = useState('');
    const [feedbackstars, setfeedbackstars] = useState(5);
    const [feedbackreason, setfeedbackreason] = useState('');

    const submitRating = ()=>{
        console.log('submitRating clicked feedbackMessage', feedbackMessage)
        console.log('submitRating clicked feedbackstars', feedbackstars)
    }


    return (
        <div className="section">
            {isLoading && <Spinner />}
            <Container>
                <Row>
                    <Col md={{span:12, offset:3}}>
                    <h2 className="section-heading">Share Your Feed Back</h2>
                
                    <RatingStars >
                              <RatingStars.rating
                                onChange={value=>{setfeedbackstars(value) }}
                               >
                             </RatingStars.rating >
                             
                             {feedbackstars <= 3 ? 
                             <RatingStars.feedbackReasons
                                className="feedback-select"
                                label="Choose Your Reason"
                                onChange={(event)=>setfeedbackreason(event.target.value)}
                             >
                                 
                                 </RatingStars.feedbackReasons>
                                 : null
                             }
                              
                              
                              <RatingStars.messageBox 
                              placeholder="Enter Your Feedback"
                              value={feedbackMessage}
                              rows={4}
                              cols={50}
                             
                              onChange={event => {setfeedbackMessage(event.target.value)}}
                              > 
                              </RatingStars.messageBox >

                              <RatingStars.ratingSubmit
                                className="btn-dark" 
                                onClick={submitRating}
                                
                              >{"Feedback"}
                                  </RatingStars.ratingSubmit>

                              </RatingStars>

                    </Col>
                </Row>
                
            </Container>
        </div>
    )
}

export default DSFeedback