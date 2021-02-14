
import React, {useState, useEffect, useRef} from "react";
import {
  Link
} from "react-router-dom";
import { Container, Row, Col, Accordion, Card } from 'react-bootstrap';
import { uploadCustomerImage } from "../services";
import { NotificationManager } from 'react-notifications';




export default function DSMenu (props) {

    const [profileImage, setprofileImage] = useState({});
    const [fileupload, setfileupload] = useState('');
    const [customer, setcustomer] = useState({});
    const [customerName, setcustomerName] = useState('');
   // const [customerImage, setcustomerImage] = useState('');
   let userId = localStorage.getItem('userId')
   let user = localStorage.getItem('user')
      
  useEffect(() => {
  
    
    if(!user){
        window.location.href = '/'
        return
    }
    user = JSON.parse(user)
    setcustomerName(user.firstName +' '+ user.lastName)
    setfileupload(user.imageUrl? user.imageUrl : '/images/default.jpg')
   
  }, []);

  const changeHandler = (event) =>{
      console.log('event.target.files[0]', event.target.files[0])
      let file = event.target.files[0]
      setfileupload(URL.createObjectURL(file ) )
      var reader = new FileReader();
      var baseString;
      reader.onloadend = function () {
        baseString = reader.result;
   // console.log(baseString); 
        uploadCustomerImage({image: baseString, extention: '.'+ file.name.split('.')[1], customerId: userId})
        .then(result => {
            if(result.resultCode == '2001'){
                if(typeof user === 'string' ){
                    user = JSON.parse(user)
                }
                user.imageUrl = result.imageUrl
                localStorage.setItem('user', JSON.stringify(user) )
                NotificationManager.success(result.message, 'Successful!', 2000);
                return
            }else {
                NotificationManager.error(result.error.message, 'Error!', 2000);

            }

        })
        .catch(error=>{
            console.log(error)
            NotificationManager.error(error.toString(), 'Error!', 2000);

        })
    }
    reader.readAsDataURL(file);

     }

      return (
          <div id="dashboar-menu">
               <Container>
                <Row>
                    <Col md={12}>
              <div id="dashboar-menu-heading">
              <input ref={input => setprofileImage(input) }
               type="file" id="file1" name="image" accept="image/*" 
               capture 
               style={{display:"none" }}
               onChange={ changeHandler }
               />
              <img src={fileupload}
              id="upfile1" style={{cursor:"pointer"}}
              alt="user profile image" 
              onClick={ ()=>{ profileImage.click()} }
             
              />
              <h4>{customerName} </h4>
              {/* <p>
                  <i className="fa fa-user">
                  </i>
                  View Profile
              </p> */}
              </div>
              <h5>Dashboard </h5>
              
            <Accordion defaultActiveKey="0" id="menue-accordion">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" >
                Profile
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" className="accordions-links">
                <Card.Body>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                        <Link className="nav-link active" to="/dashboard/about">About</Link>
                    </p>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                        <Link className="nav-link active" to="/dashboard/contact">Contact Info</Link>
                    </p>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                        <Link className="nav-link active" to="/dashboard/expertise">Expertise</Link>
                    </p>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                        <Link className="nav-link active" to="/dashboard/education">Education</Link>
                    </p>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                        <Link className="nav-link active" to="/dashboard/mediums">Teaching Mediums</Link>
                    </p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            

            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1" >
                Account
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1" className="accordions-links">
                <Card.Body>
                    <p>
                    {/* <i className="fa fa-user"> </i> */}
                    <Link className="nav-link" to="/dashboard/new-requests">New Requests</Link>
                    </p>
                    {/* <p>
                    <i className="fa fa-user"> </i>
                    <Link className="nav-link" to="/">Online Classes</Link>
                    </p>
                    <p>
                    <i className="fa fa-user"> </i>
                        <Link className="nav-link" to="#">Get Verified</Link>
                    </p> */}
                    {/* <p>
                        <Link className="nav-link" to="#">Student Reviews</Link>
                    </p> */}
                    <p>
                        <Link className="nav-link" to="/dashboard/classes">My Sessions</Link>
                    </p>
                    
                    </Card.Body>
                </Accordion.Collapse>
            </Card>

            </Accordion>
            
            <ul className="nav flex-column">
              
                <li className="nav-item">
                    <Link className="nav-link " to="/" onClick={()=> { localStorage.clear(); window.location.reload(); } }>Log Out</Link>
                </li>
                </ul>
           
                </Col>
                </Row>
            </Container>
            </div>
      )
    
}