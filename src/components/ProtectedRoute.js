import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const user = useSelector(state => state.userInfo.user);

    if (user && user.isAdmin) {
        return children;
    }

    return <Navigate to="/403" replace />;
};

export default ProtectedRoute;
