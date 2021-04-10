import React, {useState} from "react";

import { Form, Col } from 'react-bootstrap';

export default function TutorsFilterControls (props) {

   const [tutorFilter, settutorFilter] = useState({}); 
   
   const handleOnChange = (event)=>{
       const {name, value} = event.target;
       tutorFilter[name] = value;
       settutorFilter(tutorFilter)
       //console.log(event.target.name, event.target.value)
       console.log(tutorFilter)

       props.filterTutors(tutorFilter)
   }
      return (
          <div>
                
                        <h6>Filters </h6>
                        <Form>
                        
                            <Form.Group  controlId="feesRange">
                                <Form.Label>Fees {tutorFilter.feesRange}</Form.Label>
                                <Form.Control 
                                 type="range"
                                 name="feesRange"
                                 min="" 
                                 max="5000"
                                 onChange={handleOnChange}
                                />
                            </Form.Group>

                            <Form.Group  controlId="feesPer">
                                <Form.Label>Fees Per</Form.Label>
                                <Form.Control as="select" 
                              //  defaultValue="Month"
                                name="feesPer"
                               onChange={handleOnChange}
                                >
                                    <option  />
                                    <option value="month" >Month</option>
                                    <option value="week">Week</option>
                                    <option value="hour">Hour</option>
                                </Form.Control>
                            </Form.Group>


                            <Form.Group  controlId="teachingCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control 
                                // as="select"
                                onChange={handleOnChange}
                                name="teachingCity"
                                >
                                    {/* <option  />
                                    <option value="Lahore" >Lahore</option>
                                    <option value="Islamabad">Islamabad</option>
                                    <option value="Karachi">Karachi</option> */}
                                </Form.Control>
                        </Form.Group>


                            {/* <Form.Group controlId="Availability">
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
                            </Form.Group> */}

                            <Form.Group controlId="gender">
                            <Form.Label className="mr-sm-2"  >
                                Gender
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                name="gender"
                                onChange={handleOnChange}
                            >
                                <option value="">Gender...</option>
                                {/* <option value="">Not Matter</option> */}
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </Form.Control>
                            </Form.Group>

                        </Form>

              </div>
      )
    
}