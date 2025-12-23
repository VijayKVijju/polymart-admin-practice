

//===================static part
/*
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS = [
  {
    id: 1,
    name: "Alwin Sam",
    phone: "+91 7483746289",
    role: "Buyer",
    status: "Verified",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Courage S",
    phone: "+91 7483746289",
    role: "Seller",
    status: "Verified",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Sam Andrew",
    phone: "+91 7483746289",
    role: "Buyer",
    status: "Unverified",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

const FILTERS = ["All", "Buyers", "Sellers", "unverified", "Rejected"];

export default function UserManagement() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredUsers = USERS.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search);

    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Buyers" && user.role === "Buyer") ||
      (activeFilter === "Sellers" && user.role === "Seller") ||
      (activeFilter === "unverified" && user.status === "Unverified") ||
      (activeFilter === "Rejected" && user.status === "Rejected");

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* TITLE /}
      <h1 className="text-xl font-semibold text-blue-600 text-center">
        User Management
      </h1>

      {/* SEARCH /}
      <div className="mt-8">
        <input
          type="text"
          placeholder="Search by Name , Mobile No"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border shadow-sm focus:outline-none"
        />
      </div>

      {/* FILTERS /}
      <div className="flex gap-3 mt-6 flex-wrap">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-lg text-sm ${
              activeFilter === filter
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* USERS GRID /}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => navigate(`/admin/users/${user.id}`)}
            className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 cursor-pointer hover:shadow-lg transition"
          >
            {/* AVATAR /}
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover"
            />

            {/* INFO /}
            <div className="flex-1">
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.phone}</p>

              <div className="flex gap-2 mt-2">
                <span className="text-xs px-3 py-1 rounded-md bg-blue-100 text-blue-600">
                  {user.role}
                </span>
                <span className="text-xs px-3 py-1 rounded-md bg-green-100 text-green-600">
                  {user.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  */

//----------------------------DYNAMIC VALUES------------------
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; // backend axios instance

const FILTERS = ["All", "Buyers", "Sellers", "unverified", "Rejected"];

export default function UserManagement() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------- FETCH USERS ----------------
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        // backend route: /api/v1/admin/users
        const res = await api.get("/admin/users");

        let backendUsers = [];

        // safe extraction for all possible response formats
        if (Array.isArray(res.data)) {
          backendUsers = res.data;
        } else if (Array.isArray(res.data.data)) {
          backendUsers = res.data.data;
        } else if (Array.isArray(res.data.users)) {
          backendUsers = res.data.users;
        }

        // map backend → UI model (NO UI CHANGE)
        const mappedUsers = backendUsers.map((u) => ({
          id: u._id,
          name: u.name || "No Name",
          phone: u.phoneNumber ? `+91 ${u.phoneNumber}` : "N/A",
          role: u.role || "Buyer",
          status: u.status || "Pending",
          avatar: u.profileImage || "https://i.pravatar.cc/100",
        }));

        setUsers(mappedUsers);
      } catch (err) {
        console.error("❌ Failed to fetch users:", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ---------------- FILTER LOGIC ----------------
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search);

    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Buyers" && user.role === "Buyer") ||
      (activeFilter === "Sellers" && user.role === "Seller") ||
      (activeFilter === "unverified" && user.status === "Pending") ||
      (activeFilter === "Rejected" && user.status === "Rejected");

    return matchesSearch && matchesFilter;
  });

  // ---------------- UI ----------------
  return (
    <div>
      {/* TITLE */}
      <h1 className="text-xl font-semibold text-blue-600 text-center">
        User Management
      </h1>

      {/* SEARCH */}
      <div className="mt-8">
        <input
          type="text"
          placeholder="Search by Name , Mobile No"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border shadow-sm focus:outline-none"
        />
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mt-6 flex-wrap">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-lg text-sm ${
              activeFilter === filter
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {loading ? (
          <p className="text-center text-gray-400 col-span-full">
            Loading users...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 col-span-full">
            {error}
          </p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-gray-400 col-span-full">
            No users found
          </p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => navigate(`/admin/users/${user.id}`)}
              className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.phone}</p>

                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-3 py-1 rounded-md bg-blue-100 text-blue-600">
                    {user.role}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-md bg-green-100 text-green-600">
                    {user.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}