import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

import Modal from "../components/Modal";
import EmployeeForm from "../components/EmployeeForm";

function Employee() {

    // ===========================
    // States
    // ===========================

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [editingEmployee, setEditingEmployee] = useState(null);

    const [query, setQuery] = useState("");

    const [deletingId, setDeletingId] = useState(null);

    const [errors, setErrors] = useState({});

    // Dropdown Data

    const [users, setUsers] = useState([]);

    const [departments, setDepartments] = useState([]);

    const [designations, setDesignations] = useState([]);

    // ===========================
    // Form Data
    // ===========================

    const [formData, setFormData] = useState({

        user: "",

        employee_id: "",

        department: "",

        designation: "",

        salary: "",

        joining_date: "",

        date_of_birth: "",

        gender: "",

        address: "",

        city: "",

        state: "",

        pincode: "",

        emergency_contact: "",

        photo: null,

        status: "ACTIVE",

    });

    // ===========================
    // Initial Load
    // ===========================

    useEffect(() => {

        fetchEmployees();
        fetchUsers();
        fetchDepartments();
        fetchDesignations();

    }, []);

    // ===========================
    // Fetch Employees
    // ===========================

    const fetchEmployees = async () => {

        setLoading(true);

        try {

            const response = await api.get("/employees/");

            setEmployees(response.data.results || response.data);

        } catch (error) {

            console.log(error.response?.data);

            toast.error("Unable to load employees.");

        } finally {

            setLoading(false);

        }

    };

    // ===========================
    // Reset Form
    // ===========================

    const resetForm = () => {

        setFormData({

            user: "",

            employee_id: "",

            department: "",

            designation: "",

            salary: "",

            joining_date: "",

            date_of_birth: "",

            gender: "",

            address: "",

            city: "",

            state: "",

            pincode: "",

            emergency_contact: "",

            photo: null,

            status: "ACTIVE",

        });

        setErrors({});

    };

    // ===========================
    // Open Modal
    // ===========================

    const openAddModal = () => {

        setEditingEmployee(null);

        resetForm();

        setOpen(true);

    };

    // ===========================
    // Close Modal
    // ===========================

    const closeModal = () => {

        setOpen(false);

        setEditingEmployee(null);

        resetForm();

    };
    // ===========================
// Fetch Users
// ===========================

const fetchUsers = async () => {

    try {

        const response = await api.get("/users/");

        setUsers(response.data.results || response.data);

    } catch (error) {

        console.log(error.response?.data);

    }

};

// ===========================
// Fetch Departments
// ===========================

const fetchDepartments = async () => {

    try {

        const response = await api.get("/departments/");

        setDepartments(response.data.results || response.data);

    } catch (error) {

        console.log(error.response?.data);

    }

};

// ===========================
// Fetch Designations
// ===========================

const fetchDesignations = async () => {

    try {

        const response = await api.get("/designations/");

        setDesignations(response.data.results || response.data);

    } catch (error) {

        console.log(error.response?.data);

    }

};

// ===========================
// Submit Employee
// ===========================

const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {

        if (key === "photo") {

            if (formData.photo) {

                data.append("photo", formData.photo);

            }

        } else {

            data.append(key, formData[key]);

        }

    });

    try {

        setErrors({});

        if (editingEmployee) {

            await api.patch(
                `/employees/${editingEmployee.id}/`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Employee updated successfully.");

        } else {

            await api.post(
                "/employees/",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Employee created successfully.");

        }

        closeModal();

        fetchEmployees();

    } catch (error) {

        console.log(error.response?.data);

        if (error.response?.status === 400) {

            setErrors(error.response.data);

        } else {

            toast.error("Something went wrong.");

        }

    }

};

// ===========================
// Edit Employee
// ===========================

const handleEdit = (employee) => {

    setEditingEmployee(employee);

    setFormData({

        user: employee.user,

        employee_id: employee.employee_id,

        department: employee.department,

        designation: employee.designation,

        salary: employee.salary,

        joining_date: employee.joining_date,

        date_of_birth: employee.date_of_birth,

        gender: employee.gender,

        address: employee.address,

        city: employee.city,

        state: employee.state,

        pincode: employee.pincode,

        emergency_contact: employee.emergency_contact,

        photo: null,

        status: employee.status,

    });

    setErrors({});

    setOpen(true);

};

// ===========================
// Delete Employee
// ===========================

const handleDelete = async (id) => {

    if (!window.confirm("Delete this employee?")) {

        return;

    }

    setDeletingId(id);

    try {

        await api.delete(`/employees/${id}/`);

        toast.success("Employee deleted successfully.");

        fetchEmployees();

    } catch (error) {

        console.log(error.response?.data);

        toast.error("Unable to delete employee.");

    } finally {

        setDeletingId(null);

    }

};

// ===========================
// Search
// ===========================

const filteredEmployees = useMemo(() => {

    const q = query.trim().toLowerCase();

    if (!q) return employees;

    return employees.filter((employee) =>

        [
            employee.employee_name,
            employee.employee_id,
            employee.department_name,
            employee.designation_name,
        ]
            .filter(Boolean)
            .some((field) =>
                field.toLowerCase().includes(q)
            )

    );

}, [employees, query]);

   return (

<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

    {/* Header */}

    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

            <h1 className="text-3xl font-bold text-slate-900">
                Employees
            </h1>

            <p className="mt-1 text-sm text-slate-500">
                Manage all employees in your organization.
            </p>

        </div>

        <button
            onClick={openAddModal}
            className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
        >
            + Add Employee
        </button>

    </div>

    {/* Card */}

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Search */}

        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">

            <h2 className="text-lg font-semibold">
                Employee List
            </h2>

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search employee..."
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-teal-500 sm:w-72"
            />

        </div>

        {/* Loading */}

        {loading ? (

            <div className="p-10 text-center">

                Loading...

            </div>

        ) : filteredEmployees.length === 0 ? (

            <div className="p-10 text-center text-slate-500">

                No employees found.

            </div>

        ) : (

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b bg-slate-50">

                            <th className="p-3 text-left">
                                Photo
                            </th>

                            <th className="p-3 text-left">
                                Employee ID
                            </th>

                            <th className="p-3 text-left">
                                Name
                            </th>

                            <th className="p-3 text-left">
                                Department
                            </th>

                            <th className="p-3 text-left">
                                Designation
                            </th>

                            <th className="p-3 text-left">
                                Salary
                            </th>

                            <th className="p-3 text-left">
                                Status
                            </th>

                            <th className="p-3 text-center">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>
                        {filteredEmployees.map((employee) => (

                        <tr
                            key={employee.id}
                            className="border-b hover:bg-slate-50"
                        >

                            <td className="p-3">

                                {employee.photo ? (

                                    <img
                                        src={employee.photo}
                                        alt={employee.employee_name}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />

                                ) : (

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-lg">

                                        👤

                                    </div>

                                )}

                            </td>

                            <td className="p-3">

                                {employee.employee_id}

                            </td>

                            <td className="p-3 font-medium">

                                {employee.employee_name}

                            </td>

                            <td className="p-3">

                                {employee.department_name}

                            </td>

                            <td className="p-3">

                                {employee.designation_name}

                            </td>

                            <td className="p-3">

                                ₹ {employee.salary}

                            </td>

                            <td className="p-3">

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                        employee.status === "ACTIVE"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >

                                    {employee.status}

                                </span>

                            </td>

                            <td className="p-3">

                                <div className="flex justify-center gap-2">

                                    <button
                                        onClick={() => handleEdit(employee)}
                                        className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(employee.id)}
                                        disabled={deletingId === employee.id}
                                        className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700 disabled:opacity-50"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}
                    </tbody>

                </table>

            </div>

        )}

    </div>

    <Modal
        isOpen={open}
        title={
            editingEmployee
                ? "Edit Employee"
                : "Add Employee"
        }
        onClose={closeModal}
    >

        <EmployeeForm

            formData={formData}

            setFormData={setFormData}

            handleSubmit={handleSubmit}

            editingEmployee={editingEmployee}

            users={users}

            departments={departments}

            designations={designations}

            errors={errors}

        />

    </Modal>

</div>

);
                    
}

export default Employee;