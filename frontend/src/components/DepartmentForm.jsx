import { useState } from "react";

function DepartmentForm() {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(formData);

    };

    return (

        <form onSubmit={handleSubmit} className="space-y-5">

            <div>

                <label className="mb-2 block font-medium">

                    Department Name

                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                    placeholder="Enter department name"
                />

            </div>

            <div>

                <label className="mb-2 block font-medium">

                    Description

                </label>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                    placeholder="Enter description"
                />

            </div>

            <div className="flex justify-end gap-3">

                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                >
                    Save
                </button>

            </div>

        </form>

    );

}

export default DepartmentForm;