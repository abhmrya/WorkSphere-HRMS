import { getUser } from "../utils/auth";

function Dashboard() {

  const user = getUser();

  const stats = [
    {
      title: "Employees",
      value: 125,
    },
    {
      title: "Departments",
      value: 8,
    },
    {
      title: "Leaves",
      value: 15,
    },
    {
      title: "Payroll",
      value: "₹12.5L",
    },
  ];

  const employees = [
    {
      id: 1,
      name: "Rahul Sharma",
      department: "IT",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Singh",
      department: "HR",
      status: "Active",
    },
    {
      id: 3,
      name: "Aman Verma",
      department: "Finance",
      status: "Inactive",
    },
  ];

  return (

    <div>

      <h1 className="text-3xl font-bold">
        Welcome, {user.first_name} 👋
      </h1>

      <p className="mt-2 text-slate-500">
        Here's what's happening in your organization today.
      </p>

      {/* Cards */}

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

        {stats.map((item) => (

          <div
            key={item.title}
            className="rounded-xl bg-white p-6 shadow"
          >

            <p className="text-slate-500">
              {item.title}
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {item.value}
            </h2>

          </div>

        ))}

      </div>

      {/* Table */}

      <div className="mt-10 rounded-xl bg-white shadow">

        <div className="border-b p-5">

          <h2 className="text-xl font-bold">

            Recent Employees

          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Department</th>

              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {employees.map((employee) => (

              <tr
                key={employee.id}
                className="border-t"
              >

                <td className="p-4">
                  {employee.name}
                </td>

                <td className="p-4">
                  {employee.department}
                </td>

                <td className="p-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm text-white ${
                      employee.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {employee.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Dashboard;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import { getUser, getRefreshToken, logout } from "../utils/auth";

// function Dashboard() {

//   const navigate = useNavigate();

//   const [user, setUser] = useState(getUser());

//     console.log("Local User:", getUser());
//     console.log("State User:", user);

//   useEffect(() => {
//     fetchUser();
//   }, []);

// const fetchUser = async () => {
//   try {
//     const response = await api.get("/auth/me/");
//     console.log("ME API:", response.data);
//     setUser(response.data.user);
//   } catch (error) {
//     console.log("ME API Error:", error.response?.data);
//   }
// };

//   const handleLogout = async () => {

//     try {

//       await api.post("/auth/logout/", {
//         refresh: getRefreshToken(),
//       });

//     } catch (error) {

//       console.log(error.response?.data);

//     } finally {

//       logout();

//       navigate("/login");

//     }

//   };

//   if (!user) {
//     return <h1>Loading...</h1>;
//   }

//   return (
//     <div className="p-10">

//       <div className="flex justify-between items-center">

//         <h1 className="text-4xl font-bold">
//           Welcome {user.first_name}
//         </h1>

//         <button
//           onClick={handleLogout}
//           className="rounded bg-red-600 px-4 py-2 text-white"
//         >
//           Logout
//         </button>

//       </div>

//       <div className="mt-8">
//         <p>Email : {user.email}</p>
//         <p>Phone : {user.phone}</p>
//         <p>Role : {user.role}</p>
//       </div>

//     </div>
//   );
// }

// export default Dashboard;