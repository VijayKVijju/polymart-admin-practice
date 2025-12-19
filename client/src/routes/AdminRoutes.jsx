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

//==================second
import { Navigate, Outlet } from "react-router-dom";
import { isAdminLoggedIn } from "../utils/auth";

export default function AdminRoutes() {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
