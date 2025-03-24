import styled, { css } from "styled-components";

export const Container = styled.button`
    width: 200px;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
    height: 280px;
    border: none;
    border-radius: 10px;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.COLORS.LIGHT_LIGHT_800};
    box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.1);
    border-top: 3px solid green;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    gap: 16px;
    transition: transform 0.3s ease-in-out;
    transform-style: preserve-3d;
    position: relative;

    ${({ $ishovered }) => // Usando $ishovered aqui
        $ishovered &&
        css`
            transform: rotateY(-180deg) scale(1.05);
            transition: transform 0.3s ease-in-out;
        `};
`;

export const BeltIndicator = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ theme }) => theme.COLORS.GRAY_500};
    flex-shrink: 0;
    position: absolute;
    top: 20px;
    left: 80px;
`;

export const CardFront = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px;
    gap: 16px;
    box-sizing: border-box;
    z-index: 1;
    transition: opacity 0.4s ease-in-out;
    opacity: ${({ $ishovered }) => ($ishovered ? 0 : 1)}; // Usando $ishovered aqui
    visibility: ${({ $ishovered }) => ($ishovered ? 'hidden' : 'visible')}; // Usando $ishovered aqui

    > h4 {
        text-align: left;
        font-weight: 700;
        font-size: 16px;
        color: ${({ theme }) => theme.COLORS.ORANGE};
    }

    > div {
        text-align: left;
        > p {
            font-size: 14px;
            text-align: left;
        }
    }
`;

export const CardBack = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px;
    gap: 16px;
    box-sizing: border-box;
    z-index: 2;
    transition: opacity 0.4s ease-in-out;
    opacity: ${({ $ishovered }) => ($ishovered ? 1 : 0)}; // Usando $ishovered aqui
    visibility: ${({ $ishovered }) => ($ishovered ? 'visible' : 'hidden')}; // Usando $ishovered aqui

    ${({ $ishovered }) =>
        $ishovered &&
        css`
            transition-delay: 0.1s; /* Atraso apenas ao entrar */
        `}

    > h4 {
        text-align: left;
        font-weight: 700;
        font-size: 16px;
        color: ${({ theme }) => theme.COLORS.ORANGE};
    }
    > div {
        text-align: left;
        > p {
            font-size: 14px;
            text-align: left;
        }
    }
`;