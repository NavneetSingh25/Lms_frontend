import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth({allowedRole:allowedroles}) {
    const {isLoggedIn,role}=useSelector((state)=>state.auth);
    const location=useLocation();

    return isLoggedIn && allowedroles.find((myrole)=>myrole===role) ? (
        <Outlet/>
    ):(

    isLoggedIn ? (<Navigate to="/denied"/>) : (<Navigate to="/login" state={{from:location}} replace/>)
    );
}
export default RequireAuth;