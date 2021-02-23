


import React from "react";

import { Container, Row, Col } from 'react-bootstrap';
import { BannerImage } from "./StyledComponents";

export default class Banner extends React.Component {
 
    render(){
      return (
        <div id="banner" className="py-5">
            <Container>
                <Row>
                    <Col xs md={8} lg={6}>
                        <div id="banner-title" >
                            {/* <img id="backgroundimage" src="/images/banner-2.jpg" /> */}
                            {/* <BannerImage /> */}
                            {/* <p>Personal & Online Tutor                 </p> */}
                            <h2 id="title">
                                Find Private Tutor 
                            </h2> 
                            <p className="lead">
                                <strong>Worldwide Learning</strong>, We provide best tutors and standard education.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
      )
    }
}