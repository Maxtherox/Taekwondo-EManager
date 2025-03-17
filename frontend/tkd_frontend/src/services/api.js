import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3333",
    //local environment
    //baseURL: "https://",
    withCredentials: true,
})