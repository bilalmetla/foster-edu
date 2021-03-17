
import React, { useState, useRef, useEffect } from "react";

import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';

import {useForm} from 'react-hook-form';
import {  MultipleChoiceOptions} from "../components";


export default function CreateQuize(props) {
  const [show, setShow] = useState(false);
  const { register, handleSubmit, setValue, errors, } = useForm();
  const [multipleChoices, setmultipleChoices] = useState([]);
  const [isMultipleChoiceAnser, setisMultipleChoiceAnser] = useState(false);


  const addMultipleChoices = ()=>{

    let newMultipleChoices = []

    if(multipleChoices.length > 0){

      newMultipleChoices = multipleChoices.slice()
      newMultipleChoices.push(newMultipleChoices.length + 1)
      setmultipleChoices(newMultipleChoices)

    }else{
      newMultipleChoices.push(newMultipleChoices.length + 1)
      setmultipleChoices(newMultipleChoices)
    }
      
      console.log(multipleChoices)
  }

  const removeMultipleChoices = (index)=>{
    console.log('remove index: ', index)
    let newMultipleChoices = multipleChoices.slice()
    newMultipleChoices.splice(index, 1)
    setmultipleChoices(newMultipleChoices)
  }

  const handleAnswers = (event) =>{
    console.log(event.target.value)
  }

  const setAnswerType = (event)=>{
    const {value, name} = event.target
    
    if(value === 'Multiple Choices'){
      setisMultipleChoiceAnser(true)
      
    }else{
      setisMultipleChoiceAnser(false)
      setmultipleChoices([])
    }

  }

  // const closeModel = ()=>{
    
  //   setisMultipleChoiceAnser(false)
  //   setmultipleChoices([])
  // }

  useEffect(() => {
    
    setisMultipleChoiceAnser(false)
    setmultipleChoices([])
    return {

    }

  }, []);
 

    return (
      <Modal {...props} size="lg" 
      aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Quize
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

                      {multipleChoices && multipleChoices.length > 0 ?
                       multipleChoices.map((item, index) => {
                         return <MultipleChoiceOptions className="multiple-choice-toast"
                                    show={true}
                                    title={`Answer ${index+1}`}
                                    onClose={() => removeMultipleChoices(index)}
                                    
                                    >
                                      <Form.Group as={Col} md={12} >
                                      <Form.Control type="text" 
                                      onChange={handleAnswers}
                                      
                                      />
                                      </Form.Group>
                            </MultipleChoiceOptions>
                       })
                       : null
                      }

                    

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
                      
                      <Form.Row>
                        <Form.Group as={Col} >
                          <Form.Label>Answer Types</Form.Label>
                          <Form.Control as="select" 
                          name="answerType"
                          value={props.answerType}
                          onChange={setAnswerType}
                          
                          >
                            
                              <option>Short Answer</option>
                              <option>Multiple Choices</option>

                          </Form.Control>
                          </Form.Group>

                      </Form.Row>
                      {isMultipleChoiceAnser &&
                      
                          <Col xs={12}>
                          <Button 

                          className="btn-dark btn-add-choice" 
                          size="sm" 
                          onClick={addMultipleChoices}
                          title="add multiple choices"
                          >
                            Add
                          </Button>
                        </Col>
                      }
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
          {/* <Button className="btn-dark" size="sm" onClick={props.onHide}>Close</Button> */}
          <Button className="btn-dark" size="sm" onClick={handleSubmit(props.create)}>Create Quize</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  