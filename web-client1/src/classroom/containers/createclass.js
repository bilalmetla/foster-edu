
import { CreateClass } from "../components";
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function CreatingClass ({...restProps}) {
    return <Container {...restProps}>
        <Row>
            <Col md={12}>
                <CreateClass>
                    
                    <CreateClass.Title> Create New Class
                    </CreateClass.Title>
                    <CreateClass.Label>Class Name <em>(required)</em>
                    </CreateClass.Label>
                    <CreateClass.Name
                    placeholder=""
                    >
                    </CreateClass.Name>

                    <CreateClass.Label>Subject
                    </CreateClass.Label>
                    <CreateClass.Name
                    placeholder=""
                    >
                    </CreateClass.Name>


                    <CreateClass.Button>Create
                    </CreateClass.Button>

                </CreateClass>
            </Col>
            </Row>
        </Container>
} 