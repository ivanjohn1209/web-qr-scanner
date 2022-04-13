import React, { useContext } from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FullScreenLoader from '../components/FullScreenLoader';
import UserContext from '../contexts/UserContext';
import { IsObjEmpty } from './ToolFtc';
import { notification } from 'antd';
// const AuthLayout = React.lazy(() => import('../Auth/AuthLayout')); // Lazy-loaded

const PrivateRoute = ({ children }) => {
    const userContext = useContext(UserContext);
    if (userContext.isLoaded) {
        if (IsObjEmpty(userContext.user)) {
            notification.error({
                message: "No Access!",
                description: "Please login to have an access",
            })
            return <Navigate to="/login" replace />;
        }
        return children;
    } else {
        return <FullScreenLoader />;
    }

};
PrivateRoute.propTypes = {
    component: PropTypes.any,
    path: PropTypes.string
};
export default PrivateRoute;