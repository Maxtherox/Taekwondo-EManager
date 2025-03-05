import styled from "styled-components";

export const Container = styled.div `
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-rows: 105px auto;
    grid-template-areas: 
    "header"
    "content";
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_800};
    > main {
        grid-area: content;
        overflow-y: auto;
       
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        justify-content: space-between;
    }
`

export const Form = styled.form `
    max-width: 550px;
    margin: 38px auto;

    
    > section input{
        background-color: ${({theme}) => theme.COLORS.LIGHT_LIGHT_400};
        width: 100%;
        border-radius: 8PX;
    }
    > button { 
        background-color:${({theme}) => theme.COLORS.ORANGE};
        color: ${({theme}) => theme.COLORS.YELLOW_LIGHT};
    }
    > header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 36px;
        > h1 {
        color:${({theme}) => theme.COLORS.ORANGE};
    }
        button {
           
            font-size: 20px;
            color: ${({theme}) => theme.COLORS.GRAY_100};
        }
    }
`