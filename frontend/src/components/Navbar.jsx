import { FaBell, FaBars } from "react-icons/fa";
import { getUser } from "../utils/auth";
import { useSidebar } from "../context/SidebarContext";

function Navbar() {
  const user = getUser();
  const { toggle } = useSidebar();

  const initial = user?.first_name?.charAt(0)?.toUpperCase() || "?";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={toggle}
          aria-label="Open menu"
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
        >
          <FaBars className="text-lg" />
        </button>

        <h2 className="text-lg font-bold text-slate-900 sm:text-2xl">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <button
          aria-label="Notifications"
          className="relative rounded-full p-2 text-slate-700 transition-colors hover:bg-slate-100"
        >
          <FaBell className="text-lg sm:text-xl" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        <div className="hidden text-right sm:block">
          <h3 className="text-sm font-semibold text-slate-900">
            {user?.first_name}
          </h3>
          <p className="text-xs text-slate-500">{user?.role}</p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white sm:h-10 sm:w-10 sm:text-lg">
          {initial}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
