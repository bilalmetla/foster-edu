
import React, {useState, useEffect} from "react";
import { Container, Row, Col,Form, Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {  getCustomerById, updateCustomerInfo, sendFeedback } from "../services"
import Spinner from '../components/common/Spinner';
import { NotificationManager } from 'react-notifications';
import { RatingStars } from "../components";


function DSFeedback  (props){
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, errors, } = useForm();
    const [feedbackMessage, setfeedbackMessage] = useState('');
    const [feedbackstars, setfeedbackstars] = useState(5);
    const [feedbackreason, setfeedbackreason] = useState('');

    let userId = localStorage.getItem('userId')
    let user = localStorage.getItem('user')
    user = JSON.parse(user)


    const submitRating = ()=>{
        console.log('submitRating clicked feedbackMessage', feedbackMessage)
        console.log('submitRating clicked feedbackstars', feedbackstars)
        if(!feedbackMessage || !feedbackreason || feedbackstars === 0){
            return NotificationManager.error('Required More Info.', 'Error!', 2000);

        }
        
        let data = {
            message:feedbackMessage,
            stars:feedbackstars,
            byId: userId,
            fullname: `${user.firstName}  ${user.lastName}`,
            feedbackreason: feedbackreason,
        }
        sendFeedback(data)
        .then(result=>{
            console.log(result)
            if(result.ok === false){
                NotificationManager.error(result.statusText, 'Error!', 2000);

                return
            }

            NotificationManager.success(result.message || 'Successfully Created!', 'Success!', 2000);
            setfeedbackreason('')
            setfeedbackMessage('')
        })
        .catch(result=>{
            console.log(result)
            NotificationManager.error(result.toString(), 'Error!', 2000);

        })

    }


    return (
        <div className="section">
            {isLoading && <Spinner />}
            <Container>
                <Row>
                    <Col md={{span:10, offset:2}}>
                    <h2 className="section-heading">Share Your Feed Back</h2>
                
                    <RatingStars >
                              <RatingStars.rating
                                onChange={value=>{setfeedbackstars(value) }}
                               >
                             </RatingStars.rating >
                             
                             {/* {feedbackstars <= 3 ?  */}
                             <RatingStars.feedbackReasons
                                className="feedback-select"
                                label="Choose Your Reason"
                                stars={feedbackstars}
                                onChange={(event)=>setfeedbackreason(event.target.value)}
                             >
                                 
                                 </RatingStars.feedbackReasons>
                                 {/* : null
                             } */}
                              
                              
                              <RatingStars.messageBox 
                              placeholder="Enter Your Feedback"
                              value={feedbackMessage}
                              rows={4}
                            //   cols={50}
                             
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