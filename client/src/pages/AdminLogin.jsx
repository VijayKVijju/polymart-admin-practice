
//======================ADMIN PAGE AS PER TH FIGMA DISIGN
/*
import React, { useState } from "react";

export default function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ adminId, password });
    alert("Login clicked (API will be added next)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {//Header }
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            ⚙️
          </div>
          <h1 className="text-xl font-semibold text-blue-600">
            Polymer Market Admin
          </h1>
          <p className="text-sm text-gray-500">
            Sign in to your account
          </p>
        </div>

        {//Form }
        <form onSubmit={handleLogin} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Admin Id
            </label>
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="admin123"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign In
          </button>

        </form>
      </div>
    </div>
  );
}
*/
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;new implementation ;;;;;;;;;;;;;;;;;;;;;;;;;;;;
/*
import React, { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5050/api/admin/login",
        { adminId, password }
      );

      localStorage.setItem("token", res.data.token);
      alert("Login successful");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        placeholder="Admin ID"
        value={adminId}
        onChange={(e) => setAdminId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
*/
//==================adimn poymart server connected

/*


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fafafa",
  },
  card: {
    width: "360px",
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  icon: {
    fontSize: "32px",
    color: "#1a73e8",
    marginBottom: "10px",
  },
  title: {
    margin: "0",
    color: "#1a73e8",
    fontWeight: "600",
  },
  subtitle: {
    margin: "5px 0 25px",
    fontSize: "14px",
    color: "#777",
  },
  field: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "13px",
    color: "#444",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#1a73e8",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ✅ ADD

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5050/api/admin/login",
        { adminId, password }
      );

     
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard"); // ✅ REDIRECT
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>⚙️</div>

        <h2 style={styles.title}>Polymer Market Admin</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        <form onSubmit={handleLogin}>
          <div style={styles.field}>
            <label style={styles.label}>Admin Id</label>
            <input
              style={styles.input}
              placeholder="admin123"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

*/

//connected with yashsviimport React, { useState } from "react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../utils/auth";

// ✅ Inline styles object (UNCHANGED)
const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9fafb",
  },
  card: {
    padding: "40px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "400px",
    textAlign: "center",
  },
  icon: {
    fontSize: "40px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "24px",
  },
  field: {
    marginBottom: "16px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "4px",
    fontWeight: "500",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default function AdminLogin() {
  // 🔁 CHANGED: email → adminId
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/admin/login",
        {
          adminId,
          password,
        }
      );

      // ✅ store access token
      loginAdmin(res.data.accessToken);

      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>⚙️</div>

        <h2 style={styles.title}>Polymer Market Admin</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        <form onSubmit={handleLogin}>
          <div style={styles.field}>
            <label style={styles.label}>Admin ID</label>
            <input
              style={styles.input}
              placeholder="admin123"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}