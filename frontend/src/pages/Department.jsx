import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

import Modal from "../components/Modal";
import DepartmentForm from "../components/DepartmentForm";

// Deterministic accent color per department, derived from its code/name.
// Keeps the palette cohesive (teal-led) while still giving each row a
// distinct identity in the avatar chip.
const AVATAR_STYLES = [
  { bg: "bg-teal-50", text: "text-teal-700", ring: "ring-teal-100" },
  { bg: "bg-indigo-50", text: "text-indigo-700", ring: "ring-indigo-100" },
  { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-100" },
  { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-100" },
  { bg: "bg-sky-50", text: "text-sky-700", ring: "ring-sky-100" },
  { bg: "bg-violet-50", text: "text-violet-700", ring: "ring-violet-100" },
];

function avatarStyleFor(seed = "") {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return AVATAR_STYLES[Math.abs(hash) % AVATAR_STYLES.length];
}

function initialsFor(department) {
  const source = department.code || department.name || "?";
  return source.trim().slice(0, 2).toUpperCase();
}

function Department() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);

    try {
      const response = await api.get("/departments/");
      setDepartments(response.data);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Couldn't load departments.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      if (editingDepartment) {
        await api.patch(`/departments/${editingDepartment.id}/`, formData);
        toast.success("Department updated successfully.");
      } else {
        await api.post("/departments/", formData);
        toast.success("Department created successfully.");
      }

      setOpen(false);
      setEditingDepartment(null);
      resetForm();

      await fetchDepartments();
    }catch (error) {

    console.log(error.response?.data);

    if (error.response?.status === 400) {

        setErrors(error.response.data);

    } else {

        toast.error("Something went wrong.");

    }

}
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);

    setFormData({
      name: department.name,
      code: department.code,
      description: department.description,
    });

    setOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) return;

    setDeletingId(id);

    try {
      await api.delete(`/departments/${id}/`);
      toast.success("Department deleted successfully.");
      await fetchDepartments();
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Unable to delete department.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredDepartments = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return departments;

    return departments.filter((d) =>
      [d.name, d.code, d.description]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q))
    );
  }, [departments, query]);

  const openAddModal = () => {
    setEditingDepartment(null);
    resetForm();
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditingDepartment(null);
    resetForm();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Departments
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage the departments your organization is structured around.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M10 4v12M4 10h12" />
          </svg>
          Add department
        </button>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <h2 className="text-base font-semibold text-slate-900">
            All departments
            {!loading && (
              <span className="ml-2 text-sm font-normal text-slate-400">
                {filteredDepartments.length}
                {query && ` of ${departments.length}`}
              </span>
            )}
          </h2>

          <div className="relative sm:w-64">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="9" r="6" />
              <path d="M17 17l-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search departments..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M5 5l10 10M15 5L5 15" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="divide-y divide-slate-100 p-4 sm:p-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex animate-pulse items-center gap-4 py-3"
              >
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/4 rounded bg-slate-200" />
                  <div className="h-3 w-1/2 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredDepartments.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 11h.01M15 11h.01M9 15h.01M15 15h.01"
                />
              </svg>
            </div>
            {departments.length === 0 ? (
              <>
                <p className="font-medium text-slate-700">
                  No departments yet
                </p>
                <p className="max-w-sm text-sm text-slate-500">
                  Create your first department to start organizing your
                  teams.
                </p>
                <button
                  onClick={openAddModal}
                  className="mt-2 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
                >
                  + Add department
                </button>
              </>
            ) : (
              <>
                <p className="font-medium text-slate-700">
                  No matches for "{query}"
                </p>
                <p className="text-sm text-slate-500">
                  Try a different name, code, or description.
                </p>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Table — md and up */}
            <div className="hidden md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-3 font-semibold">Name</th>
                    <th className="px-5 py-3 font-semibold">Code</th>
                    <th className="px-5 py-3 font-semibold">Description</th>
                    <th className="px-5 py-3 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredDepartments.map((department) => {
                    const avatar = avatarStyleFor(
                      department.code || department.name
                    );

                    return (
                      <tr
                        key={department.id}
                        className="transition-colors hover:bg-slate-50"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ${avatar.bg} ${avatar.text} ${avatar.ring}`}
                            >
                              {initialsFor(department)}
                            </span>
                            <span className="font-medium text-slate-900">
                              {department.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                            {department.code}
                          </span>
                        </td>

                        <td className="max-w-xs px-5 py-3.5 text-slate-500">
                          <span className="line-clamp-1">
                            {department.description || "—"}
                          </span>
                        </td>

                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleEdit(department)}
                              aria-label={`Edit ${department.name}`}
                              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                            >
                              <svg
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.75"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13.5 3.5l3 3L7 16l-4 1 1-4 9.5-9.5z"
                                />
                              </svg>
                            </button>

                            <button
                              onClick={() => handleDelete(department.id)}
                              disabled={deletingId === department.id}
                              aria-label={`Delete ${department.name}`}
                              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                            >
                              <svg
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.75"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4 6h12M8 6V4h4v2m-6 0v10a1 1 0 001 1h6a1 1 0 001-1V6"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Cards — below md */}
            <ul className="divide-y divide-slate-100 md:hidden">
              {filteredDepartments.map((department) => {
                const avatar = avatarStyleFor(
                  department.code || department.name
                );

                return (
                  <li key={department.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ${avatar.bg} ${avatar.text} ${avatar.ring}`}
                      >
                        {initialsFor(department)}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate font-medium text-slate-900">
                            {department.name}
                          </p>
                          <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                            {department.code}
                          </span>
                        </div>

                        {department.description && (
                          <p className="mt-1 text-sm text-slate-500">
                            {department.description}
                          </p>
                        )}

                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(department)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
                          >
                            <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 3.5l3 3L7 16l-4 1 1-4 9.5-9.5z"
                              />
                            </svg>
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(department.id)}
                            disabled={deletingId === department.id}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                          >
                            <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h12M8 6V4h4v2m-6 0v10a1 1 0 001 1h6a1 1 0 001-1V6"
                              />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      <Modal
        isOpen={open}
        title={editingDepartment ? "Edit Department" : "Add Department"}
        onClose={closeModal}
      >
        <DepartmentForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          editingDepartment={editingDepartment}
          errors={errors}
        />
      </Modal>
    </div>
  );
}

export default Department;





// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";

// import Modal from "../components/Modal";
// import DepartmentForm from "../components/DepartmentForm";

// function Department() {

//     const [departments, setDepartments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [open, setOpen] = useState(false);
//     const [editingDepartment, setEditingDepartment] = useState(null);

//     const [formData, setFormData] = useState({
//         name: "",
//         code: "",
//         description: "",
//     });

//     useEffect(() => {
//         fetchDepartments();
//     }, []);

//     const fetchDepartments = async () => {

//         setLoading(true);

//         try {

//             const response = await api.get("/departments/");

//             setDepartments(response.data);

//         } catch (error) {

//             console.log(error.response?.data);

//         } finally {

//             setLoading(false);

//         }

//     };

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {

//             if (editingDepartment) {

//                 await api.patch(
//                     `/departments/${editingDepartment.id}/`,
//                     formData
//                 );
//                 toast.success("Department updated successfully.");

//             } else {

//                 await api.post(
//                     "/departments/",
//                     formData
//                 );
//                 toast.success("Department created successfully.");

//             }

//             setOpen(false);

//             setEditingDepartment(null);

//             setFormData({
//                 name: "",
//                 code: "",
//                 description: "",
//             });

//             fetchDepartments();

//         } catch (error) {

//             console.log(error.response?.data);
//             toast.error("Something went wrong.");

//         }

//     };

//     const handleEdit = (department) => {

//         setEditingDepartment(department);

//         setFormData({
//             name: department.name,
//             code: department.code,
//             description: department.description,
//         });

//         setOpen(true);

//     };

//     const handleDelete = async (id) => {

//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this department?"
//         );

//         if (!confirmDelete) return;

//         try {

//             await api.delete(`/departments/${id}/`);
//             toast.success("Department deleted successfully.");
//             fetchDepartments();

//         } catch (error) {

//             console.log(error.response?.data);
//             toast.error("Unable to delete department.");

//         }

//     };

//     return (

//         <div>

//             <div className="mb-6 flex items-center justify-between">

//                 <h1 className="text-3xl font-bold">
//                     Departments
//                 </h1>

//                 <button
//                     onClick={() => {

//                         setEditingDepartment(null);

//                         setFormData({
//                             name: "",
//                             code: "",
//                             description: "",
//                         });

//                         setOpen(true);

//                     }}
//                     className="rounded-lg bg-blue-600 px-5 py-2 text-white"
//                 >
//                     + Add Department
//                 </button>

//             </div>

//             <div className="rounded-xl bg-white p-6 shadow">

//                 <h2 className="mb-4 text-xl font-semibold">
//                     Department List
//                 </h2>

//                 {loading ? (

//                     <p>Loading...</p>

//                 ) : departments.length === 0 ? (

//                     <p className="text-slate-500">
//                         No departments available.
//                     </p>

//                 ) : (

//                     <table className="w-full">

//                         <thead>

//                             <tr className="border-b">

//                                 <th className="p-3 text-left">Name</th>
//                                 <th className="p-3 text-left">Code</th>
//                                 <th className="p-3 text-left">Description</th>
//                                 <th className="p-3 text-left">Actions</th>

//                             </tr>

//                         </thead>

//                         <tbody>

//                             {departments.map((department) => (

//                                 <tr
//                                     key={department.id}
//                                     className="border-b"
//                                 >

//                                     <td className="p-3">
//                                         {department.name}
//                                     </td>

//                                     <td className="p-3">
//                                         {department.code}
//                                     </td>

//                                     <td className="p-3">
//                                         {department.description}
//                                     </td>

//                                     <td className="p-3">

//                                         <button
//                                             onClick={() => handleEdit(department)}
//                                             className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
//                                         >
//                                             Edit
//                                         </button>

//                                         <button
//                                             onClick={() => handleDelete(department.id)}
//                                             className="ml-2 rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
//                                             >
//                                             Delete
//                                         </button>

//                                     </td>

//                                 </tr>

//                             ))}

//                         </tbody>

//                     </table>

//                 )}

//             </div>

//             <Modal
//                 isOpen={open}
//                 title={
//                     editingDepartment
//                         ? "Edit Department"
//                         : "Add Department"
//                 }
//                 onClose={() => {

//                     setOpen(false);

//                     setEditingDepartment(null);

//                 }}
//             >

//                 <DepartmentForm
//                     formData={formData}
//                     setFormData={setFormData}
//                     handleSubmit={handleSubmit}
//                     editingDepartment={editingDepartment}
//                 />

//             </Modal>

//         </div>

//     );

// }

// export default Department;