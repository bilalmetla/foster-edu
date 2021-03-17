
import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

import {Routes} from "./constants/routes";

import './App.css';

/**import components */
import  {Header, Footer, }  from "./components";

import  {Home, Tutors, Register,  
  Dashboard, ForgotPasswordView,
  VerifyEmail,
  ResetPassword,
  ViewProfile,
  ContactUs,
  StudentRequest,
  Faqs,
  ConferenceRoom,
 }  from "./pages";

 import { DSChatBox } from "./components";
 import Dashboard2 from "./pages/Dashboard/Dashboard";
// React Notification
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import WebrtcApp from "./webrtc/App";
import ClassRoom from "./classroom";

export default class App extends React.Component {
    render(){

        return (<div>
           <NotificationContainer/>
            <Router >
            <Header />
          
                <Switch>
                  <Route exact path={Routes.home}>                 
                   <Home />                  
                  </Route>

                  <Route path={Routes.verifyCustomer} render={(props) => <VerifyEmail {...props} />} />
                  <Route path={Routes.resetPassword} render={(props) => <ResetPassword {...props} />} />
                 

                  <Route path={Routes.login}>
                    <Register />
                   
                  </Route>

                  <Route path={Routes.faqs}>
                    <Faqs />
                   
                  </Route>

                  <Route path={Routes.register}>
                    <Register />
                  
                  </Route>

                  <Route path={Routes.forgotpassword}>
                    <Register />
                   
                  </Route>

                  <Route path={Routes.tutors}>
                    <Tutors />
                  </Route>
                  
                  <Route path={Routes.dashboard}>
                    <Dashboard />                   
                  </Route>
                  
                  
                  <Route path={Routes.contactUs}>
                    <ContactUs />
                   
                  </Route>
                 
                 
                  <Route path={Routes.annonymousCall}>
                    <WebrtcApp />
                  </Route>
                   <Route path={Routes.studentCall} render={(props) => <WebrtcApp {...props} />} >
                   </Route>
                  
                  
                  <Route path={Routes.tutorsProfile} render={(props) => <ViewProfile {...props} />} >
                                        
                  </Route>
                  
                  <Route path={Routes.studentRequest} render={(props) => <StudentRequest {...props} />} >
                                        
                  </Route>

                  <Route path={Routes.classRoom} >
                    
                    <ClassRoom className="section"  />
                    </Route>
                  
                  <Route path={Routes.conferencecall} >
                    
                    <ConferenceRoom className="section"  />
                    </Route>
                  

                 
                </Switch>
             
                <Footer />
           
            </Router>
            </div>
          )
    }
  
}

// You can think of these components as "pages"
// in your app.


