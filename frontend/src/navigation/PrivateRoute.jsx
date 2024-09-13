import { Navigate, useLocation } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication"
import PropTypes from "prop-types"
import Loading from "../components/Loading";

const PrivateRoute = (props) => {
    
    const { user, isLoading } = useAuthentication();
    const location = useLocation();

    if(isLoading) {
        return <Loading />
    }
    
    return user !== null ? props.children : <Navigate to='/auth' replace state={{from: location}} />;
}


PrivateRoute.propTypes = {
    children: PropTypes.any
}

export default PrivateRoute