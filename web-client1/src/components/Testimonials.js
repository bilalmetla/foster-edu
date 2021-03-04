
import React, {useState, useEffect} from "react";

import { Container, Row, Col } from 'react-bootstrap';
import { TestimonialsList } from "../fixtures/Testimonials";

export default function Testimonials () {

    let [currentIndex, setcurrentIndex] = useState(0);
    //var currentIndex = 0
    const [testimonials, settestimonials] = useState([]);


    useEffect(() => {
        if(currentIndex >= TestimonialsList.length-1 || currentIndex < 0 ){
            setcurrentIndex(0)
            return
        }
        settestimonials(
            [
                TestimonialsList[currentIndex],
                TestimonialsList[++currentIndex]
            ]
        )
        
    //    setInterval(() => {
    //         if(currentIndex >= TestimonialsList.length-1 || currentIndex < 0 ){
    //             return setcurrentIndex(0)
    //         }            
    //         setcurrentIndex(currentIndex + 1)             

    //    }, 1000 * 15);

    }, [currentIndex]);
   
    const changeTestimonials = ()=>{
        settestimonials(
            [
                TestimonialsList[currentIndex],
                TestimonialsList[++currentIndex]
            ]
        )
    }


      return (
          <div id="testimonials" className="section" style={{display:'flex'}}>
             <Col md={1} className="slider-arrow" onClick={()=>{setcurrentIndex(currentIndex - 1)}}> <i className="fa fa-arrow-left"> </i> </Col>

              <Container>
                  <Row>
                      <Col md={12}>
                          <h2 className="section-heading">
                          See what students say about us
                          </h2>
                      </Col>
                  </Row>
                  <Row>
                      
                  {testimonials && testimonials.length > 0 &&
                  testimonials.map(item=>{
                      return <Col md={6}>
                                <p><strong>{item.title}</strong></p>
                                <p>
                                    {item.description}
                                    </p>
                                <p className="author"><strong>{item.author}</strong> from <strong>{item.from}</strong></p>

                            </Col>
                  })
                  }
                 
                      

                  </Row>
              </Container>
              <Col md={1} className="float-right slider-arrow" onClick={()=> setcurrentIndex(currentIndex + 1)}> <i className="fa fa-arrow-right"> </i> </Col>
          </div>
      )
    
}