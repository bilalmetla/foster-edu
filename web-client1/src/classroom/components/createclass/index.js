

import {Inner, Title, Name, Label } from "./styles/createclass";

export default function CreateClass ({children, ...restProps}){
    return (
        <Inner {...restProps} >
                {children}
            </Inner>
    )
}

CreateClass.Title = function ({children, ...restProps}){
    return <Title>{children}</Title>
}

CreateClass.Label = function ({children, ...restProps}){
    return <Label>{children}</Label>
}

CreateClass.Name = function ({children, ...restProps}){
    return <Name>{children}</Name>
}
