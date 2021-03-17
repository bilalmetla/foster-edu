

import {Inner, Title, Name, Label, Button } from "./styles/createclass";

export default function CreateClass ({children, ...restProps}){
    return (
        <Inner {...restProps} >
                {children}
            </Inner>
    )
}

CreateClass.Title = function CreateClassTitle({children, ...restProps}){
    return <Title {...restProps} >{children}</Title>
}

CreateClass.Label = function CreateClassLabel({children, ...restProps}){
    return <Label {...restProps} >{children}</Label>
}

CreateClass.Name = function CreateClassName ({children, ...restProps}){
    return <Name {...restProps} >{children}</Name>
}

CreateClass.Button = function CreateClassButton ({children, ...restProps}){
    return <Button {...restProps} >{children}</Button>
}
