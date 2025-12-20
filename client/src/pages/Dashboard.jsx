import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/cards/StatCard";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-xl font-semibold text-center text-blue-600">
        Dashboard
      </h1>

      <p className="mt-8 font-semibold text-blue-600">
        welcome Back , Admin
      </p>

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