import React, {  } from "react";
import './index.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

import { Routes } from "./constants/routes";
import CreateClassRoom from "./pages/createclass";
import ListCalssesPage from "./pages/listclasses";
import DetailsCalssPage from "./pages/detailsclass";
import ClassRoomPage from "./pages/classroom";



function ClassRoom ({...restProps}) {
  
        return (
    
          <div {...restProps}>
         

              <Router >
                <Switch>
                    <Route  exact path="/class-room">                 
                                  <ClassRoomPage />           
                    </Route>

                    <Route  path={Routes.createClass}>                 
                            <CreateClassRoom />                  
                    </Route>
                   
                    <Route  path={Routes.listClasses}>                 
                            <ListCalssesPage />                  
                    </Route>
                    
                    <Route  path={Routes.detailClass}>                 
                            <DetailsCalssPage />                  
                    </Route>


                </Switch>
            </Router>


          </div>
        )
    
}

export default ClassRoom;