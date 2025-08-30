import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';
import Loading from '../components/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }
    if (user && user?.email) {
        return children;
    }
    return <Navigate to={"/login"}></Navigate>;
};

export default PrivateRoute;