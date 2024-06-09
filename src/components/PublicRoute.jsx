import { useAuth } from "../contexts/AuthContext";
import {Outlet,Navigate} from "react-router-dom"

export default function PublicRoute(){
    const {currentUser} = useAuth();
    
    return currentUser ? <Navigate to="/" /> : <Outlet />;
}