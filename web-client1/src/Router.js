
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
import  {Home, Tutors, Register,  Dashboard, ForgotPasswordView }  from "./pages";




export default class App extends React.Component {
    render(){

        return (
            <Router>
              
          
        
                {/*
                  A <Switch> looks through all its children <Route>
                  elements and renders the first one whose path
                  matches the current URL. Use a <Switch> any time
                  you have multiple routes, but you want only one
                  of them to render at a time
                */}
                <Switch>
                  <Route exact path="/">
                  <Header />
                   <Home />
                   <Footer />
                  </Route>
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
                  <Header />
                    <Tutors />
                    <Footer />
                  </Route>
                  
                  <Route path="/dashboard">
                    <Dashboard />
                   
                  </Route>

                  {/* <Route path="/dashboard/about" component={Dashboard} /> */}
                 
                </Switch>
             
        
           
            </Router>
          )
    }
  
}

// You can think of these components as "pages"
// in your app.


