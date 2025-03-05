import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Details } from "../pages/Details";
import { NotFound } from '../pages/NotFound';
import { CartPage } from "../pages/Cart";


export function CustomerRoutes(){
    return(
        <Routes>
            <Route  path="/" element={<Home />}/>
            <Route  path="/cart" element={<CartPage />}/>
            <Route  path="/details/:id" element={<Details />}/>

            <Route path="*" exact={true} element={<NotFound />} />
        </Routes>
    )
}