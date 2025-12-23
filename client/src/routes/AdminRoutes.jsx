//================first
/*

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { isAdminLoggedIn } from "../utils/auth";

export default function AdminRoutes() {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}*/

//==================second adimn poymart server connected
/*
import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout"; // ✅ CORRECT PATH

export default function AdminRoutes() {
  const isAuthenticated = true; // replace with real auth later

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
  */
 //yashsvi folder
import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { isAdminLoggedIn } from "../utils/auth";

export default function AdminRoutes() {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
} 