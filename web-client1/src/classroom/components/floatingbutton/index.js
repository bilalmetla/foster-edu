
import React, {  } from "react";
import { Inner, Text, Icon, Item, ActionMenu } from "./styles/floatingbutton";
import { Container, Button, Link } from 'react-floating-action-button'
import { Routes } from "../../constants/routes";

export default function FloatingButton (){
    return (
        <Container>
            <Link href={Routes.createClass}
                tooltip="Create Class"
                icon="fa fa-sticky-note" />

            <Link href={Routes.joinClass}
                tooltip="Join Class"
                icon="fa fa-user-plus" />
               
            <Button
                tooltip="Class Room Action!"
                icon="fa fa-plus"
                rotate={true}
                
                 />
        </Container>
    )
}

// export default function FloatingButton ({children, ...restProps}){
//     return ( <Inner {...restProps}>
//             {children}
//             </Inner>
//             )
// }

// FloatingButton.Text = function ({children, ...restProps}){
//     return <Text {...restProps} > {children}</Text>
// }

// FloatingButton.Icon = function ({children, ...restProps}){
//     return <Icon {...restProps} > {children}</Icon>
// }

// FloatingButton.Item = function ({children, ...restProps}){
//     return <Item {...restProps} > {children}</Item>
// }