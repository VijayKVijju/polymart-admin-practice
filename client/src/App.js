

/*
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
        {/* Admin Login }
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes }
        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inquiries" element={<InquiryManagement />} />
          <Route path="listings" element={<ListingManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="support" element={<ContactSupport />} />
        </Route>

        {/* Default }
        <Route path="*" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import ListingManagement from "./pages/ListingManagement";
import InquiryManagement from "./pages/InquiryManagement";
import ContactSupport from "./pages/ContactSupport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<AdminRoutes />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/listings" element={<ListingManagement />} />
          <Route path="/admin/inquiries" element={<InquiryManagement />} />
          <Route path="/admin/support" element={<ContactSupport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;