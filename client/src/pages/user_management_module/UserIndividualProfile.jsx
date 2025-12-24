
//------------------static UI part
/*

import { useState } from "react";
import { useParams } from "react-router-dom";

export default function UserIndividualProfile() {
  const { id } = useParams();

  const [action, setAction] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (action === "reject" && reason.trim() === "") {
      alert("Please enter reason for rejection");
      return;
    }

    const msg =
      action === "approve"
        ? "Confirm user verification?"
        : "Confirm user rejection?";

    if (window.confirm(msg)) {
      setSubmitted(true);
    }
  };

  return (
    <div className="flex gap-12">
      {/* LEFT PROFILE }
      <div className="w-64 text-center">
        <img
          src="https://i.pravatar.cc/200?img=3"
          alt="User"
          className="w-40 h-40 rounded-full mx-auto object-cover"
        />

        <h3 className="mt-4 font-semibold text-lg">Sam Andrew</h3>

        <div className="flex justify-center gap-2 mt-2">
          <span className="text-xs px-3 py-1 rounded bg-blue-100 text-blue-600">
            Buyer
          </span>

          {submitted && action === "approve" && (
            <span className="text-xs px-3 py-1 rounded bg-green-100 text-green-600">
              Verified
            </span>
          )}

          {submitted && action === "reject" && (
            <span className="text-xs px-3 py-1 rounded bg-red-100 text-red-600">
              Rejected
            </span>
          )}
        </div>
      </div>

      {/* RIGHT CARD }
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-md p-8 w-[520px] relative">
          {/* HEADER }
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500 flex items-center gap-2">
              📄 Unique user id
            </div>
            <button className="text-sm text-gray-600 hover:text-red-500">
              Block User
            </button>
          </div>

          {/* USER INFO }
          <h2 className="font-semibold text-lg mb-1">Sam Andrew</h2>
          <p className="text-sm text-gray-600 mb-3">+91 7483746289</p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span>GST Document</span>
              <button className="text-blue-500">⬇️</button>
            </div>
            <div>
              <strong>Location:</strong> Ahmedabad, Gujarat
            </div>
            <div>
              <strong>Registered Date:</strong> June 25, 2025
            </div>
          </div>

          {/* VERIFY SECTION }
          {!submitted && (
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Verify User ?</p>

              <div className="flex gap-6 mb-4">
                <button
                  onClick={() => setAction("approve")}
                  className={`text-sm ${
                    action === "approve"
                      ? "text-blue-600 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  Active
                </button>

                <button
                  onClick={() => setAction("reject")}
                  className={`text-sm ${
                    action === "reject"
                      ? "text-red-500 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  Reject
                </button>
              </div>

              {action === "reject" && (
                <textarea
                  placeholder="Reason of Rejection"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm shadow-sm focus:outline-none"
                />
              )}

              <button
                onClick={handleSubmit}
                className="mt-4 bg-blue-600 text-white px-10 py-2 rounded-lg text-sm"
              >
                Send
              </button>
            </div>
          )}

          {/* SUCCESS MESSAGE }
          {submitted && (
            <div className="mt-6 text-green-600 font-medium">
              User status updated successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
  */

//================dynamic values

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios"; // ✅ use axios instance

export default function UserIndividualProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [action, setAction] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch single pending user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await api.get(`http://localhost:5050/api/admin/users/${id}`);
          console.log( "res",res)
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async () => {
    if (!action) {
      alert("Please select an action");
      return;
    }

    if (action === "reject" && reason.trim() === "") {
      alert("Please enter reason for rejection");
      return;
    }

    const msg =
      action === "approve"
        ? "Confirm user verification?"
        : "Confirm user rejection?";

    if (!window.confirm(msg)) return;

    try {
      await api.patch(`http://localhost:5050/admin/users/${id}/`, {
        status: action === "approve" ? "Approved" : "Rejected",
        reason,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update user status");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400">Loading user...</p>;
  }

  if (!user) {
    return <p className="text-center text-red-500">User not found</p>;
  }

  return (
    <div className="flex gap-12">
      {/* LEFT PROFILE */}
      <div className="w-64 text-center">
        <img
          src={user.profileImage || "https://i.pravatar.cc/200"}
          alt="User"
          className="w-40 h-40 rounded-full mx-auto object-cover"
        />

        <h3 className="mt-4 font-semibold text-lg">{user.name}</h3>

        <div className="flex justify-center gap-2 mt-2">
          <span className="text-xs px-3 py-1 rounded bg-blue-100 text-blue-600">
            {user.role}
          </span>

          {submitted && action === "approve" && (
            <span  className="text-xs px-3 py-1 rounded bg-green-100 text-green-600">
              Verified
            </span>
          )}

          {submitted && action === "reject" && (
            <span className="text-xs px-3 py-1 rounded bg-red-100 text-red-600">
              Rejected
            </span>
          )}
        </div>
      </div>
      
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-md p-8 w-[520px] relative">
          <h2 className="font-semibold text-lg mb-1">{user.name}</h2>
          <p className="text-sm text-gray-600 mb-3">
            +91 {user.mobileNumber}
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span>GST Document</span>
              {user.gstDocumentUrl && (
                <a
                  href={user.gstDocumentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500"
                >
                  ⬇️
                </a>
              )}
            </div>

            <div>
              <strong>Location:</strong> {user.location || "N/A"}
            </div>
          </div>

          {/* VERIFY SECTION — UI UNCHANGED */}
          {!submitted && (
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Verify User ?</p>

              <div className="flex gap-6 mb-4">
                <button
                  onClick={() => setAction("approve")}
                  className={`text-sm ${
                    action === "approve"
                      ? "text-blue-600 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  Active
                </button>

                <button
                  onClick={() => setAction("reject")}
                  className={`text-sm ${
                    action === "reject"
                      ? "text-red-500 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  Reject
                </button>
              </div>

              {action === "reject" && (
                <textarea
                  placeholder="Reason of Rejection"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm shadow-sm focus:outline-none"
                />
              )}

              <button
                onClick={handleSubmit}
                className="mt-4 bg-blue-600 text-white px-10 py-2 rounded-lg text-sm"
              >
                Send
              </button>
            </div>
          )}

          {submitted && (
            <div className="mt-6 text-green-600 font-medium">
              User status updated successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
