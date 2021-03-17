import React, {useEffect, useState, useRef, useContext, createContext} from "react";

import { Inner, VideoGrid, MyVideo } from "./style/room";
import { Container, Row, Col } from 'react-bootstrap';





export default function Room ({children, ...restProps}){


    return <Container {...restProps}> 
    <VideoGrid>  {children}
        </VideoGrid>
      
        </Container>
}

Room.MyVideo = function RoomMyVideo({children, ...restProps}){
  
    return <MyVideo id="myVideo" >
            </MyVideo>
}