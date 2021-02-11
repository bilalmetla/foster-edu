import React, {useState, useEffect} from "react";
import {
    Link
  } from "react-router-dom";
import { Container, Row, Col,Form, Button, Table } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {  getStudentRequests } from "../services"
import Spinner from '../components/common/Spinner';
import { NotificationManager } from 'react-notifications';



function DSNewRequests  (props){
    
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, errors, } = useForm();
    const [requests, setrequests] = useState([]);
    let userId = localStorage.getItem('userId')

    
    useEffect(() => {
            setIsLoading(true)
            getStudentRequests({to: userId}).then(requests => {
                setIsLoading(false)
                setrequests(requests);

            }).catch(error=>{
                setIsLoading(false)
                console.log(error)
                NotificationManager.error(error.toString(), 'Error!', 2000);

            })
    }, []);


      return (
        <div className="section">
        {isLoading && <Spinner />}
        <Container>
            <Row> 
                <Col md={{span:12, offset:0}}>
                <h2 className="section-heading">New Requests</h2>
                <Table striped bordered hover  responsive  size="md" >
                    <thead>
                        <tr> 
                        {/* <th>From</th> */}
                        {/* <th>To</th> */}
                        <th>Availability From</th>
                        <th>Availability To</th>
                        <th>Lesson Type</th>
                        <th>Subjects</th>
                        {/* <th>Status</th> */}
                        <th>Reply</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(((r, index) => <tr key={index}> 
                            {/* <td>{r.from}</td> */}
                            {/* <td>{r.to}</td> */}
                            <td>{r.timeFrom}</td>
                            <td>{r.timeTo}</td>
                            <td>{r.lessonType}</td>
                            <td>{r.subjects}</td>
                            {/* <td>{r.status}</td> */}
                            <td><Link to={`/dashboard/chat-box/${r.to}`} > Chat </Link> </td>
                            <td><Link to={`/dashboard/accept-request/${r.id}/from/${r.from}`} > Accept </Link> </td>
                             </tr>
                             )) }
                        

                    </tbody>
                </Table>
                </Col>
            </Row>
        </Container>
    </div>
      )
}


export default DSNewRequests