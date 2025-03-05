import styled from "styled-components";
import { Link } from 'react-router-dom'

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_800};
    display: grid;
    grid-template-rows: 105px auto;
    grid-template-areas: 
    "header"
    "content";


    > main {
        grid-area: content;
        overflow-y: scroll;
        padding: 64px 0;
         
    }
    ;
`;

export const Links = styled.ul`
    list-style: none;

    > li {
        margin-top: 12px;

        a {
            color: ${({theme}) => theme.COLORS.WHITE};
        }
    }
     
`

export const Content = styled.div`
    max-width: 550px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;

    > button:first-child{
        align-self: end;
        color: #e40c17;
    }

    > h1 {
        font-size: 36px;
        font-weight: 500;
        padding-top: 64px;
        margin-bottom: 16px;
    }

    > p {
        font-size: 16px;
        margin-bottom: 14px;
        text-align: justify;
    }


`

export const NewNote = styled(Link)`

     background: ${({theme}) => theme.COLORS.ORANGE};
     border: none;
     
     color: ${({theme}) => theme.COLORS.BACKGROUND_900};

     display: flex;
     align-items: center;
     justify-content: center;

     height: 48px;
     border-radius: 8px 8px 0 0;

     svg {
        margin-right: 8px;
     }
`;