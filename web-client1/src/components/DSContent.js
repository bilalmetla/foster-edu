import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { Container, Row, Col, Accordion, Card } from 'react-bootstrap';
import { DSAbout, DSContact } from "../components";

export default class DSContent extends React.Component {
 
  render(){
    return (
      
            <Switch>
                  <Route path="/dashboard/about">
                  <DSAbout />
                  </Route>

                  <Route path="/dashboard/contact">
                  <DSContact />
                  </Route>

            </Switch>
        
    )
  }
}