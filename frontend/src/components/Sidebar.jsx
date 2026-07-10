import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaBuilding,
    FaUsers,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {

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

    return (

        <aside className="w-64 bg-slate-900 text-white">

            <div className="border-b border-slate-700 p-6">

                <h1 className="text-2xl font-bold">

                    WorkSphere

                </h1>

                <p className="text-sm text-slate-400">

                    HRMS

                </p>

            </div>

            <nav className="p-4">

                {

                    menu.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `mb-2 flex items-center gap-3 rounded-lg p-3 transition

                                ${
                                    isActive
                                        ? "bg-blue-600"
                                        : "hover:bg-slate-800"
                                }`
                            }
                        >

                            {item.icon}

                            {item.name}

                        </NavLink>

                    ))

                }

            </nav>

            <div className="absolute bottom-5 w-64 px-4">

                <button
                    className="flex w-full items-center gap-3 rounded-lg bg-red-600 p-3 hover:bg-red-700"
                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;