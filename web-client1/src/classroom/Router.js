import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

import { Routes } from "./constants/routes";
import CreateClassRoom from "./pages/createclass";

export default class App extends React.Component {
  render(){

      return (<div>
          <Router >
          <Switch>
          <Route  path={Routes.createClass}>                 
                   <CreateClassRoom />                  
          </Route>


          </Switch>
          </Router>
        </div>
          )
      }
}