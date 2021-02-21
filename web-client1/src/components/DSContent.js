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
  DSChatBox,
  DSClasses,
  DSClassesDetails,
  AcceptStudentRequest,
  DSFeedback
 } from "../components";

 import  WebrtcApp  from "../webrtc/App";

 import Socket from "../components/common/Socket.js";

export default class DSContent extends React.Component {
 
  render(){
    return (
        <div>
          <Socket />

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
                  
                  <Route path="/dashboard/chat-box/:to?" render={(props) => <DSChatBox {...props} />} >
                                                          
                   </Route>

                   <Route path="/dashboard/classes">
                  <DSClasses />
                  </Route>


                  <Route path="/dashboard/class/detail/:instructor" render={(props) => <DSClassesDetails {...props} />} >
                                                          
                  </Route>
                  
                  <Route path="/dashboard/accept-request/:requestId/from/:requestFrom" render={(props) => <AcceptStudentRequest {...props} />} >
                                                          
                  </Route>
                 
                  <Route path="/dashboard/calling-route/:receiverId" render={(props) => <WebrtcApp {...props} />} >
                                                          
                  </Route>
                 
                  <Route path="/dashboard/feedback">
                  <DSFeedback />
                  </Route>

            </Switch>
        </div>
    )
  }
}