import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import InquiryManagement from "./pages/InquiryManagement";
import ListingManagement from "./pages/ListingManagement";
import UserManagement from "./pages/UserManagement";
import ContactSupport from "./pages/ContactSupport";

import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inquiries" element={<InquiryManagement />} />
          <Route path="listings" element={<ListingManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="support" element={<ContactSupport />} />
        </Route>

        {/* Default */}
        <Route path="*" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;