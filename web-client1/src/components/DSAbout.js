import React, {useState, useEffect} from "react";
import { Container, Row, Col,Form, Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {  getCustomerById, updateCustomerInfo } from "../services"
import Spinner from '../components/common/Spinner';
import { NotificationManager } from 'react-notifications';



function DSAbout  (props){
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, errors, } = useForm();
    const [customer, setCustomer] = useState({});
    let userId = localStorage.getItem('userId')

    const onSubmit = (data) => {
       if(data.fees){
           data.fees = parseInt(data.fees)
       }else {
           delete data.fees
       }
       //data.userType = customer.userType;
       let postData = {...customer, ...data};
       setIsLoading(true)
    updateCustomerInfo(postData, {customerId: userId})
    .then(result =>{
        setIsLoading(false)
        //console.log(result)
        if(result.error){
            NotificationManager.error(result.error.message, 'Error!', 2000);
            return
        }
        NotificationManager.success(result.message, 'Successful!', 2000);

    })
    .catch(error=>{
        setIsLoading(false)
       // console.log(error)
        NotificationManager.error(error.toString(), 'Error!', 2000);

    })
    }

    useEffect(() => {
            // get user and set form fields
            setIsLoading(true)
            getCustomerById(userId).then(customer => {
                setIsLoading(false)
                const fields = ['firstName',
                 'lastName',
                 'tagLine',
                 'fees',
                 'feesPer',
                 'gender',
                 'greateTutorLine',
                 'greateTutorLine',
                 'teachingExperienceLine',
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
                <Col md={{span:12, offset:2}}>
                <h2 className="section-heading">Personal Information</h2>
                <Form >
                    <Form.Row>
                        <Form.Group as={Col} controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" 
                        placeholder="FirstName" 
                        name="firstName"
                        value={props.firstName}
                        ref={register({required: 'firstName is required!'})}
                        />
                        </Form.Group>
                        

                        <Form.Group as={Col} controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" 
                        placeholder="last Name" 
                        name="lastName"
                        value={props.lastName}
                        ref={register({required:'last name is required'})}
                        />
                        </Form.Group>

                    </Form.Row>

                    {errors.firstName && <p>{errors.firstName.message}</p> }
                    {errors.lastName && <p>{errors.lastName.message}</p> }

                    <Form.Group controlId="tagline">
                        <Form.Label>Tagline </Form.Label>
                        <Form.Control placeholder="Tagline"
                        name="tagLine"
                        value={props.tagLine}
                        ref={register({required: 'Tag Line is required'})}
                        />
                    </Form.Group>
                   
                    <Form.Row>
                        <Form.Group as={Col} controlId="fees">
                        <Form.Label>Fees</Form.Label>
                        <Form.Control 
                        type="number"
                        placeholder="fees"
                        name="fees"
                        value={props.fees}
                        ref={register({required: 'Fees is required'})}
                        />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Per</Form.Label>
                        <Form.Control as="select" 
                        defaultValue="Month"
                        name="feesPer"
                        value={props.feesPer}
                        ref={register({required: 'fees as per is requried'})}
                        >
                            {/* <option  /> */}
                            <option value="month" >Month</option>
                            <option value="week">Week</option>
                            <option value="hour">Hour</option>
                        </Form.Control>
                        </Form.Group>

                    </Form.Row>


                    <Form.Row>
                        
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" 
                        name="gender"
                        value={props.gender}
                        ref={register()}
                        defaultValue=""
                        >
                            <option />
                            <option>Male</option>
                            <option>Female</option>
                        </Form.Control>
                        </Form.Group>

                    </Form.Row>

                    <Form.Group controlId="greateTutorLine">
                        <Form.Label>What makes you a great tutor? </Form.Label>
                        <Form.Control 
                        placeholder="tell students why your are the best" 
                        as="textarea"
                        name="greateTutorLine"
                        value={props.greateTutorLine}
                        ref={register({required: 'Description is required'})}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Teaching experience</Form.Label>
                        <Form.Control 
                        placeholder="mention your experience" 
                        as="textarea"
                        name="teachingExperienceLine"
                        value={props.teachingExperienceLine}
                        ref={register({required: 'teaching experience is required'})}
                        />
                    </Form.Group>


                    {/* <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}

                    <Form.Row>
                    <Button as={Col}  className="btn-dark"
                     disabled={isLoading}
                     size="sm"
                     md={{span:8, offset:2}}
                     onClick={handleSubmit(onSubmit)}
                     >
                        Update Personal information
                    </Button>
                    </Form.Row>
                 </Form>
                </Col>
            </Row>
        </Container>
    </div>
      )
}


export default DSAbout