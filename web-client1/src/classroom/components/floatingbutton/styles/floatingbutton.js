
import styled from 'styled-components';

export const Inner = styled.div`
position:fixed;
	width:60px;
	height:60px;
	bottom:40px;
	right:40px;
	background-color:#e74c3c;
    color:#FFF;
	border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px #999;
`
export const Text = styled.p``;
export const Icon = styled.i``;
export const Item = styled.i``;
export const ActionMenu = styled.div`
visibility: hidden;
            transform: translateY(65px);
            opacity: 0;
            max-height: 0;
            overflow: hidden;

            transition: all 300ms linear;
`;