import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { DSAbout, DSContact, DSExpertise,
  DSEducation,
  DSMediums,
  DSNewRequests,
  DSChatBox
 } from "../components";

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
                  
                  <Route path="/dashboard/expertise">
                  <DSExpertise />
                  </Route>
                  
                  <Route path="/dashboard/education">
                  <DSEducation />
                  </Route>
                 
                  <Route path="/dashboard/mediums">
                  <DSMediums />
                  </Route>
                 
                  <Route path="/dashboard/new-requests">
                  <DSNewRequests />
                  </Route>
                  
                  <Route path="/dashboard/chat-box">
                  <DSChatBox />
                  </Route>

            </Switch>
        
    )
  }
}