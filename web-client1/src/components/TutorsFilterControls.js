import React from "react";

import { Form } from 'react-bootstrap';

export default class TutorsFilterControls extends React.Component {
 
    render(){
      return (
          <div>
                
                        <h6>Filters </h6>
                        <Form>
                            <Form.Group controlId="formBasicRange">
                                <Form.Label>Hourly Rate</Form.Label>
                                <Form.Control  type="range" />
                            </Form.Group>

                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="input" />
                            </Form.Group>

                            <Form.Group controlId="Availability">
                                <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" >
                                    Availability
                                </Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    id="customControlAutosizing"
                                    label="Sunday"
                                    custom
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="customControlAutosizing"
                                    label="Monday"
                                    custom
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="customControlAutosizing"
                                    label="Tuesday"
                                    custom
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="customControlAutosizing"
                                    label="Wednessday"
                                    custom
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="customControlAutosizing"
                                    label="Thrisday"
                                    custom
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="customControlAutosizing"
                                    label="Friday"
                                    custom
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="customControlAutosizing"
                                    label="Saturday"
                                    custom
                                />
                            </Form.Group>

                            <Form.Group controlId="city">
                            <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" >
                                Gender
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                            >
                                <option value="0">Gender...</option>
                                <option value="1">Not Matter</option>
                                <option value="2">Female</option>
                                <option value="3">Male</option>
                            </Form.Control>
                            </Form.Group>

                        </Form>

                


              </div>
      )
    }
}