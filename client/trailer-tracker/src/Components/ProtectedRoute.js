import * as React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {useAuth} from "../apiContext/AuthContext";

export const ProtectedRoute = () => {
    const {accessToken} = useAuth();

    return accessToken ? <Outlet/> : <Navigate to = "/Login" />
}