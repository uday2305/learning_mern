import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoute = () =>
  localStorage.getItem("user") ? <Outlet /> : <Navigate to="/login" />;

export const PrivateAdminRoute = () =>
  JSON.parse(localStorage.getItem("user")).isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
