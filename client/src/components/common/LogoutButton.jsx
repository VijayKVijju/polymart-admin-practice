import { logoutAdmin } from "../../utils/auth";

export default function LogoutButton() {
  return (
    <button
      onClick={logoutAdmin}
      className="flex items-center gap-2 text-red-600 font-semibold mt-8"
    >
      Log out →
    </button>
  );
}