import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Details } from "../pages/Details";
import { NotFound } from '../pages/NotFound';
import { New } from "../pages/New";
import { NewCompetitor } from "../pages/NewCompetitor";
//import { CartPage } from "../pages/Cart";
/*<Route  path="/details/:id" element={<Details />}/>
            <Route path="/newproduct" element={<NewProduct />}/>
            <Route  path="/cart" element={<CartPage />}/>*/
export function AdminRoutes(){
    return(
        <Routes>
            <Route  path="/" element={<Home />}/>
            <Route  path="/details/:id" element={<Details />}/>
            <Route path="/new" element={<New />}/>
            <Route path="/newcompetitor" element={<NewCompetitor />}/>
            <Route path="*" exact={true} element={<NotFound />} />
        </Routes>
    )
}