
import React, { useState } from "react";
import { Container, Row, Col, Button, Tabs, Tab, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import {Link } from "react-router-dom";
import { Routes } from "../constants/routes";
import CreateAssignment from "./assignement";
import CreateQuize from "./quize";
import CreateTopic from "./topic";

export default function DetailsCalss (props){
    const [assignementModalShow, setAssignementModalShow] = useState(false);
    const [quizeModalShow, setQuizeModalShow] = useState(false);
    const [topicModalShow, setTopicModalShow] = useState(false);

    const createAssignment = (data)=>{
        console.log(data)
        
    }
    const createQuize = (data)=>{
        console.log(data)
        
    }
    
    const createTopic = (data)=>{
        console.log(data)
        
    }

    return <Container>
        <CreateAssignment
        show={assignementModalShow} 
        onHide={() => setAssignementModalShow(false)}
        create={createAssignment}
        >
        </CreateAssignment>

        <CreateQuize
        show={quizeModalShow} 
        onHide={() => setQuizeModalShow(false)}
        create={createQuize}
        >
        </CreateQuize>
       
        <CreateTopic
        show={topicModalShow} 
        onHide={() => setTopicModalShow(false)}
        create={createTopic}
        >
        </CreateTopic>

            <Row>
                <Col md={12}>
                    <Tabs defaultActiveKey="classwork" >
                        <Tab eventKey="classwork" title="Class Work" className="class-work">
                        <Row>
                            <Col md={12}>
                                <ButtonGroup vertical id="classwork-create-button" >
                                    <DropdownButton as={ButtonGroup} title="Create Class Work"  >
                                        <Dropdown.Item eventKey="1" onClick={() => setTopicModalShow(true)} >Topic</Dropdown.Item>
                                        <Dropdown.Item eventKey="2"  >Material</Dropdown.Item>
                                        <Dropdown.Item eventKey="3" onClick={() => setAssignementModalShow(true)} >Assignment</Dropdown.Item>
                                        <Dropdown.Item eventKey="4" onClick={() => setQuizeModalShow(true)}>Quize</Dropdown.Item>
                                    
                                        
                                    </DropdownButton>
                                </ButtonGroup>
                            </Col>
                            </Row>
                            
                            <Row>
                                <Col md={12}>
                                    hello class
                                </Col>
                            </Row>

                        </Tab>
                        <Tab eventKey="peopel" title="People">
                           
                        </Tab>
                        <Tab eventKey="exams" title="Exams" >
                           
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
}