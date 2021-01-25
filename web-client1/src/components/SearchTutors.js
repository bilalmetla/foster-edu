
import React from "react";

import { Container, Row, Col, 
    Form, InputGroup, FormControl,
    Button, Badge
  } from 'react-bootstrap';

  import TutorListInfo from './TutorListInfo.js';

export default class SearchTutors extends React.Component {
 
    render(){
      return (
          <div>
            <div id="tutors-filter-search-box">
             <Form.Row>
                <Col xs={10}>
                <Form.Label htmlFor="inlineFormInput" >
                    Subject
                </Form.Label>
                <Form.Control placeholder="Subject" />
                </Col>
               
                <Col>
                <Button style={{marginTop:'25px'}} variant="btn" size="md">Search</Button>{' '}
                </Col>
            </Form.Row>

            <div id="tutor-results-info" style={{marginTop:'25px'}}>
                <h4>Total Found  <Badge variant="success">200</Badge>{' '}</h4>
            </div>

            </div>


            <TutorListInfo />
            <TutorListInfo />
            <TutorListInfo />
            <TutorListInfo />
            <TutorListInfo />


              </div>
      )
    }
}