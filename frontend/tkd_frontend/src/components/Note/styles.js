import styled from "styled-components";

export const Container = styled.button`
    height: 150px;
    width: 450px;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
 
    display: flex;
    flex-direction: row;
    gap: 28px;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 10px;
    color: ${({theme}) => theme.COLORS.LIGHT_LIGHT_800};
    padding: 30px 50px;
    margin-bottom: 16px;

    box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.1);

    border-top: 3px solid green;

    > h2 {

        width: 50%;
        text-align: center;
        font-weight: 700;
        font-size: 16px;
        color: ${({theme}) => theme.COLORS.ORANGE};

    }

    > p {
        width: 100%;

    }

    > footer {
        width: 100%;
        display: flex;
        margin-top: 24px;
        
    }
` 