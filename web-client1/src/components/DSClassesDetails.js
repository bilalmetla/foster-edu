import React, {useState, useEffect} from "react";
import {
    Link
  } from "react-router-dom";
import { Container, Row, Col,Form, Button, Table } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {  getMyClasses } from "../services"
import Spinner from '../components/common/Spinner';
import { NotificationManager } from 'react-notifications';
import  WebrtcApp from "../webrtc/App";

export default function DSClassesDetails (){

    
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, errors, } = useForm();
    const [classes, setclasses] = useState([]);
    let userId = localStorage.getItem('userId')

    useEffect(() => {
            setIsLoading(true)
            getMyClasses({instructorId: userId})
            .then(cls => {
                setIsLoading(false)
                setclasses(cls);

            }).catch(error=>{
                setIsLoading(false)
                console.log(error)
                NotificationManager.error(error.toString(), 'Error!', 2000);

            })
    }, [])


    return (
        <div className="section">
            {isLoading && <Spinner />}
            <Container>
                <Row> 
                    <Col md={{span:12, offset:0}}>
                    <h2 className="section-heading">Classes/Sessions</h2>

                    </Col>
                </Row>
            </Container>
       </div>
    )  
                
} 