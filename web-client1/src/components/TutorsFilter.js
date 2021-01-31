import React, {useState, useEffect} from "react";

import { Container, Row, Col, Form } from 'react-bootstrap';
import SearchTutors from "./SearchTutors";
import TutorsFilterControls from "./TutorsFilterControls";
import { getTutors } from "../services";
import {useForm} from 'react-hook-form';
import Spinner from './common/Spinner';


export default function TutorsFilter() {
  const { register, handleSubmit, setValue, errors, } = useForm();
    const [tutors, setTutors] = useState([]);
    const [totalTutors, setTotalTutors] = useState(0);
    const [tutorFilter, settutorFilter] = useState({});
    const [subject, setsubject] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
      // get user and set form fields
      setIsLoading(true)
      getTutors().then(tutors => {
        setIsLoading(false)
          setTutors(tutors);
          setTotalTutors(tutors.length)
      }).catch(error=>{
        setIsLoading(false)
        console.log(error)
      })
    }, []);


    const findTutorsBySubject = (data)=>{
    console.log(data)
    setsubject(data.subject)

    let filter = tutorFilter
    if(data.subject){
      filter.teachingSubjects = data.subject
    }else {
      delete filter.teachingSubjects
    }
 
    filterTutors(filter)
      
    }

    const applyFilterOnSearchTutors = (data)=>{
      //console.log(data)
      
      let fltr = data || tutorFilter
      fltr = JSON.parse(JSON.stringify(fltr))

      if(fltr.feesRange === "" || fltr.feesRange === "0") {
        delete fltr.fees
        delete fltr.feesRange
      }
      else {
        fltr.fees = {gt:parseInt(fltr.feesRange)}
        delete fltr.feesRange
      }
      if(fltr.feesPer === "") delete fltr.feesPer
      if(fltr.teachingCity === "") delete fltr.teachingCity
      if(fltr.gender === "") delete fltr.gender

      settutorFilter(fltr)
      if(subject){
        fltr.teachingSubjects = subject
      }
     
      filterTutors(fltr)
      }
    
      function filterTutors (filter){
        setIsLoading(true)
        getTutors(filter).then(tutors => {
          setIsLoading(false)
          setTutors(tutors);
          setTotalTutors(tutors.length)
        }).catch(error=>{
          setIsLoading(false)
          console.log(error)
        })
      }

      return (
          <div>
            {isLoading && <Spinner />}
              <Container>
                    <Row>
                    <Col md={3} >
                       <TutorsFilterControls
                      filterTutors={applyFilterOnSearchTutors}
                       />
                      </Col>

                    <Col md={9} >
                        
                       <SearchTutors 
                        totalTutors={totalTutors}
                        tutors={tutors}
                        findTutors={findTutorsBySubject}
                       />

                    </Col>

                    </Row>

                </Container>
              
          </div>
      )
    
}