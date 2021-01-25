
import React, {setState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import RegisterView from "./views/register-view";
import LoginView from "./views/login-view";
import ForgotPasswordView from "./views/forgot-password";

export default class Register extends React.Component {

    // constructor (){
    //     super()
    //     this.state = {
    //         loading: false,
    //         locationPath: '/register'
    //     }

    //     this.submitSignUp = this.submitSignUp.bind(this)
    //     // this.showLoginView = this.showLoginView.bind(this)
    // }
  
    

    componentDidMount(){
       
        
    }

    render(){

        return (
            
            <Switch>
                  <Route path="/register">
                  <RegisterView />
                  </Route>

                  <Route path="/login">
                  <LoginView />
                  </Route>
                  
                  <Route path="/forgotpassword">
                  <ForgotPasswordView />
                  </Route>
                  
                  
                  {/* <Route path="/forgotpassword" component={ForgotPasswordView} /> */}

            </Switch>
        )
    //   return (
    //       <span>
    //            {this.state.locationPath === '/register'? <RegisterView 
    //             submitSignUp={this.submitSignUp}
    //             showLoginView={()=> this.setState({locationPath:'/login'})}
    //      />: null }

    //         {this.state.locationPath === '/login'? <LoginView 
    //             submitSignIn={this.submitSignUp}
    //             showRegisterView={()=> this.setState({locationPath:'/register'})}
    //             forgotPassword={()=> this.setState({locationPath:'/forgot-password'})}
    //      />: null }
           
    //         {this.state.locationPath === '/forgot-password'? <ForgotPassword 
    //             submitSignIn={this.submitSignUp}
    //             showRegisterView={()=> this.setState({locationPath:'/register'})}
                
    //      />: null }
    //       </span>
        
         

    //   )
    }
}