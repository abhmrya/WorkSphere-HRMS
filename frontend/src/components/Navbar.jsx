import { FaBell } from "react-icons/fa";
import { getUser } from "../utils/auth";

function Navbar() {

  const user = getUser();

  return (

    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">

      <div>

        <h2 className="text-2xl font-bold">

          Dashboard

        </h2>

      </div>

      <div className="flex items-center gap-6">

        <button className="relative">

          <FaBell className="text-xl text-slate-700" />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        <div className="text-right">

          <h3 className="font-semibold">

            {user.first_name}

          </h3>

          <p className="text-sm text-slate-500">

            {user.role}

          </p>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">

          {user.first_name.charAt(0)}

        </div>

      </div>

    </header>

  );

}

export default Navbar;