import React, { useEffect, useState, useRef, Suspense } from 'react';
import io from "socket.io-client";
import './index.css';
import Peer from "simple-peer";
import Rodal from 'rodal'
import {Howl} from 'howler'

import Navigation from './Components/Navigation/Navigation'
import Footer from './Components/Footer/Footer'
import { constants } from "../constants";
import  'rodal/lib/rodal.css'

import camera from './Icons/camera.svg'
import { ReactComponent as YourSvg } from './Icons/camera.svg'
import camerastop from './Icons/camera-stop.svg'
import microphone from './Icons/microphone.svg'
import microphonestop from './Icons/microphone-stop.svg'
import share from './Icons/share.svg'
import hangup from './Icons/hang-up.svg'
import fullscreen from './Icons/fullscreen.svg'
import minimize from './Icons/minimize.svg'
import ringtone from './Sounds/ringtone.mp3'

const Watermark = React.lazy(()=>import('./Components/Watermark/Watermark'))
const ringtoneSound = new Howl({
  src: [ringtone],
  loop: true,
  preload: true
})




function WebrtcApp(props) {
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callingFriend, setCallingFriend] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callRejected, setCallRejected] = useState(false);
  const [receiverID, setReceiverID] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [audioMuted, setAudioMuted] = useState(false)
  const [videoMuted, setVideoMuted] = useState(false)
  const [isfullscreen, setFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [linkcopied, setLinkCopied] = useState(false)
  const [callingLink, setcallingLink] = useState('')
  const [disableusernameinputfield, setdisableusernameinputfield] = useState(false);
  
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();
  const myPeer=useRef();

  let landingHTML=<>
    {/* <Navigation/> */}
    <main style={{opasity:'100'}}>
      <div className="u-margin-top-xxlarge u-margin-bottom-xxlarge">
    <div className="o-wrapper-l">
        <div className="hero flex flex-column">
            <div>
                {/* <div className="welcomeText">
                    Welcome To Online Session
                </div> */}
                <div className="descriptionText">
                    Start your session here.
                </div>
            </div>
            <div>
                <div className="actionText">Share your id: 
                 <span className={copied?"username highlight copied":"username highlight"} onClick={()=>{showCopiedMessage()}}>{yourID}</span> ?  OR</div>
            </div>

            <div>
                <div className="actionText">Share your call link: 
                 <span className={linkcopied?"username highlight copied":"username highlight"} onClick={()=>{showLinkCopiedMessage()}}>{callingLink}</span> ?</div>
            </div>


            <div className="callBox flex">
                <input type="text"  placeholder="Call Reveiver ID" value={receiverID} onChange={e => setReceiverID(e.target.value)} className="form-input"/>
                {/* {yourID === receiverID ?
                  <button onClick={() => {} } className="primaryButton">Join</button>
                  :
                  <button onClick={() => callPeer(receiverID.toLowerCase().trim())} className="primaryButton">Call</button>  
                } */}
                <button onClick={() => callPeer(receiverID.toLowerCase().trim())} className="primaryButton">Call</button>  

                {/* <button onClick={() => callPeer(receiverID.toLowerCase().trim())} className="primaryButton">Call</button> */}
            </div>
            {receiverID &&
            
            <div>
                <div className="actionText">Call receiver id: 
                 <span className="username highlight" >{receiverID}</span></div>
            </div>
            }
            {/* <div>
                To call your friend, ask them to open it in their browser. <br/>
                Send your username (<span className="username">{yourID}</span>) and wait for their call <span style={{fontWeight: 600}}>OR</span> enter their username and hit call!
            </div> */}
        </div>
    </div>
    </div>
    </main>
    {/* <Footer/> */}
  </>


  useEffect(() => {
    const DetectRTC = window.DetectRTC
    if (DetectRTC && DetectRTC.isWebRTCSupported === false) {
      alert('Please use Chrome or Firefox.');
    }

  //   if (DetectRTC && DetectRTC.hasWebcam === false) {
  //     alert('Please install an external webcam device.');
  // }
  
  if (DetectRTC && DetectRTC.hasMicrophone === false &&
     DetectRTC.isAudioContextSupported === false) {
      alert('Please install an external microphone device.'+ DetectRTC.hasMicrophone);
  }
  
  // if (DetectRTC && DetectRTC.hasSpeakers === false &&
  //    (DetectRTC.browser.name === 'Chrome' || DetectRTC.browser.name === 'Edge')) {
  //     alert('Oops, your system can not play audios.'+ DetectRTC.hasSpeakers);
  // }
 
 if(DetectRTC)
  DetectRTC.DetectLocalIPAddress(function(ipsList){
    console.log(ipsList)
  })
  // console.log('isMobileDevice',DetectRTC.isMobileDevice)
  // console.log('DetectRTC.audioInputDevices',DetectRTC.audioInputDevices)
  // console.log('DetectRTC.audioOutputDevices',DetectRTC.audioOutputDevices)
  // console.log('DetectRTC.videoInputDevices',DetectRTC.videoInputDevices)
  // console.log('DetectRTC.osName',DetectRTC.osName)
  // console.log('DetectRTC.osVersion',DetectRTC.osVersion)
  // console.log('DetectRTC.browser',DetectRTC.browser)

  
  //console.log('obj',DetectRTC.load(function(data){console.log(data)}))

    if(props && props.match && props.match.params){
      setReceiverID(props.match.params.receiverId)
      
      setdisableusernameinputfield(true)
    }
    
    let instance = constants.signalling_server()
   
    socket.current = io.connect(instance);
   
    socket.current.on('connect', () => {
      let userId = localStorage.getItem('userId')
      //if(userId){
        socket.current.emit('session', {userId})
        window.currentSocket = socket.current;
      //}
      
     
  })
    socket.current.on('connect_error', function(error) {
      console.log("connect_error to WS server", error);
    
    });
   
    socket.current.on('disconnect', function() {
      console.log('Client disconnected.');
      socket.current.emit('remove-disconnected', {userId : yourID})
    });

    //console.log('socket.current ', socket.current)

    socket.current.on("yourID", (id) => {
      console.log('received yourID: ', id)
      setYourID(id);
      setcallingLink(`${window.location.origin}/calling-route/${id}`)
     
    })
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    })

    socket.current.on("hey", (data) => {
      console.log('socket.current on hey', data)
      setReceivingCall(true);
      ringtoneSound.play();
      setCaller(data.from);
      setCallerSignal(data.signal);
    })


  }, []);

  function callPeer(id) {
    console.log('callPeer id: ', id)
    console.log('caller id: ', yourID)
    //if(id!=='' && users[id] && id!==yourID){
    if(id && id !== yourID ){
     
      navigator
      .mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        setStream(stream);
        setCallingFriend(true)
        setCaller(id)
        console.log('userVideo: ',userVideo)
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
        const peer = new Peer({
          initiator: true,
          trickle: false,
          config: {
    
            iceServers: [
                {
                    urls: "stun:numb.viagenie.ca",
                    username: "sultan1640@gmail.com",
                    credential: "98376683"
                },
                {
                    urls: "turn:numb.viagenie.ca",
                    username: "sultan1640@gmail.com",
                    credential: "98376683"
                }
            ]
        },
          stream: stream,
        });

        myPeer.current=peer;
    
        peer.on("signal", data => {
          socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
        })
    
        peer.on("stream", stream => {
          console.log('peer.on stream', stream)
          if (partnerVideo.current) {
            partnerVideo.current.srcObject = stream;
          }
        });

        peer.on('error', (err)=>{
          console.log(err)
          endCall()
        })
    
        socket.current.on("callAccepted", signal => {
          console.log('socket.current.on callAccepted', signal)
          setCallAccepted(true);
          peer.signal(signal);
        })

        socket.current.on('close', ()=>{
          console.log('socket closed')
         // window.location.reload()
          window.location.href = '/'
        })
  
        socket.current.on('rejected', ()=>{
          console.log('socket rejected')
          //window.location.reload()
          window.location.href = '/'
        })
      })
      .catch((error)=>{
        console.log('error', error)
        setModalMessage('You cannot place/ receive a call without granting video and audio permissions! Please change your settings to use.')
        setModalVisible(true)
      })
    } else {
      setModalMessage('We think the username entered is wrong. Please check again and retry!')
      setModalVisible(true)
      return
    }
  }

  function acceptCall() {
    ringtoneSound.unload();
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
      setCallAccepted(true);
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream,
      });

      myPeer.current=peer

      peer.on("signal", data => {
        console.log('peer.on signal ', data)
        socket.current.emit("acceptCall", { signal: data, to: caller })
      })

      peer.on("stream", stream => {
        console.log('peer.on stream | partnerVideo.current.srcObject', stream)
        partnerVideo.current.srcObject = stream;
      });

      peer.on('error', (err)=>{
        console.log('peer.on error ', err)
        endCall()
      })

      peer.signal(callerSignal);

      socket.current.on('close', ()=>{
        console.log('socket closed')
       // window.location.reload()
       
       setModalMessage('Your call connection is closed!')
        setModalVisible(true)
        window.location.href = '/'
      })
    })
    .catch(()=>{
      setModalMessage('You cannot place/ receive a call without granting video and audio permissions! Please change your settings.')
      setModalVisible(true)
    })
  }

  function rejectCall(){
    ringtoneSound.unload();
    setCallRejected(true)
    socket.current.emit('rejected', {to:caller})
    //window.location.reload()
    window.location.href = '/'
   //setModalMessage('Your call is rejected!')
    //setModalVisible(true)
  }

  function endCall(){
    console.log('call ending..')
    myPeer.current.destroy()
    socket.current.emit('close',{to:caller})
    window.location.reload()
   // window.location.href = '/'
   //setModalMessage('Your call is ended!')
    //setModalVisible(true)
  }

  function shareScreen(){
    navigator.mediaDevices.getDisplayMedia({cursor:true})
    .then(screenStream=>{
      myPeer.current.replaceTrack(stream.getVideoTracks()[0],screenStream.getVideoTracks()[0],stream)
      userVideo.current.srcObject=screenStream
      screenStream.getTracks()[0].onended = () =>{
      myPeer.current.replaceTrack(screenStream.getVideoTracks()[0],stream.getVideoTracks()[0],stream)
      userVideo.current.srcObject=stream
      }
    })
  }

  function toggleMuteAudio(){
    if(stream){
      setAudioMuted(!audioMuted)
      stream.getAudioTracks()[0].enabled = audioMuted
    }
  }

  function toggleMuteVideo(){
    if(stream){
      setVideoMuted(!videoMuted)
      stream.getVideoTracks()[0].enabled = videoMuted
    }
  }

  function renderLanding() {
    if(!callRejected && !callAccepted && !callingFriend)
      return 'block'
    return 'none'
  }

  function renderCall() {
    if(!callRejected && !callAccepted && !callingFriend)
      return 'none'
    return 'block'
  }

  function isMobileDevice() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  function showCopiedMessage(){
    navigator.clipboard.writeText(yourID)
    setCopied(true)
    setInterval(()=>{
      setCopied(false)
    },1000)
  }

  function showLinkCopiedMessage(){
    navigator.clipboard.writeText(callingLink)
    setLinkCopied(true)
    setInterval(()=>{
      setLinkCopied(false)
    },1000)
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <video className="userVideo" playsInline muted ref={userVideo} autoPlay />
    );
  }

  let PartnerVideo;
  if (callAccepted && isfullscreen) {
    PartnerVideo = (
      <video className="partnerVideo cover" playsInline ref={partnerVideo} autoPlay />
    );
  } else if (callAccepted && !isfullscreen){
    PartnerVideo = (
      <video className="partnerVideo" playsInline ref={partnerVideo} autoPlay />
    );
  }

  let incomingCall;
  if (receivingCall && !callAccepted && !callRejected) {
    incomingCall = (
      <div className="incomingCallContainer">
        <div className="incomingCall flex flex-column">
          <div><span className="callerID">{caller}</span> is calling you!</div>
          <div className="incomingCallButtons flex">
          <button name="accept" className="alertButtonPrimary" onClick={()=>acceptCall()}>Accept</button>
          <button name="reject" className="alertButtonSecondary" onClick={()=>rejectCall()}>Reject</button>
          </div>
        </div>
      </div>
    )
  }

  let audioControl;
  if(audioMuted){
    audioControl=<span className="iconContainer" onClick={()=>toggleMuteAudio()}>
      {/* <img src={microphonestop} alt="Unmute audio"/> */}
      <button className="btn" >Unmute audio</button>

    </span>
  } else {
    audioControl=<span className="iconContainer" onClick={()=>toggleMuteAudio()}>
      {/* <img src={microphone} alt="Mute audio"/> */}
      <button className="btn" >Mute audio</button>
    </span>
  }

  let videoControl;
  if(videoMuted){
    videoControl=<span className="iconContainer" onClick={()=>toggleMuteVideo()}>
      
      {/* <img src={camera} alt="Resume video"/> */}
      <button className="btn" >Resume Video</button>
    </span>
  } else {
    videoControl=<span className="iconContainer" onClick={()=>toggleMuteVideo()}>
      {/* <img src={camera} alt="Stop audio"/> */}
      <button className="btn" >Stop Video</button>
    </span>
  }

  let screenShare=<span className="iconContainer" onClick={()=>shareScreen()}>
    {/* <img src={share} alt="Share screen"/> */}
    <button className="btn" >Share Screen</button>
  </span>
  if(isMobileDevice()){
    screenShare=<></>
  }

  let hangUp=<span className="iconContainer" onClick={()=>endCall()}>
    {/* <img src={hangup} alt="End call"/> */}
    <button className="btn" >End Call</button>
  </span>

  let fullscreenButton;  
  if(isfullscreen){
    fullscreenButton=<span className="iconContainer" onClick={()=>{setFullscreen(false)}}>
      {/* <img src={minimize} alt="fullscreen"/> */}
      <button className="btn" >minimize</button>

    </span>
  } else {
    fullscreenButton=<span className="iconContainer" onClick={()=>{setFullscreen(true)}}>
      {/* <img src={fullscreen} alt="fullscreen"/> */}
      <button className="btn" >Full Screen</button>
    </span>
  }

  return (
    <>
      <div style={{display: renderLanding()}}>
        {landingHTML}
        <Rodal 
          visible={modalVisible} 
          onClose={()=>setModalVisible(false)} 
          width={20} 
          height={5} 
          measure={'em'}
          closeOnEsc={true}
        >
          <div>{modalMessage}</div>
        </Rodal>
        {incomingCall}
      </div>
      <div className="callContainer" style={{display: renderCall()}}>
        <Suspense fallback={<div>Loading...</div>}>
          <Watermark />
        </Suspense>
        <div className="partnerVideoContainer">
          {PartnerVideo}
        </div>
        <div className="userVideoContainer">
          {UserVideo}
        </div>
        <div className="controlsContainer flex">
          {audioControl}
          {videoControl}
          {screenShare}
          {fullscreenButton}
          {hangUp}
        </div>
      </div>
    </>
  )
}

export default WebrtcApp;