
import React, {useState, useEffect, useRef} from "react";
import io from "socket.io-client";

export default function Socket () {

    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});
    const socket = useRef();

    useEffect(() => {
  
        let userId = localStorage.getItem('userId')
           if(!userId){
             return
           }
        socket.current = io.connect("http://127.0.0.1:8000");
       
        //window.currentSocket = socket.current;
        socket.current.on('connect', () => {
            socket.current.emit('session', {userId})
            window.currentSocket = socket.current;
            //localStorage.setItem('currentSocket', JSON.stringify(socket.current))
           // console.log(socket.current)
        })
    
        socket.current.on('connect_error', function(error) {
          console.log("connect_error to WS server", error);
        
        });
       
        socket.current.on('disconnect', function() {
          console.log('Client disconnected.');
        });
    
        //console.log('socket.current ', socket.current)
    
        socket.current.on("yourID", (id) => {
          console.log('received userid: ', id)
          setYourID(id);
          localStorage.setItem('socketId', id)
        })
        socket.current.on("allUsers", (users) => {
          setUsers(users);
        })
    
        // socket.current.on("hey", (data) => {
        //   setReceivingCall(true);
        //   ringtoneSound.play();
        //   setCaller(data.from);
        //   setCallerSignal(data.signal);
        // })
      }, []);

      return (<div></div>)
}