import React, {useState, useEffect} from "react";

import { Container, Row, Col,Form, Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {  getCustomerById, updateCustomerInfo } from "../services"
import Spinner from '../components/common/Spinner';
import { NotificationManager } from 'react-notifications';




export default function DSContact (props) {
    const { register, handleSubmit, setValue, errors, } = useForm();
    const [customer, setCustomer] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    let userId = localStorage.getItem('userId')

const onSubmit = (data) => {
       
       let postData = {...customer, ...data};
       setIsLoading(true)
    updateCustomerInfo(postData, {customerId: userId})
    .then(result =>{
        setIsLoading(false)
        //console.log(result)
        NotificationManager.success(result.message, 'Successful!', 2000);

    })
    .catch(error=>{
        setIsLoading(false)
        console.log(error)
        NotificationManager.error(error.toString(), 'Error!', 2000);

    })
    }


    useEffect(() => {
        // get user and set form fields
        setIsLoading(true)
        getCustomerById(userId).then(customer => {
            setIsLoading(false)
            const fields = [
             'phone',
             'email',
             'addressLine',
             'isPublicContactInfo',
             
             
            ];
            fields.forEach(field => setValue(field, customer[field]));
            setCustomer(customer);
        }).catch(error=>{
            setIsLoading(false)
            console.log(error)
            NotificationManager.error(error.toString(), 'Error!', 2000);

        })
    }, []);


      return (
        <div className="section">
            {isLoading && <Spinner />}
        <Container>
            <Row>
                <Col md={{span:10, offset:2}}>
                <h2 className="section-heading">Contact Information</h2>
                <Form>
                   
                    <Form.Group controlId="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control placeholder="phone number" 
                        name="phone"
                        value={props.phone}
                        ref={register({required:'phone number is required.'})}
                        />
                    </Form.Group>
                    {errors.phone && <p>{errors.phone.message}</p> }
                   
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control placeholder="Email address"
                        name="email"
                        
                        ref={register({required:'email is required.'})}
                        />
                    </Form.Group>
                    {errors.email && <p>{errors.email.message}</p> }

                    <Form.Group controlId="addressLine">
                        <Form.Label>Living Address</Form.Label>
                        <Form.Control placeholder="enter your address"
                        name="addressLine"
                        as="textarea"
                        ref={register()}
                        />
                    </Form.Group>

                    <Form.Group id="isPublicContactInfo">
                        <Form.Check type="checkbox"
                         label="Make it public"
                         name="isPublicContactInfo"
                         ref={register()}
                         />
                    </Form.Group>

                    <Button 
                    as={Col}  className="btn-dark"
                     disabled={isLoading}
                     size="sm"
                     md={{span:6, offset:3}}
                     onClick={handleSubmit(onSubmit)}
                    >
                        Update
                    </Button>
                 </Form>
                </Col>
            </Row>
        </Container>
    </div>
      )
}