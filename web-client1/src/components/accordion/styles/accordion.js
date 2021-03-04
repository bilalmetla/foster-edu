import styled from 'styled-components';

export const Container = styled.section`
display: flex;
// border-bottom: 8px solid #222;
margin-bottom: 25px;

`;

export const Inner = styled.div`
display: flex;
// padding: 70px 45px;
flex-direction: column;
// max-witdth: 815px
width: 100%;
margin: auto;
`;

export const Item = styled.div`
margin-bottom:10px;
&:first-of-type {
    margin-top: 3em;
}
`;

export const Title = styled.h1`

@media (max-width: 600px) {
    font-size: 35px;
}
`;

export const Header = styled.div`
display: flex;
justify:content: center;

cursor: pointer;
margin-bottom: 1px;
// font-size: 26px;
// font-weight: normal;
background: #e74c3c;
color: #fff;
padding: 0.8em 1.2em;
user-select: none;
align-items: center;
// width: 1020px;
width: 100%;

img {
    width:25px;
    height:25px;
    font-size: 24px;
    filter: brightness(0) invert(1);
    position: absolute;
    right: 0px;
    left:90%;
    @media (max-width: 600px){
        font-size: 16px;
        width:16px;
        height:16px;
    }
}
@media (max-width: 600px){
    font-size: 16px;
    width: 100%;
}


`;

export const Body = styled.div`
// font-size: 26px;
// font-weight: normal;
// line-height: normal;
padding: 0.8em 1.2em;
user-select: none;
align-items: center;
// width: 1020px;
width: 100%;
text-align:left;
@media (max-width: 600px){
    font-size: 16px;
    line-height: 22px;
    width: 100%;
}
`;