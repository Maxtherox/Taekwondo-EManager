import styled from "styled-components";

import tkd_guy from "../../assets/blackbelt.jpg"

export const Container = styled.div`
  background-color: ${({ theme }) => theme.COLORS.LIGHT_LIGHT_200};
  height: 100vh;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-content: center;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.COLORS.GREEN_LIGHT_400};
  height: 100%;

  width: 70rem;
  border: 10px solid red;
  align-items: center;
  justify-content: center;

  > h2 {
    font-size: 26px;
    font-weight: bold;
    margin: 0 auto;
    text-align: center;
    color: ${({ theme }) => theme.COLORS.YELLOW_LIGHT};
  }

  > button {
    margin: 0 auto;
    margin-top: 3rem;
    margin-bottom: 2rem;
    width: 35rem;
    height: 6rem;
  }

  > a {
    font-style: normal;
    color: white;
    text-decoration: none;
    margin: 0 auto;
  }
`;

export const Form = styled.form`
  height: 55rem;

  width: 40rem;
  overflow: auto;
  justify-content: center;

  > p {
    margin: 0 auto;
    margin-bottom: 50px;
    width: 400px;
    text-align: center;
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.LIGHT_LIGHT_200};
  }

  > fieldset {
    border: none;
    display: flex;
    flex-direction: column;
    height: 55rem;
    padding: 0 3rem;

    > select {
      border-radius: 8px;
      margin-bottom: 32px;
      margin-top: 8px;
      padding: 2rem;
      background-color: ${({ theme }) => theme.COLORS.LIGHT_LIGHT_200};
    }
    > legend {
      margin: 0 auto;
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    > div input {
      color: black;
      width: 100%;
    }
    > button {
      height: 8rem;
    }

    > a {
      font-style: normal;
      color: white;
      text-decoration: none;
      margin: 0 auto;
    }
  }


`;

export const Wallpaper = styled.div`
    background-image: url(${tkd_guy}) ;
    background-position: -160px;
    background-size: cover;
z-index: 1;
    background-repeat: no-repeat;
    margin: 0 auto;
    background-color: ${({theme}) => theme.COLORS.GREEN_LIGHT_400};
    width: 100%;
    display: flex;
`

export const WallpaperContainer = styled.div`

display: flex;
justify-content: center;
align-items: center;
width: 100%;
    > img {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 1;
        top: 1;
        width: 200px;
        margin-bottom: 60px;
        margin-right: 90px;

    }

    > div {


    }
`

