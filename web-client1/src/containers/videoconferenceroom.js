import React, {useEffect, useState, useRef} from "react";

import { Room } from "../components";
import io from "socket.io-client";
import Peer from "simple-peer";
import { constants } from "../constants";



export default function VideoConferenceRoom({...restProps}){

    const [localStream, setlocalStream] = useState({});
    const socket = useRef();


    useEffect(() => {
        let instance = constants.signalling_server()
   
        socket.current = io.connect(instance);
        socket.current.on('connect', () => {
            let userId = localStorage.getItem('userId')
            socket.current.emit('session', {userId})
            //window.currentSocket = socket.current;
            
        
        })

        socket.current.on("yourID", (id) => {
            console.log('room id: ', id)
            //setYourID(id);
           // setcallingLink(`${window.location.origin}/calling-route/${id}`)
           socket.current.emit('join-room', {userId: id})
           
          })
          socket.current.on('user-connected', (userId)=>{
              console.log('user-connected: ', userId)
          })
          
          navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        })
        .then(stream =>{
           // setlocalStream(window.URL.createObjectURL(stream) )
           var video = document.getElementById("myVideo");

            video.srcObject = stream;
            video.onloadedmetadata = function(e) {
                video.play();
                video.muted = true;
            };
        })
        .catch()

        const peer = new Peer()

        peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
          });

          
    })
   
    return <Room {...restProps}> 
    <Room.MyVideo></Room.MyVideo>
    </Room>
}