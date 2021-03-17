import { Container, Row, Col, Modal, Button, Toast } from 'react-bootstrap';


export default function MultipleChoiceOptions( { children, title,  ...props}) {
    
  
    return (
      <Row>
        <Col xs={12} md={12}>
          <Toast {...props} >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">{title}</strong>
              {/* <small></small> */}
            </Toast.Header>
            <Toast.Body>
                {children}
            </Toast.Body>
          </Toast>
        </Col>
        {/* <Col xs={6}>
          <Button onClick={() => setShow(true)}>Show Toast</Button>
        </Col> */}
      </Row>
    );
  }