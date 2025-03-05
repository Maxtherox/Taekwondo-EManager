import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/login";
import {SignIn} from "../pages/signup"


export function AuthRoutes(){
    const user = localStorage.getItem("@foodexplorer:user");
    return(
        <Routes>
            <Route  path="/" element={<Login/>}/>
            <Route  path="/signin" element={<SignIn/>}/>

            {!user && <Route path="*" element={<Navigate to ="/"/>}/>}
        </Routes>
    )
}