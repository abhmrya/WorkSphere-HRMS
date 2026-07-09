import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

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

        try {

            const response = await api.post(
                "/auth/register/",
                formData
            );

            console.log(response.data);

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {

            console.log(error.response?.data);

            alert("Registration Failed");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg space-y-4"
            >

                <h1 className="text-center text-3xl font-bold">
                    Register
                </h1>

                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full rounded border p-3"
                />

                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full rounded border p-3"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded border p-3"
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded border p-3"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded border p-3"
                />

                <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className="w-full rounded border p-3"
                />

                <button
                    type="submit"
                    className="w-full rounded bg-blue-600 p-3 text-white"
                >
                    Register
                </button>

                <p className="text-center">

                    Already have an account?

                    <Link
                        to="/login"
                        className="ml-2 text-blue-600"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>

    );
}

export default Register;