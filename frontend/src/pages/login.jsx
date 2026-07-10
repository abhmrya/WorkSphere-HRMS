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

    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="hidden lg:flex bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 text-white p-14 flex-col justify-between">

          <div>

            <h1 className="text-5xl font-black">

              WorkSphere

            </h1>

            <p className="mt-2 text-blue-100 text-lg">

              Human Resource Management System

            </p>

          </div>

          <div>

            <h2 className="text-4xl font-bold leading-snug">

              Manage your company
              <br />
              with ease.

            </h2>

            <p className="mt-6 text-blue-100 text-lg leading-8">

              Employee Management

              <br />

              Department Management

              <br />

              Payroll Management

              <br />

              Leave Management

              <br />

              Attendance Tracking

            </p>

          </div>

          <div className="flex gap-3">

            <div className="w-3 h-3 rounded-full bg-white"></div>

            <div className="w-3 h-3 rounded-full bg-blue-300"></div>

            <div className="w-3 h-3 rounded-full bg-blue-300"></div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center justify-center p-10 lg:p-16">

          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold text-slate-800">

              Welcome Back 👋

            </h2>

            <p className="mt-3 text-slate-500">

              Login to continue using your HRMS dashboard.

            </p>

            {error && (

              <div className="mt-6 rounded-lg bg-red-100 border border-red-300 text-red-700 px-4 py-3">

                {error}

              </div>

            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >
                          {/* Phone */}

              <div>

                <label className="mb-2 block font-semibold text-slate-700">
                  Phone Number
                </label>

                <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-4 focus-within:border-blue-600">

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
                    className="w-full bg-transparent px-3 py-4 outline-none"
                    required
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <label className="mb-2 block font-semibold text-slate-700">
                  Password
                </label>

                <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-4 focus-within:border-blue-600">

                  <FaLock className="text-slate-400" />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    className="w-full bg-transparent px-3 py-4 outline-none"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="text-slate-500 hover:text-blue-600"
                  >

                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}

                  </button>

                </div>

              </div>

              <div className="flex items-center justify-between">

                <label className="flex items-center gap-2 text-sm text-slate-600">

                  <input
                    type="checkbox"
                    className="rounded"
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >

                {loading
                  ? "Logging in..."
                  : "Login"}

              </button>
                            <div className="text-center">

                <p className="text-slate-600">

                  Don't have an account?{" "}

                  <Link
                    to="/register"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Register Now
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