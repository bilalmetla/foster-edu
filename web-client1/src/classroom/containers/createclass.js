
import { CreateClass } from "../components";
import { Container, Row, Col, Button } from 'react-bootstrap';

export function CreatingClass ({...restProps}) {
    return <Container {...restProps}>
        <Row>
            <Col md={12}>
                <CreateClass>
                    
                    <CreateClass.Title> Create New Class
                    </CreateClass.Title>
                    <CreateClass.Label>Class Name
                    </CreateClass.Label>
                    <CreateClass.Name
                    placeholder="class name"
                    >
                    </CreateClass.Name>
                </CreateClass>
            </Col>
            </Row>
        </Container>
} 