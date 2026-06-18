import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";
function ProtectRoute(props) {


    const {authUser,loading}  =  useSelector((state) => state.user);

    if(loading){
        return(  <Loader/>)
    }

    return (

        authUser? props.children : <Navigate to="/login" />

    )

}

export default ProtectRoute;