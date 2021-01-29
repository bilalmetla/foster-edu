import React, {useState, useEffect} from "react";
import { Container, Row, Col,Form, Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {  getCustomerById, updateCustomerInfo } from "../services"

function DSEducation  (props){

    const { register, handleSubmit, setValue, errors, } = useForm();
    const [customer, setCustomer] = useState({});
    //const [education, setEducation] = useState({});

    const onSubmit = (education) => {
       
    //let postData = {...customer, ...data};
   // customer.education && customer.education.length > 0 ?customer.education.push(education)
   customer.education = []
   customer.education[0] = education

    updateCustomerInfo(customer, {customerId: '600f23da7234a142acc51963'})
    .then(result =>{
        console.log(result)
    })
    .catch(error=>{
        console.log(error)
    })
    }

    useEffect(() => {
            // get user and set form fields
            getCustomerById('600f23da7234a142acc51963').then(customer => {
                let education = customer.education ? customer.education[0]: {}
                const fields = ['institute',
                 'degree',
                 'passingYear',
                ];
                fields.forEach(field => setValue(field, education[field]));
                setCustomer(customer);
            });
    }, []);


      return (
        <div className="section">

        <Container>
            <Row>
                <Col md={{span:12, offset:2}}>
                <h2 className="section-heading">Your Last Education Degree</h2>
                <Form >
                    <Form.Row>
                        <Form.Group as={Col} controlId="institute">
                        <Form.Label>Institute Name</Form.Label>
                        <Form.Control type="text" 
                        placeholder="institute" 
                        name="institute"
                        value={props.institute}
                        ref={register({required: 'institute is required!'})}
                        />
                        </Form.Group>
                        

                        <Form.Group as={Col} controlId="degree">
                        <Form.Label>Degree Title</Form.Label>
                        <Form.Control type="text" 
                        placeholder="degree" 
                        name="degree"
                        value={props.degree}
                        ref={register({required:'degree is required'})}
                        />
                        </Form.Group>

                        <Form.Group as={Col} controlId="passingYear">
                        <Form.Label>Passing Year</Form.Label>
                        <Form.Control 
                        type="number"
                        placeholder="passingYear"
                        name="passingYear"
                        value={props.passingYear}
                        ref={register({required:'passing year is required'})}
                        />
                        </Form.Group>

                    </Form.Row>

                    {errors.firstName && <p>{errors.firstName.message}</p> }
                    {errors.lastName && <p>{errors.lastName.message}</p> }
                    {errors.passingYear && <p>{errors.passingYear.message}</p> }


                    {/* <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}

                    <Form.Row>
                    <Button as={Col}  className="btn-dark"
                     
                     size="sm"
                     md={{span:8, offset:2}}
                     onClick={handleSubmit(onSubmit)}
                     >
                        Update Education
                    </Button>
                    </Form.Row>
                 </Form>
                </Col>
            </Row>
        </Container>
    </div>
      )
}


export default DSEducation