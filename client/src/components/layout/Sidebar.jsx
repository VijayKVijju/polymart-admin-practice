import { NavLink } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white shadow-lg p-6 flex flex-col">
      <h1 className="text-blue-600 font-bold text-lg mb-10">
        Polymer Market Admin
      </h1>

      <nav className="flex flex-col gap-3">
        {[
          { path: "/admin/dashboard", label: "Dashboard" },
          { path: "/admin/users", label: "User Management" },
          { path: "/admin/listings", label: "Listing Management" },
          { path: "/admin/inquiries", label: "Inquiry Management" },
          { path: "/admin/support", label: "Contact and Support" },
        ].map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-gray-200 text-black"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <LogoutButton />
      </div>
    </aside>
  );
}