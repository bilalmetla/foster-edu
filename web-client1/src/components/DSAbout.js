import React from "react";
import {
  Link
} from "react-router-dom";
import { Container, Row, Col,Form, Button } from 'react-bootstrap';


export default class DSAbout extends React.Component {
 
    render(){
      return (
        <div className="section">
        <Container>
            <Row>
                <Col md={{span:12, offset:4}}>
                <h2 className="section-heading">Personal Information</h2>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Bilal" />
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="formGridEmail1">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Ali" />
                        </Form.Group>

                    </Form.Row>

                    <Form.Group controlId="tagline">
                        <Form.Label>Tagline </Form.Label>
                        <Form.Control placeholder="Tagline" />
                    </Form.Group>
                   
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridFees">
                        <Form.Label>Fees</Form.Label>
                        <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Per</Form.Label>
                        <Form.Control as="select" defaultValue="Month">
                            <option>Month</option>
                            <option>Week</option>
                            <option>Hour</option>
                        </Form.Control>
                        </Form.Group>

                    </Form.Row>


                    <Form.Row>
                        
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" defaultValue="">
                            <option></option>
                            <option>Male</option>
                            <option>Female</option>
                        </Form.Control>
                        </Form.Group>

                    </Form.Row>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>What makes you a great tutor? </Form.Label>
                        <Form.Control placeholder="tell students why your are the best" />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Teaching experience</Form.Label>
                        <Form.Control placeholder="mention your experience" />
                    </Form.Group>


                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                 </Form>
                </Col>
            </Row>
        </Container>
    </div>
      )
    }
}