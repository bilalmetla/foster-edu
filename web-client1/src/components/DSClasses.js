import React, {useState, useEffect} from "react";
import {
    Link
  } from "react-router-dom";
import { Container, Row, Col,Form, Button, Table } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {  getMyClasses } from "../services"
import Spinner from '../components/common/Spinner';
import { NotificationManager } from 'react-notifications';




function DSClasses (props){
    
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, errors, } = useForm();
    const [classes, setclasses] = useState([]);
    let userId = localStorage.getItem('userId')

    useEffect(() => {
            setIsLoading(true)
            getMyClasses([{instructorId:{like : userId} }, {studentId:{like : userId} }])
            .then(cls => {
                setIsLoading(false)
                setclasses(cls);

            }).catch(error=>{
                setIsLoading(false)
                console.log(error)
                NotificationManager.error(error.toString(), 'Error!', 2000);

            })
    }, [])


      return (
        <div className="section">
        {isLoading && <Spinner />}
        <Container>
            <Row> 
                <Col md={{span:12, offset:0}}>
                <h2 className="section-heading">My Sessions</h2>
                {classes.length === 0 ? <p>No Classes Yet.</p> : <p>Your Classes</p>}
                <Table striped bordered hover  responsive  size="md" >
                    <thead>
                        <tr> 
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Lesson Type</th>
                        <th>Fees</th>
                        {/* <th>Lesson Type</th>
                        <th>Subjects</th> */}
                        {/* <th>Status</th> */}
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map(((r, index) => <tr key={index}> 
                            <td>{r.timeFrom}</td>
                            <td>{r.timeTo}</td>
                            <td>{r.lessonType}</td>
                            <td>{r.fees}/{r.feesPer}</td>
                            {/* <td>{r.lessonType}</td>
                            <td>{r.subjects}</td> */}
                            {/* {userId !== r.studentId ?  */}
                            <td><Link to={`/dashboard/calling-route/${r.studentId}`} > Take The Session </Link> </td>
                            {/* : null
                            } */}
                            
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


export default DSClasses