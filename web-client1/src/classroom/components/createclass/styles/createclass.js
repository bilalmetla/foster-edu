import styled from 'styled-components';

export const Inner = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`;
export const Title = styled.h2`
font-weight: 700;
font-size: 28px;
text-align: center;

@media(max-width: 600px){
    font-size: 18px;
}

`;
export const Label = styled.label`
font-size: 16px;
margin-bottom:1px;
margin-top: 10px;

@media(max-width: 600px){
    font-size: 12px;
}
`;

export const Name = styled.input`
font-size: 36px;
border: 0px;
border-bottom: thick solid #bdc3c7;
margin-bottom: 10px;
outline: none;
font-size: 28px;
font-height: 20px;

&:focus {
    border: 0px;
    border-bottom: thick solid #e74c3c;
}

@media(max-width: 600px){
    font-size: 24px;
}


`;

export const Button = styled.button`
 font-weight: 700;
font-size: 28px;
max-width: 300px;
align-self: center;
margin: 10px;
background: #e74c3c;
color: #fff;
border-radius: 15%;
letter-spacing: 2px;
transition: .2s all ease-in-out;
outline: none;
padding: 5px 25px;


  &:hover {
    background: rgba(0,0,0,1);
    color: #fff;
  }
    

@media (max-width: 600px){
    font-size: 24px;
}
`;