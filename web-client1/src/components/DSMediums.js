import React, {useState, useEffect} from "react";
import { Container, Row, Col,Form, Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {  getCustomerById, updateCustomerInfo } from "../services"
import Spinner from '../components/common/Spinner';
import { NotificationManager } from 'react-notifications';




function DSMediums  (props){
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, errors, } = useForm();
    const [customer, setCustomer] = useState({});
    const [isOfflineTeaching, setIsOfflineTeaching] = useState(false);
    const [teachingCity, setTeachingCity] = useState(false);
    const [teachingArea, setTeachingArea] = useState(false);
    let userId = localStorage.getItem('userId')

    const onSubmit = (data) => {
     
       let postData = {...customer, ...data};
       setIsLoading(true)
    updateCustomerInfo(postData, {customerId: userId})
    .then(result =>{
        setIsLoading(false)
        console.log(result)
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
                 'isOnlineTeaching',
                 'isOfflineTeaching',
                 'teachingCity',
                 'teachingArea',
                 
                ];
                fields.forEach(field => setValue(field, customer[field]));
                setCustomer(customer);
                setIsOfflineTeaching(customer.isOfflineTeaching)
                setTeachingCity(customer.teachingCity)
                setTeachingArea(customer.teachingArea)
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
                <Col md={{span:12}}>
                <h2 className="section-heading">Teaching Mediums</h2>
                <Form >
                    <Form.Row>
                      <Col md={8}>
                      <Form.Group id="isOnlineTeaching">
                        <Form.Check type="checkbox" 
                        label="I can teach online" 
                        name="isOnlineTeaching"
                        ref={register()}

                        />
                         </Form.Group>
                      </Col>
                    
                    <Col md={8}>
                    <Form.Group id="isOfflineTeaching">
                        <Form.Check type="checkbox" 
                        label="I can teach in person" 
                        name="isOfflineTeaching"
                        value={props.isOfflineTeaching}
                        ref={register()}
                        onChange={()=>{setIsOfflineTeaching(!isOfflineTeaching)}}
                        />
                    </Form.Group>
                    </Col>
                                         
                    </Form.Row>

                
                    
                    <Form.Row>
                    <Form.Group as={Col} controlId="teachingCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control as="select" 
                       
                        name="teachingCity"
                        value={props.teachingCity}
                        ref={register()}
                        >
                            <option  />
                            <option value="Lahore" >Lahore</option>
                            <option value="Islamabad">Islamabad</option>
                            <option value="Karachi">Karachi</option>
                        </Form.Control>
                        </Form.Group>

                    </Form.Row>
                    

                    <Form.Row>
                    <Form.Group as={Col} controlId="teachingArea">
                        <Form.Label>Teaching Area</Form.Label>
                        <Form.Control
                       as="textarea"
                        name="teachingArea"
                        value={props.teachingArea}
                        ref={register()}
                        >
                         
                        </Form.Control>
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                    <Button as={Col}  className="btn-dark"
                     disabled={isLoading}
                     size="sm"
                     md={{span:8, offset:2}}
                     onClick={handleSubmit(onSubmit)}
                     >
                        Update Mediums
                    </Button>
                    </Form.Row>
                 </Form>
                </Col>
            </Row>
        </Container>
    </div>
      )
}


export default DSMediums