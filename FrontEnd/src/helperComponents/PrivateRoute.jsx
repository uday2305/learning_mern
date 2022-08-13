import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoute = () => (
        localStorage.getItem('user')
            ? <Outlet />
            : <Navigate to='/login'/>
);