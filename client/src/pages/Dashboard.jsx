

//==================================STATIC UI====================
/*

import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/cards/StatCard";

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* TITLE }
      <h1 className="text-xl font-semibold text-center text-blue-600">
        Dashboard
      </h1>

      {/* WELCOME }
      <p className="mt-8 font-semibold text-blue-600">
        welcome Back , Admin
      </p>

      {/* CARDS GRID }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-8">
        <StatCard
          title="Total Users"
          value="1450"
          subtitle="1000 Buyers / 450 sellers"
        />

        <StatCard
          title="Active Listings"
          value="870"
          subtitle="5 pendings"
          highlight
        />

        <StatCard
          title="Pending Verifications"
          value="8"
        />

        <StatCard
          title="Total Inquiries"
          value="2498"
          subtitle="80 this week"
        />

        <StatCard
          title="Deals Closed"
          value="35"
          subtitle="This Week"
          success
        />
      </div>
    </DashboardLayout>
  );
}
  */

//dynamic value fetching 
import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/cards/StatCard";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    buyers: 0,
    sellers: 0,
    pendingUsers: 0,
    activeUsers: 0,
  });

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        "http://localhost:5050/api/v1/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats({
        totalUsers: res.data.totalUsers,
        buyers: res.data.buyers,
        sellers: res.data.sellers,
        pendingUsers: res.data.pendingUsers,
        activeUsers: res.data.activeUsers,
      });
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  // 🔁 Real-time polling (every 5 seconds)
  useEffect(() => {
    fetchDashboardStats();

    const interval = setInterval(fetchDashboardStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      {/* TITLE */}
      <h1 className="text-xl font-semibold text-center text-blue-600">
        Dashboard
      </h1>

      {/* WELCOME */}
      <p className="mt-8 font-semibold text-blue-600">
        Welcome back, Admin
      </p>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          subtitle={`${stats.buyers} Buyers / ${stats.sellers} Sellers`}
        />

        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          subtitle="Online in last 5 mins"
          highlight
        />

        <StatCard
          title="Pending Verifications"
          value={stats.pendingUsers}
        />

        <StatCard
          title="Total Inquiries"
          value="--"
          subtitle="API pending"
        />

        <StatCard
          title="Deals Closed"
          value="--"
          subtitle="API pending"
          success
        />
      </div>
    </DashboardLayout>
  );
}