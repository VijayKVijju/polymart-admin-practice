import { logoutAdmin } from "../../utils/auth";

export default function LogoutButton() {
  return (
    <button
      onClick={logoutAdmin}
      className="text-red-600 font-semibold"
    >
      Logout
    </button>
  );
}