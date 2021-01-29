import React, {useState, useEffect} from "react";

import { Container, Row, Col,Form, Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {  getCustomerById, updateCustomerInfo } from "../services"

export default function DSContact (props) {
    const { register, handleSubmit, setValue, errors, } = useForm();
    const [customer, setCustomer] = useState({});
    let id = '600f23da7234a142acc51963'

const onSubmit = (data) => {
       
       let postData = {...customer, ...data};
    updateCustomerInfo(postData, {customerId: id})
    .then(result =>{
        console.log(result)
    })
    .catch(error=>{
        console.log(error)
    })
    }


    useEffect(() => {
        // get user and set form fields
        getCustomerById(id).then(customer => {
            const fields = [
             'phone',
             'email',
             'addressLine',
             'isPublicContactInfo',
             
             
            ];
            fields.forEach(field => setValue(field, customer[field]));
            setCustomer(customer);
        });
    }, []);


      return (
        <div className="section">
        <Container>
            <Row>
                <Col md={{span:12, offset:6}}>
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