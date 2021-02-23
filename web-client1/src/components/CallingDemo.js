import React, {useState, useEffect}  from "react";

import { Container, Row, Col, Button } from 'react-bootstrap';


export default function CallingDemo () {

    const [imageUrl, setimageUrl] = useState(''); 
    const imagesList = [
        '/images/calling_demo/01.jpg',
        '/images/calling_demo/02.jpg',
        '/images/calling_demo/03.jpg',
        '/images/calling_demo/04.jpg',
        
    ]

    useEffect(() => {
        var callingDemoImageIndex = 0
        setimageUrl(imagesList[callingDemoImageIndex])
        setInterval(() => {
            callingDemoImageIndex = callingDemoImageIndex +1
            if(callingDemoImageIndex >= imagesList.length){
                callingDemoImageIndex = 0
            }
            setimageUrl(imagesList[callingDemoImageIndex])
        }, 1000 * 5);
    }, []);


      return (
          <div id="calling-demo"  class="section" >
              <Container>
                  <Row>
                      <Col md={12}>
                          <h2 class="section-heading">
                          How online Lessons Works
                          </h2>
                          <div className="calling-demo-content" >
                                <span style={{ width:'65%'}}>
                                    <img src={imageUrl} alt="video calling demo image" />
                                </span>
                                
                                <span style={{paddingTop:'30px', width:'35%'}}>
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
                                <a className="btn-link" href="/calling" target="_blank">How it work's</a>
                                </span>
                          </div>

                      </Col>
                  </Row>
              </Container>
          </div>
      )
    
}