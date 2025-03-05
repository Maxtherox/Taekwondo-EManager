import styled from "styled-components";

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
    padding: 48px;
    gap: 16px;

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

export const BeltIndicator = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ theme }) => theme.COLORS.GRAY_500}; // Cor padrão
    flex-shrink: 0;
`;
