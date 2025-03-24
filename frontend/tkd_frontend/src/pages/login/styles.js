import styled from "styled-components";

import tkd_guy from "../../assets/Wallpaper2.jpg"

export const Container = styled.div`
background-color: ${({theme}) => theme.COLORS.LIGHT_LIGHT_200};
height: 100vh;
width: 100%;
color: white;
`

export const Main = styled.main`
display: flex;
flex-direction: row;
justify-content: center;
align-content: center;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 4rem 8rem;
    background-color: ${({theme}) => theme.COLORS.GREEN_LIGHT_400};
    justify-content: center;
    > h1 {
    font-size: 3.8rem;
    text-align: center;
    font-weight: bold;
    margin: 0 auto;
    margin-bottom: 0;
    color: ${({theme}) => theme.COLORS.YELLOW_LIGHT};
    }
    > p {
        margin: 0 auto;
        margin-bottom: 5rem;
        width: 40rem;
        text-align: center;
        color: ${({theme}) => theme.COLORS.LIGHT_LIGHT_200};
    }


    > fieldset {
        border: none;
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 15rem;

        > legend {
            margin: 0 auto;
            font-size: 24px;
            font-weight: 500;
            margin-bottom: 2rem;

        }
        > div input{

            width: 100%;
        }
        > button {
            height: 6rem
        }

        > a {
            font-style: normal;
            color: white;
            text-decoration: none;
            margin: 0 auto;

    }}
    
`

export const Wallpaper = styled.div`
    background-image: url(${tkd_guy}) ;
    width: 100%;
    background-size: cover;

    background-repeat: no-repeat;
    margin: 0 auto;
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

