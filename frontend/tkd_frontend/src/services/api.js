import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3334",
    //local environment
    //baseURL: "https://",
    withCredentials: true,
})