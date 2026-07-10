import { useState } from "react";
import Modal from "../components/Modal";
import DepartmentForm from "../components/DepartmentForm";

function Department() {

    const [open, setOpen] = useState(false);

    return (

        <div>

            <div className="mb-6 flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Departments
                </h1>

                <button
                    onClick={() => setOpen(true)}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                >
                    + Add Department
                </button>

            </div>

            <div className="rounded-xl bg-white p-6 shadow">

                <h2 className="mb-4 text-xl font-semibold">
                    Department List
                </h2>

                <p className="text-slate-500">
                    No departments available.
                </p>

            </div>

            <Modal
                isOpen={open}
                title="Add Department"
                onClose={() => setOpen(false)}
            >
                <DepartmentForm />
            </Modal>

        </div>

    );

}

export default Department;