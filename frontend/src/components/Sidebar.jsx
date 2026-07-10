import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

import {
  FaHome,
  FaBuilding,
  FaUsers,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { useSidebar } from "../context/SidebarContext";

const menu = [
  {
    name: "Dashboard",
    icon: <FaHome />,
    path: "/dashboard",
  },
  {
    name: "Departments",
    icon: <FaBuilding />,
    path: "/departments",
  },
  {
    name: "Employees",
    icon: <FaUsers />,
    path: "/employees",
  },
  {
    name: "Leave",
    icon: <FaCalendarAlt />,
    path: "/leave",
  },
  {
    name: "Payroll",
    icon: <FaMoneyBillWave />,
    path: "/payroll",
  },
  {
    name: "Settings",
    icon: <FaCog />,
    path: "/settings",
  },
];

function Sidebar() {
  const { isOpen, close } = useSidebar();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    close();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={close}
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full w-64 flex-col bg-slate-900 text-white transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:z-auto lg:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-slate-700 p-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              WorkSphere
            </h1>

            <p className="text-sm text-slate-400">
              HRMS
            </p>
          </div>

          <button
            onClick={close}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={close}
              className={({ isActive }) =>
                `mb-1 flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-teal-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="text-base">
                {item.icon}
              </span>

              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-red-600 p-3 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;