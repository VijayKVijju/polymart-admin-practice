import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios"; 

export default function UserIndividualProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [action, setAction] = useState(""); 
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch user details on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await api.get(`http://localhost:5050/api/admin/users/${id}`);
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // 🔹 Handle decision
  const handleSubmit = async () => {
    if (!action) {
      alert("Please select an action");
      return;
    }
    const msg = action === "approve" ? "Confirm verification?" : "Confirm rejection?";
    if (!window.confirm(msg)) return;

    try {
      // Hits either /api/admin/approve/:id OR /api/admin/reject/:id
      const endpoint = `http://localhost:5050/api/admin/${action}/${id}`;
      const res = await api.put(endpoint);

      if (res.data.success) {
        setSubmitted(true);
        setUser(res.data.user);
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update user status");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!user) return <p className="text-center py-10 text-red-500">User not found</p>;

  return (
    <div className="flex gap-12 p-8">
      {/* LEFT PROFILE */}
      <div className="w-64 text-center">
        <img
          src={user.profileImage || "https://i.pravatar.cc/200"}
          className="w-40 h-40 rounded-full mx-auto object-cover border"
          alt="Profile"
        />
        <h3 className="mt-4 font-semibold text-lg">{user.name}</h3>
        <div className="flex justify-center gap-2 mt-2">
          <span className="text-xs px-3 py-1 rounded bg-blue-100 text-blue-600 uppercase">
            {user.role}
          </span>
          {submitted && (
            <span className={`text-xs px-3 py-1 rounded font-bold ${action === "approve" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
              {action === "approve" ? "Verified" : "Rejected"}
            </span>
          )}
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-md p-8 w-[500px]">
          <h2 className="font-semibold text-lg">{user.name}</h2>
          <p className="text-sm text-gray-500 mb-4">+91 {user.mobileNumber}</p>

          <div className="space-y-2 text-sm border-t pt-4 mb-6">
            <div><strong>Location:</strong> {user.location || "N/A"}</div>
            <div><strong>Document:</strong> {user.gstDocumentUrl ? "Uploaded" : "None"}</div>
          </div>

          {!submitted ? (
            <div>
              <p className="text-sm font-medium mb-3">Action Required:</p>
              <div className="flex gap-6 mb-6">
                <button
                  onClick={() => setAction("approve")}
                  className={`text-sm ${action === "approve" ? "text-blue-600 font-bold" : "text-gray-400"}`}
                >
                  Approve User
                </button>
                <button
                  onClick={() => setAction("reject")}
                  className={`text-sm ${action === "reject" ? "text-red-500 font-bold" : "text-gray-400"}`}
                >
                  Reject User
                </button>
              </div>

              <button
                onClick={handleSubmit}
                className="bg-black text-white px-10 py-2 rounded-lg text-sm w-full"
              >
                Submit Decision
              </button>
            </div>
          ) : (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg text-center font-medium">
              Update Complete
            </div>
          )}
        </div>
      </div>
    </div>
  );
}