import React, {useState, useEffect} from "react";
import { Container, Row, Col,Form, Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {  getCustomerById, updateCustomerInfo } from "../services"
import { Multiselect } from 'multiselect-react-dropdown';
import Spinner from '../components/common/Spinner';
import { NotificationManager } from 'react-notifications';



function DSExpertise  (props){
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, errors, } = useForm();
    const [customer, setCustomer] = useState({});
    let userId = localStorage.getItem('userId')


    props = {
        subjects: [
            'Math',
            'Bio',
            'physics',
            'urdu',
            'english',
            'Math1 II',
            'Math2 II',
            'Math3 II',
            'Math4 II',
            'Math5 II',
            'Math6 II',
            'Math7 II',
            'Math8 II',
            'Math9 II',
        ],
        grades: [
            'Nursery',
            'KG',
            'Class 1-5',
            'Class 6-8',
            'Class 9-10',
            'O Levels',
            'Fsc',
        ]
    };

    const onSubjectSelect = (selectedList, selectedItem) =>{
       // customer.teachingSubjects.push(selectedItem.title) 
        customer.teachingSubjects = selectedList;
        console.log('customer.teachingSubjects', customer.teachingSubjects)     
    }
    
   const onSubjectRemove =(selectedList, removedItem)=> {
        
        var index = customer.teachingSubjects.indexOf(removedItem.title);
        if (index !== -1) {
            customer.teachingSubjects.splice(index, 1);
        }
    }
   
    const onGradeSelect = (selectedList, selectedItem) =>{
        //customer.teachingGrades.push(selectedItem.title)
        customer.teachingGrades = selectedList
        console.log('customer.teachingGrades', customer.teachingGrades)         
    }
    
   const onGradeRemove =(selectedList, removedItem)=> {
        
        var index = customer.teachingGrades.indexOf(removedItem.title);
        if (index !== -1) {
            customer.teachingGrades.splice(index, 1);
        }
    }

    const onSubmit = () => {
     
    let postData = {...customer};
    postData.teachingSubjects = customer.teachingSubjects
    postData.teachingGrades = customer.teachingGrades

    setIsLoading(true)
    updateCustomerInfo(postData, {customerId: userId})
    .then(result =>{
        setIsLoading(false)
        //console.log(result)
        NotificationManager.success(result.message, 'Successful!', 2000);

    })
    .catch(error=>{
        setIsLoading(false)
        console.log(error)
        NotificationManager.error(error.toString(), 'Error!', 2000);

    })
    }

    useEffect(() => {
       
            // get user and set form fields
            setIsLoading(true)
            getCustomerById(userId).then(customer => {
                setIsLoading(false)
                
                setCustomer(customer);
            }).catch(error=>{
                setIsLoading(false)
                NotificationManager.error(error.toString(), 'Error!', 2000);
            })
    }, []);


      return (
        <div className="section">
        {isLoading && <Spinner />}

        <Container>
            <Row>
                <Col md={{span:12, }}>
                <h2 className="section-heading">Subjects & Grades</h2>
                {/* </Col>
                </Row>
                <Row> */}
                <Form >
                    <Form.Row >
                        <Multiselect 
                        options={props.subjects} // Options to display in the dropdown
                        selectedValues={customer.teachingSubjects} // Preselected value to persist in dropdown
                        placeholder="subjects"
                        //displayValue="title" 
                        isObject={false}
                        style={{ searchBox: { border: "none", "border-bottom": "1px solid blue", "border-radius": "0px" } } }
                        onSelect={onSubjectSelect} // Function will trigger on select event
                        onRemove={onSubjectRemove} // Function will trigger on remove event
                        />
                       
                    </Form.Row>


                    <Form.Row>
                        
                    <Col md={8}>
                        <Multiselect 
                        options={props.grades} // Options to display in the dropdown
                        selectedValues={customer.teachingGrades} // Preselected value to persist in dropdown
                        placeholder="grades"
                       // displayValue="title" 
                       isObject={false}
                        style={{ searchBox: { border: "none", "border-bottom": "1px solid blue", "border-radius": "0px" } } }
                        onSelect={onGradeSelect} // Function will trigger on select event
                        onRemove={onGradeRemove} // Function will trigger on remove event
                        />
                        </Col>
                        
                    </Form.Row>

                    <Form.Row>
                    <Button as={Col}  className="btn-dark"
                     disabled={isLoading}
                     size="sm"
                     md={{span:8, offset:3}}
                     onClick={handleSubmit(onSubmit)}
                     >
                       Update Expertise
                    </Button>
                    </Form.Row>
                 </Form>
                </Col>
            </Row>
        </Container>
    </div>
      )
}


export default DSExpertise