import * as React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {useAuth} from "../apiContext/AuthContext";

export const ProtectedRoute = () => {
    const {isAuth} = useAuth();

    return isAuth ? <Outlet/> : <Navigate to = "/Login" />
}