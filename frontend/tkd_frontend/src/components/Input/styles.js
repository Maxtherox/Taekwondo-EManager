import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    background-color: ${({theme}) => theme.COLORS.LIGHT_LIGHT_200};
    color: ${({theme}) => theme.COLORS.LIGHT_LIGHT_500};
    border-radius: 8px;
    margin-bottom: 3.2rem;
    margin-top: 0.5rem;
    
    > svg {
            margin: 12px;
            margin-right: -2px;
        }
    > input {
        box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.1);
        height: 5.8rem;
        border-radius: 8px;
        max-width: 100%;
        padding: 1.6rem 1.4rem;
        width: 100%;
        font-size: 1.6rem;
        background-color: ${({theme}) => theme.COLORS.LIGHT_LIGHT_200};
        background: transparent;
        border: 0;
        color: ${({theme}) => theme.COLORS.LIGHT_LIGHT_500};
    }

`