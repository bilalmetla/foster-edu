import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import {  TutorsFilter} from "./../components";


export default class Tutors extends React.Component {
 
  render(){
    return (
        <div className="new-page section">
            <h2 className="section-heading">Find Your Tutors</h2>
            <TutorsFilter />
           
        </div>
    )
  }
}