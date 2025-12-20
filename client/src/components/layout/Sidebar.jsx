import { NavLink } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";

export default function Sidebar() {
  const baseClass =
    "sidebar-item px-4 py-2 rounded font-medium";

  return (
    <aside className="sidebar w-[260px] fixed h-screen p-6 flex flex-col bg-white shadow-lg">
      <h1 className="text-blue-600 font-bold text-lg mb-8">
        Polymer Market Admin
      </h1>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"}`
          }
        >
          User Management
        </NavLink>

        <NavLink
          to="/admin/listings"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"}`
          }
        >
          Listing Management
        </NavLink>

        <NavLink
          to="/admin/inquiries"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"}`
          }
        >
          Inquiry Management
        </NavLink>

        <NavLink
          to="/admin/support"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"}`
          }
        >
          Contact and Support
        </NavLink>
      </nav>

      <div className="mt-auto pt-6">
        <LogoutButton />
      </div>
    </aside>
  );
}