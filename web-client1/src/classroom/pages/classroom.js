import React, {  } from "react";
import FloatingButton from "../components/floatingbutton";
import { Routes } from "../../constants/routes";



export default function ClassRoomPage (){
    return <>
    hello class room
    <FloatingButton className="create-class-button">
        <FloatingButton.Link 
        href={Routes.createClass}
        tooltip="Create Class"
        icon="fa fa-sticky-note"
        >
        </FloatingButton.Link>

        <FloatingButton.Link 
        href={Routes.joinClass}
        tooltip="Join Class"
        icon="fa fa-user-plus"
        >
        </FloatingButton.Link>

        <FloatingButton.Button
        tooltip="Class Room Action!"
        icon="fa fa-plus"
        rotate={true}
        > 
        </FloatingButton.Button> 
    </FloatingButton>
    </>
}