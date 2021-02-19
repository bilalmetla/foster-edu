import React, {useState, useEffect} from "react";
import {
    Link
  } from "react-router-dom";
import { Container, Row, Col,Form, Button, Table, InputGroup, FormControl } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {  getMessages, getConnectedUsers } from "../services"
import Spinner from '../components/common/Spinner';
import { NotificationManager } from 'react-notifications';



function DSChatBox  (props){
    
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setValue, errors, } = useForm();
    const [chatWith, setchatWith] = useState(props.match.params.to ? props.match.params.to : '' );
   const [messagesList, setmessagesList] = useState([]);
   const [message, setmessage] = useState('');
    let userId = localStorage.getItem('userId')
    let userImage = localStorage.getItem('userImage')
   //const socket =  localStorage.getItem('currentSocket')
   //console.log('local storage socket', socket)
   //socket = JSON.parse(socket)
   //console.log('local storage socket', socket)
    // if(props.match && props.match.params){
    //     console.log(props.match.params)
    //     setchatWith(props.match.params.to)
    // }

    useEffect(() => {
         if(props.match && props.match.params){
           // console.log(props.match.params)
            setchatWith(props.match.params.to)
        }
        if(chatWith){
            let fromQuery = [ {and: [{to:{like : userId} }, {from:{like : chatWith} } ]},
                            { and:[{to:{like : chatWith} }, {from:{like : userId} } ]}
                            ]

            
            getMessages(fromQuery)
            .then(result=>{
               // console.log(result)
                setmessagesList(result)
              //  console.log(messagesList)
              
                
                //messagesList.concat({to:'1', from: '2', message:'hi'})
            })
            .catch(error=>{
                console.log(error)
            })
        }
       
        getConnectedUsers({id: userId})
        .then(connections => {

        })
        .catch(error=>{
            console.log(error)
        })

        setTimeout(() => {
            
            window.currentSocket.on('message', (data)=>{
                console.log('received new message..', data)
                console.log('messagesList..', messagesList)
                let newMessages = messagesList.slice()
                newMessages.push(data)
                setmessagesList(newMessages)
            })    
        }, 1000 * 5);
        
        

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
        let newMessages = []
        if(messagesList && messagesList.length > 0){
            newMessages = messagesList.slice()
        }
        
        newMessages.push(data)
        setmessagesList(newMessages)
        //console.log('messagesList', messagesList)
        window.currentSocket.emit('message', data)
       
        setmessage('')
    }

   



    return (
        <div className="" style={{width:'600px'}}>
        {isLoading && <Spinner />}
        <Container>
            <Row > 
                <Col md={{span:12, offset:2}} style={{ marginBottom:'25px', marginTop:'5%' }}>
                {/* <h2 className="section-heading"></h2> */}
                <div style={{overflowY: "auto", height:'400px'}}>
                {messagesList && messagesList.length > 0?
                messagesList.map((msg, index)=>{
                    
                    if(msg && msg.from == userId){
                       return <p key={index} className="message-from">
                       {msg.message}
                   </p>
                   

                    }
                    else if(msg){
                        return <p key={index} className="message-to">
                                         {msg.message}
                                     </p>
                 
                    }
                })
                :
                null
                }
                </div>
               
                </Col>
                {/* <Col md={{span:4, offset:0}} className="chat-box-right">
                <h4 className="">Connected Users</h4>

                    <div style={{display:'flex'}} className="chat-users">
                        <img width="59px" src="" alt="user image" />
                        <span>
                            <p style={{marginBottom:'0'}}><strong>bilal </strong></p>
                            <p>from: karachi</p>
                        </span>
                        <span style={{background:'#cc2d1c', height:'30px', width:'30px',textAlign:'center', borderRadius:'50%', color:'#fff' }}> 1 </span>
                    </div>
                </Col> */}
            </Row>


            <Row>
            <Col md={{span:12, offset:2}} style={{marginBottom:'10%' }}>

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
                       
                        <Col xs="auto" >
                        <Button onClick={handleSubmit(sendMessage)} className="mb-2 " style={{background:'#e74c3c'}}>
                            Send
                        </Button>
                        </Col>
                    </Form.Row>
                    </Form>
                </Col>
                </Row>

        </Container>
    </div>
      )

}

export default DSChatBox