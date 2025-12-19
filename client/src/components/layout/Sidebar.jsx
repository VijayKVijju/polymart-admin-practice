import { NavLink } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";

export default function Sidebar() {
  return (
    <aside className="sidebar w-[260px] fixed h-screen p-6 flex flex-col">
      <h1 className="text-blue-600 font-bold text-lg mb-8">
        Polymer Market Admin
      </h1>

      <nav className="flex flex-col gap-2">
        <NavLink to="/" className={({isActive}) => 
          `sidebar-item ${isActive ? "active" : ""}`
        }>Dashboard</NavLink>

        <NavLink to="/users" className={({isActive}) => 
          `sidebar-item ${isActive ? "active" : ""}`
        }>User Management</NavLink>

        <NavLink to="/listings" className={({isActive}) => 
          `sidebar-item ${isActive ? "active" : ""}`
        }>Listing Management</NavLink>

        <NavLink to="/inquiries" className={({isActive}) => 
          `sidebar-item ${isActive ? "active" : ""}`
        }>Inquiry Management</NavLink>

        <NavLink to="/support" className={({isActive}) => 
          `sidebar-item ${isActive ? "active" : ""}`
        }>Contact and Support</NavLink>
      </nav>

      <div className="mt-auto">
        <LogoutButton />
      </div>
    </aside>
  );
}