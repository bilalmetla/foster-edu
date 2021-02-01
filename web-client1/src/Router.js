
import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import './App.css';

/**import components */
import  {Header, Footer, }  from "./components";

import  {Home, Tutors, Register,  
  Dashboard, ForgotPasswordView,
  VerifyEmail,
  ResetPassword,
  ViewProfile,
  ContactUs
 }  from "./pages";

 import Dashboard2 from "./pages/Dashboard/Dashboard";
// React Notification
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import WebrtcApp from "./webrtc/App";

export default class App extends React.Component {
    render(){

        return (<div>
           <NotificationContainer/>
            <Router>
            <Header />
          
        
                {/*
                  A <Switch> looks through all its children <Route>
                  elements and renders the first one whose path
                  matches the current URL. Use a <Switch> any time
                  you have multiple routes, but you want only one
                  of them to render at a time
                */}
                <Switch>
                  <Route exact path="/">
                  {/* <Header /> */}
                   <Home />
                  
                  </Route>

                  <Route path="/customers/:id/verify/:code" render={(props) => <VerifyEmail {...props} />} />
                  <Route path="/customers/:customerId/reset-password" render={(props) => <ResetPassword {...props} />} />
                 

                  <Route path="/login">
                    <Register />
                   
                  </Route>
                  <Route path="/register">
                    <Register />
                  
                  </Route>
                  <Route path="/forgotpassword">
                    <Register />
                   
                  </Route>
                  <Route path="/tutors">
                    <Tutors />
                  </Route>
                  
                  <Route path="/dashboard">
                    <Dashboard />
                    {/* <Dashboard2 /> */}
                   
                  </Route>
                  
                  
                  <Route path="/contact-us">
                    <ContactUs />
                   
                  </Route>
                 
                 
                  <Route path="/webrtc">
                    <WebrtcApp />
                  </Route>
                  
                  
                  <Route path="/profile/:id">
                    <ViewProfile />
                    {/* </ViewProfile> */}
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


