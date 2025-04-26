import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-columns: 250px auto;
    grid-template-rows: 105px 128px auto 64px 64px;
    grid-template-areas:
    "brand header"
    "menu search"
    "menu content"
    "button content"
    "newnote content";

    background-color: ${({theme}) => theme.COLORS.BACKGROUND_800};

    > .botaoamarelo {
        height: 100%;
       > button  {
            border-radius: 0;
            height: 100%;
            margin: 0;
            padding: 0;
            font-weight: 500;
            font-size: 16px;
            font-family: 'roboto';
        }
    }
`;
export const Brand = styled.div`
    grid-area: brand;
    
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.1);
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_900};

    > h1 {
        font-size: 24px;
        color: ${({theme}) => theme.COLORS.ORANGE};;
    }

`;
export const Menu = styled.ul`
    grid-area: menu;
    box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.1);
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_900};
    padding-top: 64px ;
    text-align: center;

    > li {
        margin-bottom: 24px;
    }
`;
export const Search = styled.div`
     grid-area: search;
    
     padding: 32px 64px 0; 
     
     > div  {
        box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.1);
        width: 100%;
        border-radius: 8px;
      background-color: ${({theme}) => theme.COLORS.LIGHT_LIGHT_400};  
     }
     

`;
export const Content = styled.div`
     grid-area: content;
     padding: 0 64px ; 
     overflow-y: auto;
     
     > section:nth-child(2){
        > div {

            width: 100%;

            > button {
                min-width: 200px;

            }
        }        
     }

     > section:nth-child(4){
        > div {
            flex-direction: column;
          
            > article {
                > h3 {
                font-size: 25px;
            }
            }
        }
        }

`;
export const NewNote = styled(Link)`
     grid-area: newnote;

     background: ${({theme}) => theme.COLORS.ORANGE};
     border: none;
     
     color: ${({theme}) => theme.COLORS.BACKGROUND_900};

     display: flex;
     align-items: center;
     justify-content: center;

     svg {
        margin-right: 8px;
     }
`;