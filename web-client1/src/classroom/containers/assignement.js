
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';

import {useForm} from 'react-hook-form';



export default function CreateAssignment(props) {

  const { register, handleSubmit, setValue, errors, } = useForm();

 

    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Assignment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={12} md={8}>
              <Form>
                    <Form.Row>
                        <Form.Group as={Col} md={12} controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" 
                        name="title"
                        value={props.title}
                        ref={register({required: 'title is required!'})}
                        />
                        </Form.Group>

                        <Form.Group as={Col} md={12} controlId="exampleForm.instruction">
                          <Form.Label>Instructions</Form.Label>
                          <Form.Control as="textarea" rows={3} 
                          
                          name="instructions"
                          value={props.instructions}
                          ref={register({required: 'instructions is required!'})}
                          />
                        </Form.Group>
                     
                    </Form.Row>
                  </Form>
              </Col>
              <Col xs={6} md={4}>
              <Form>
                    <Form.Row>
                        <Form.Group as={Col} md={12} controlId="scores">
                        <Form.Label>Scores</Form.Label>
                        <Form.Control type="number" 
                        name="scores"
                        value={props.scores}
                        ref={register({required: 'scores is required!'})}
                        />
                        </Form.Group>
                      </Form.Row>
                  </Form>
              </Col>
            </Row>
  
            {/* <Row>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
            </Row> */}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button size="sm" className="btn-dark" onClick={props.onHide}>Close</Button> */}
          <Button size="sm" className="btn-dark" onClick={handleSubmit(props.create)}>Create Assignment</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  