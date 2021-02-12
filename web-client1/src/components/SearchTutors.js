
import React, {useState, } from "react";

import { Container, Row, Col, 
    Form, InputGroup, FormControl,
    Button, Badge
  } from 'react-bootstrap';

  import TutorListInfo from './TutorListInfo.js';
  import {useForm} from 'react-hook-form';



export default function SearchTutors (props) {
  const { register, handleSubmit, setValue, errors, } = useForm();
  const [subject, setSubject] = useState('');
  let tutorsList = []

  if(props.tutors && props.tutors.length > 0){
     tutorsList = props.tutors.map(item=>{
       
              if(item.tagLine && item.fees){
                    return <TutorListInfo 
                        tutor={item}
                        key={item.id}
                        />
              }
              
     })
     console.log('tutorsList', tutorsList)
  }
  
    
  const findTutors= (data)=>{
    console.log(data)
    props.findTutors(data)
  }


      return (
          <div>
            <div id="tutors-filter-search-box">
             <Form.Row>
                <Col xs={10}>
                <Form.Label htmlFor="inlineFormInput" >
                    Subject
                </Form.Label>
                <Form.Control placeholder="Subject"
                name="subject"
               // value={props.subject}
                ref={register()}
                />
                </Col>
               
                <Col>
                <Button style={{marginTop:'25px'}}
                 variant="btn" size="md"
                 onClick={handleSubmit(findTutors) }
                 type="submit"
                 >
                   Search
                   </Button>{' '}
                </Col>
            </Form.Row>

            <div id="tutor-results-info" style={{marginTop:'25px'}}>
                <h4>Total Found  <Badge variant="success">{tutorsList.length}</Badge>{' '}</h4>
            </div>

            </div>


            
          {tutorsList}


              </div>
      )
    
}