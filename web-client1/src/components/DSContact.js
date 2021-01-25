import React from "react";
import {
  Link
} from "react-router-dom";
import { Container, Row, Col,Form, Button } from 'react-bootstrap';


export default class DSContact extends React.Component {
 
    render(){
      return (
        <div className="section">
        <Container>
            <Row>
                <Col md={{span:12, offset:4}}>
                <h2 className="section-heading">Contact Information</h2>
                <Form>
                   
                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control placeholder="03136604801" />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control placeholder="bilal@gmail.com" />
                    </Form.Group>


                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Make it public" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                 </Form>
                </Col>
            </Row>
        </Container>
    </div>
      )
    }
}