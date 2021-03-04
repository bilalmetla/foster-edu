import React, {useState, useEffect}  from "react";

import { Container, Row, Col, Button } from 'react-bootstrap';


export default function CallingDemo () {

    const [imageUrl, setimageUrl] = useState( '/images/calling_demo/01.jpg'); 
    const imagesList = [
       
        '/images/calling_demo/02.jpg',
        '/images/calling_demo/03.jpg',
        '/images/calling_demo/04.jpg',
        '/images/calling_demo/01.jpg'
        
    ]

    useEffect(() => {
        
        var callingDemoImageIndex = 0
      //  setimageUrl(imagesList[callingDemoImageIndex])
        setInterval(() => {
            
            if(callingDemoImageIndex > imagesList.length-1){
                callingDemoImageIndex = 0
            }
            setimageUrl(imagesList[callingDemoImageIndex])
            callingDemoImageIndex = callingDemoImageIndex +1
        }, 1000 * 8);
    }, []);


      return (
          <div id="calling-demo"  className="section" >
              <Container >
                  <Row >
                      
                          <h2 className="section-heading">
                          See how online lessons works
                          </h2>
                          <div className="calling-demo-content" >
                          <Col md={8} sm={6}>
                                <span >
                                    <img src={imageUrl} alt="video calling demo image" />
                                </span>
                            </Col>
                            <Col md={4} sm={6}>
                                <span style={{paddingTop:'30px'}}>
                                <p>
                                <i className="fa fa-angle-double-right "></i>  
                                 Meet with the expert of your choice, anywhere in the country, online or in-person
                                </p>
                                <p>
                                <i className="fa fa-angle-double-right"></i>  
                                Save time and easily fit lessons into your schedule
                                </p>
                                <p>
                                <i className="fa fa-angle-double-right"></i>  
                                Collaborate with online features built for any skill or subject
                                </p>
                                <a className="btn-link" href="/calling" target="_blank">See Video Calling</a>
                                </span>
                                </Col>
                          </div>

                     
                  </Row>
              </Container>
          </div>
      )
    
}