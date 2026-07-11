import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../services/api";
import { saveAuth } from "../utils/auth";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const response = await api.post(
        "/auth/login/",
        formData
      );

      saveAuth(response.data.data);

      navigate("/dashboard");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Invalid phone or password."
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 flex items-center justify-center p-4">

      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl grid lg:grid-cols-2">

        {/* LEFT PANEL */}

        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-700 p-10 text-white">

          <div>
            <h1 className="text-4xl font-black">
              WorkSphere
            </h1>

            <p className="mt-2 text-blue-100">
              Human Resource Management System
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold leading-tight">
              Manage your team
              <br />
              smarter & faster.
            </h2>

            <div className="mt-8 space-y-3 text-blue-100">

              <p>✓ Employee Management</p>

              <p>✓ Department Management</p>

              <p>✓ Payroll System</p>

              <p>✓ Leave Tracking</p>

              <p>✓ Attendance Monitoring</p>

            </div>
          </div>

          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-white"></div>
            <div className="h-3 w-3 rounded-full bg-blue-300"></div>
            <div className="h-3 w-3 rounded-full bg-blue-300"></div>
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="flex items-center justify-center p-8 lg:p-12">

          <div className="w-full max-w-md">

            <h2 className="text-3xl font-bold text-slate-800">
              Welcome Back 👋
            </h2>

            <p className="mt-2 text-slate-500">
              Sign in to access your dashboard.
            </p>

            {error && (
              <div className="mt-5 rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-red-700">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {/* Phone */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>

                <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-4 transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">

                  <FaPhoneAlt className="text-slate-400" />

                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full bg-transparent px-3 py-3 outline-none"
                    required
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-4 transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">

                  <FaLock className="text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    className="w-full bg-transparent px-3 py-3 outline-none"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-500 transition hover:text-blue-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>

                </div>

              </div>

              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2 text-slate-600">

                  <input
                    type="checkbox"
                    className="rounded"
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 py-3 font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Login"}
              </button>
              <div className="pt-2 text-center">

                <p className="text-sm text-slate-600">

                  Don't have an account?{" "}

                  <Link
                    to="/register"
                    className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                  >
                    Create Account
                  </Link>

                </p>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;