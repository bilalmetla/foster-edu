import React from "react";
import { Container, Row, Col, Accordion, Card } from 'react-bootstrap';
import {  DSHeader, DSMenu, DSContent} from "./../components";


export default class Dashboard extends React.Component {
 
  render(){
    return (

      <div id="dashboard">
          {/* <DSHeader /> */}
          <div style={{display:'flex', marginTop:'47px'}}>
          <DSMenu />
          <DSContent />
          </div>
          
          {/* <Container>
                <Row>
                    <Col md={{span:3}} style={{marginLeft:0}}>
                    
                    </Col>
                    <Col md={{span:9}}>
                   
                    </Col>
                </Row>
            </Container> */}
         
            

         
      </div>
      )
    }
}