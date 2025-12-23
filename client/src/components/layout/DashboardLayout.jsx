
//-------------server
/*

import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-[260px] w-full p-10 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
  */

//=========================================yashsvi floder 
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-[260px] w-full p-10 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}