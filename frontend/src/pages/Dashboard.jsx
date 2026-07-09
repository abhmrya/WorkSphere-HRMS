import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { getUser, getRefreshToken, logout } from "../utils/auth";

function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(getUser());

    console.log("Local User:", getUser());
    console.log("State User:", user);

  useEffect(() => {
    fetchUser();
  }, []);

const fetchUser = async () => {
  try {
    const response = await api.get("/auth/me/");
    console.log("ME API:", response.data);
    setUser(response.data.user);
  } catch (error) {
    console.log("ME API Error:", error.response?.data);
  }
};

  const handleLogout = async () => {

    try {

      await api.post("/auth/logout/", {
        refresh: getRefreshToken(),
      });

    } catch (error) {

      console.log(error.response?.data);

    } finally {

      logout();

      navigate("/login");

    }

  };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-10">

      <div className="flex justify-between items-center">

        <h1 className="text-4xl font-bold">
          Welcome {user.first_name}
        </h1>

        <button
          onClick={handleLogout}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Logout
        </button>

      </div>

      <div className="mt-8">
        <p>Email : {user.email}</p>
        <p>Phone : {user.phone}</p>
        <p>Role : {user.role}</p>
      </div>

    </div>
  );
}

export default Dashboard;