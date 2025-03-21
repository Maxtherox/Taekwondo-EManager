import styled from "styled-components";

export const Container = styled.button`
    width: 100%;
    //background-color: ${({theme}) => theme.COLORS.GREEN_LIGHT_400};
    background-color: ${({theme}) => theme.COLORS.YELLOW_LIGHT};
    //color: ${({theme}) => theme.COLORS.LIGHT_LIGHT_100};
    color: ${({theme}) => theme.COLORS.GREEN_LIGHT_400};

    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.4rem;
    
    height: 4.8rem;
    border: 0;
    padding: 1.2rem 0;
    margin-bottom: 3.2rem;

    border-radius: 5px;


    &:disabled{
        opacity: 0.5;
    }

`