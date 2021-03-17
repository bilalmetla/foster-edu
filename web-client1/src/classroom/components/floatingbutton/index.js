
import React, {  } from "react";
import { Inner, Text, Icon, Item, ActionMenu } from "./styles/floatingbutton";
import { Container, Button, Link } from 'react-floating-action-button'
import { Routes } from "../../constants/routes";

export default function FloatingButton ({children, ...restProps}){
    return (
        <Container {...restProps}> {children} </Container>
    )
}

FloatingButton.Link = function FloatingButtonLink({ children, ...restProps}){
    return <Link {...restProps} >{children}</Link>
}

FloatingButton.Button = function FloatingButtonButton({ children, ...restProps}){
    return <Button {...restProps} >{children}</Button>
}