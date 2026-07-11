import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import api from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      await api.post(
        "/auth/register/",
        formData
      );

      navigate("/login");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Registration failed."
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
              Join your team
              <br />
              in just a minute.
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

        <div className="flex items-center justify-center p-6 lg:p-8">

          <div className="w-full max-w-md">

            <h2 className="text-3xl font-bold text-slate-800">
              Create Account 🚀
            </h2>

            <p className="mt-2 text-slate-500">
              Register to access your HRMS dashboard.
            </p>

            {error && (

              <div className="mt-5 rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-red-700">

                {error}

              </div>

            )}

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
            >

              {/* First Name & Last Name */}

              <div className="grid gap-4 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    First Name
                  </label>

                  <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-4">

                    <FaUser className="text-slate-400" />

                    <input
                      type="text"
                      name="first_name"
                      placeholder="First name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-3 outline-none"
                      required
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Last Name
                  </label>

                  <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-4">

                    <FaUser className="text-slate-400" />

                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-3 outline-none"
                      required
                    />

                  </div>

                </div>

              </div>

              {/* Email & Phone */}

              <div className="grid gap-4 md:grid-cols-2">
                              {/* Email */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email
                  </label>

                  <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-4 focus-within:border-blue-600">

                    <FaEnvelope className="text-slate-400" />

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-3 outline-none"
                      required
                    />

                  </div>

                </div>

                {/* Phone */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone
                  </label>

                  <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-4 focus-within:border-blue-600">

                    <FaPhoneAlt className="text-slate-400" />

                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-3 outline-none"
                      required
                    />

                  </div>


                </div>

              </div>

              

              {/* Password & Confirm Password */}

              <div className="grid gap-4 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-4 focus-within:border-blue-600">

                    <FaLock className="text-slate-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-3 outline-none"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-500 hover:text-blue-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>

                  </div>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Confirm Password
                  </label>

                  <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-4 focus-within:border-blue-600">

                    <FaLock className="text-slate-400" />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      placeholder="Confirm Password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-3 outline-none"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-slate-500 hover:text-blue-600"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                </div>

              </div>
                            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <div className="pt-2 text-center">

                <p className="text-sm text-slate-600">

                  Already have an account?{" "}

                  <Link
                    to="/login"
                    className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                  >
                    Login
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

export default Register;