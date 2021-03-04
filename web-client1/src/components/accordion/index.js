
import React, {createContext, useContext, useState} from "react";
import { Body, Title, Header, Container, Inner, Item } from './styles/accordion';

const ToggleContext = createContext();

export default function Accordion ({children, ...restProps}){
  

    return (
        <Container {...restProps}>
            <Inner>
                {children}
            </Inner>
        </Container>
    )
}

Accordion.Title = function AccordionTitle({children, ...restProps}){
    return <Title {...restProps}>{children} </Title>
}

Accordion.Header = function AccordionHeader({children, ...restProps}){
    const {toggleShow, settoggleShow } = useContext(ToggleContext);
    return (
            <Header onClick={()=> settoggleShow(!toggleShow) } {...restProps}>
            {children} 
            {toggleShow ? 
            <img src="images/icons/close.png" />    
            :
            <img src="images/icons/plus.png" />    
        }
            </Header>
        )
        
}

Accordion.Body = function AccordionBody({children, ...restProps}){
     const {toggleShow } = useContext(ToggleContext);
    return  toggleShow ? <Body {...restProps}>{children} </Body> : null
}

Accordion.Item = function AccordionItem({children, ...restProps}){
    const [toggleShow, settoggleShow] = useState(false);

    return <ToggleContext.Provider value={{toggleShow, settoggleShow}}>
    
            <Item {...restProps}>{children} </Item>
        </ToggleContext.Provider>
}