import React, {useState, useEffect} from "react";
import { Container, Row, Col, Accordion, Card } from 'react-bootstrap';
import {  DSHeader, DSMenu, DSContent} from "./../components";


export default function Dashboard () {
  const [isDashboard, setisDashboard] = useState(true);

  const changeMenuToggle = (event) => {
    
      if(document.getElementById("dashboar-menu").classList.value.split(' ').includes('toogleMenuShow') ){
        document.getElementById("dashboar-menu").classList.remove('toogleMenuShow');
        document.getElementById("dashboar-menu").classList.add('toogleMenuHide');       
      }else{
          document.getElementById("dashboar-menu").classList.remove('toogleMenuHide');
          document.getElementById("dashboar-menu").classList.add('toogleMenuShow');       
      }
    }

    useEffect(() => {
      
      return () => {
        setisDashboard(false)
      };
    }, []);


    return (

      <div id="dashboard">
                   
          <Container>
            
                <Row>
                  
                    <Col md={{span:3}} >
                    <DSMenu  className="toogleMenuHide dashboar-menu" />
                    </Col>
                    <Col md={{span:9}}>
                      {isDashboard &&
                        <div  className="Navbar__Link Navbar__Link-toggle float-right">
                        <i class="fa fa-bars" onClick={changeMenuToggle} ></i>
                        </div>
                      }
                    
                    <DSContent />
                    </Col>
                </Row>
            </Container>
         
            

         
      </div>
      )
    
}