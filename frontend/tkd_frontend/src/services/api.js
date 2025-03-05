import axios from "axios";

export const api = axios.create({
    baseURL: "https://taekwondo-emanager.onrender.com", //local environment
    //baseURL: "https://",
    withCredentials: true,
})