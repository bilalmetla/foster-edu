import React, {useState, useEffect} from "react";
import {
    Link
  } from "react-router-dom";
import { Container, Row, Col,Form, Button, Table, InputGroup, FormControl } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {  getMessages } from "../services"
import Spinner from '../components/common/Spinner';
import { NotificationManager } from 'react-notifications';



function DSChatBox  (props){
    
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, errors, } = useForm();
    const [chatWith, setchatWith] = useState(props.match.params.to ? props.match.params.to : '' );
   const [messagesList, setmessagesList] = useState([]);
   const [message, setmessage] = useState('');
    let userId = localStorage.getItem('userId')
   //const socket =  localStorage.getItem('currentSocket')
   //console.log('local storage socket', socket)
   //socket = JSON.parse(socket)
   //console.log('local storage socket', socket)
    // if(props.match && props.match.params){
    //     console.log(props.match.params)
    //     setchatWith(props.match.params.to)
    // }

    useEffect(() => {
        if(chatWith){
            getMessages({to:chatWith, from: userId})
            .then(result=>{
                console.log(result)
                setmessagesList(result)
                console.log(messagesList)

                window.currentSocket.on('message', (data)=>{
                    console.log('received new message..', data)
                    let newMessages = messagesList.slice()
                    newMessages.push(data)
                    setmessagesList(newMessages)
                })
                //messagesList.concat({to:'1', from: '2', message:'hi'})
            })
            .catch(error=>{
                console.log(error)
            })
        }
       
        

    }, []);

    const changeHandler = (event)=>{
        let {name, value} = event.target;
        setmessage(value)
    }
    const sendMessage = ()=>{
        if(!message) return

        let data = {
            from:userId,
            to: chatWith,
            message: message,
        }
        let newMessages = messagesList.slice()
        newMessages.push(data)
        setmessagesList(newMessages)

        window.currentSocket.emit('message', data)
       
        setmessage('')
    }

   



    return (
        <div className="section">
        {isLoading && <Spinner />}
        <Container>
            <Row> 
                <Col md={{span:8, offset:0}} style={{marginBottom:'20%', marginTop:'40%', width:'100%' }}>
                {/* <h2 className="section-heading"></h2> */}
                {messagesList &&
                messagesList.map((msg, index)=>{
                    if(msg.from == userId){
                       return <div key={index} className="message-from">
                            
                            <p >
                                {msg.message}
                            </p>
                            <img src="" alt="user image"  />
                        </div>

                    }
                    else{
                       return <div key={index} className="message-to">
                                <img  src="" alt="user image" />
                                <p>
                                    {msg.message}
                                </p>
                            </div>
                    }
                })
                }
                
                
                <div >
                <Form >
                    <Form.Row className="align-items-center">
                        
                        <Col xs="auto" md="10">
                        <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                            Message
                        </Form.Label>
                        <InputGroup className="">
                            <InputGroup.Prepend>
                            <InputGroup.Text>@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl 
                             placeholder="type your message" 
                             as="textarea"
                             name="message"
                             value={message}
                             onChange={changeHandler}
                             />
                        </InputGroup>
                        </Col>
                       
                        <Col xs="auto">
                        <Button onClick={handleSubmit(sendMessage)} className="mb-2">
                            Send
                        </Button>
                        </Col>
                    </Form.Row>
                    </Form>
                </div>

                </Col>
                <Col md={{span:4, offset:0}}>
                <h4 className="">Connected Users</h4>

                    <div style={{display:'flex'}}>
                        <img width="59px" src="" alt="user image" />
                        <span>
                            <p style={{marginBottom:'0'}}><strong>bilal </strong></p>
                            <p>from: karachi</p>
                        </span>
                        <span style={{background:'red', height:'30px', width:'30px',textAlign:'center', borderRadius:'50%', color:'#fff' }}> 1 </span>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
      )

}

export default DSChatBox