
import React, {  } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import {Link } from "react-router-dom";
import { Routes } from "../constants/routes";

export default function ListCalsses (){

    return <Container>
        <Row>
            <Col md={4} className="details-class-section">
                
                    <Link className="details-class" to={`/class-room/details/classroom01`}>
                        Mathematics 11
                    </Link>
                
            </Col>
            <Col md={4} className="details-class-section">
                    <Link className="details-class" to={`/class-room/details/classroom01`}>
                        Mathematics 11
                    </Link>
                
            </Col>
            <Col md={4} className="details-class-section">
                    <Link className="details-class" to={`/class-room/details/classroom01`}>
                        Mathematics 11
                    </Link>
                
            </Col>
            <Col md={4} className="details-class-section">
                    <Link className="details-class" to={`/class-room/details/classroom01`}>
                        Mathematics 11
                    </Link>
                
            </Col>
        </Row>
        </Container>
}