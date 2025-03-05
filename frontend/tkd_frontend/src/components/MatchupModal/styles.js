import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.COLORS.ORANGE};
  padding: 30px 150px;
  border-radius: 10px;
  width: 90%;
  max-width: 1000px;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  position: relative;


  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: ${({ theme }) => theme.COLORS.LIGHT_LIGHT_100};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.COLORS.LIGHT_LIGHT_100};
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.COLORS.PRIMARY};
  }
`;

export const MatchupCard = styled.div`
  background-color: ${({theme}) => theme.COLORS.BACKGROUND_800};
  margin-bottom: 40px;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 1px 1px 1px rgba(43, 87, 68, 0.836);
  border-top: 20px solid #08573d;

  > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    > img {
    height: 100px;
  }
    > h4 {
    font-size: 72px;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }

  }
  
  hr {
    border: none;
    height: 1px;
    background: ${({ theme }) => theme.COLORS.LIGHT_LIGHT_700};
    margin: 10px 0;
  }
`;

export const MatchupHeader = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.COLORS.ORANGE};
  text-transform: uppercase;
  border-bottom: 2px solid ${({ theme }) => theme.COLORS.ORANGE};
  padding-bottom: 5px;
`;

export const CompetitorInfo = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.LIGHT_LIGHT_700};
  max-width: 200px;
  margin-bottom: 20px;
  text-align: center;
  > p {
    margin-bottom: 10px;
    text-align: center;
  }
  strong {
    color: ${({ theme }) => theme.COLORS.PRIMARY};
    margin-bottom: 10px;
  }

  em {
    color: ${({ theme }) => theme.COLORS.SECONDARY};
  }
`;

export const Matchupbox = styled.div`
  display: flex;
`
