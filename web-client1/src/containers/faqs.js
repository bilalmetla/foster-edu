import React, {useState, useEffect} from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Accordion } from "../components";
import faqsList from "../fixtures/faqs";
import Parser  from 'html-react-parser';

export function FaqsContainer ({isMoreFaqsShow, showFaqs}){
    const [showTotalFaqs, setshowTotalFaqs] = useState(0);

    useEffect(() => {
        if(showFaqs){
            setshowTotalFaqs(showFaqs)
        }else{
            setshowTotalFaqs(faqsList.length)
        }
        
    }, []);
    return (
        <div id="faqs" class="section" >
        <Container >
        <Row>
            <Col md={12}>
                <Accordion.Title className="section-heading">
                Frequently Asked Questions [FAQS]
            </Accordion.Title>
            </Col>
        </Row>
        <Row>
        <Col md={12}>
        <Accordion>
            
            {
               faqsList.map((item, index)=>{
                   if(index < parseInt(showTotalFaqs)){
                    return <Accordion.Item key={index}>
                                <Accordion.Header>
                                    {item.header}
                                </Accordion.Header>
                                <Accordion.Body>
                                    {Parser (item.body)}
                                </Accordion.Body>
                        </Accordion.Item>
                   }
                   
               }) 
            }
        </Accordion>
        </Col>
        </Row>
        {isMoreFaqsShow &&
        
        <Row>
            <Col md={12}>
                <Button onClick={()=> window.location.href = '/faqs' } variant="btn" size="lg"  >More Faqs</Button>
            </Col>
        </Row>
        }
        </Container>
        </div>
    )
}