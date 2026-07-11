function DepartmentForm({
  formData,
  setFormData,
  handleSubmit,
  editingDepartment,
  errors,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Non Field Error */}

      {errors?.non_field_errors && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">
          {errors.non_field_errors[0]}
        </div>
      )}

      {/* Department Name */}

      <div>

        <label className="mb-2 block font-medium text-slate-700">
          Department Name
        </label>

        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          placeholder="Enter department name"
          className={`w-full rounded-lg border p-3 outline-none transition
            ${
              errors?.name
                ? "border-red-500 focus:border-red-500"
                : "border-slate-300 focus:border-blue-500"
            }`}
          required
        />

        {errors?.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name[0]}
          </p>
        )}

      </div>

      {/* Department Code */}

      <div>

        <label className="mb-2 block font-medium text-slate-700">
          Department Code
        </label>

        <input
          type="text"
          value={formData.code}
          onChange={(e) =>
            setFormData({
              ...formData,
              code: e.target.value.toUpperCase(),
            })
          }
          placeholder="IT"
          className={`w-full rounded-lg border p-3 outline-none transition
            ${
              errors?.code
                ? "border-red-500 focus:border-red-500"
                : "border-slate-300 focus:border-blue-500"
            }`}
          required
        />

        {errors?.code && (
          <p className="mt-1 text-sm text-red-500">
            {errors.code[0]}
          </p>
        )}

      </div>

      {/* Description */}

      <div>

        <label className="mb-2 block font-medium text-slate-700">
          Description
        </label>

        <textarea
          rows="4"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          placeholder="Department description..."
          className={`w-full rounded-lg border p-3 outline-none transition
            ${
              errors?.description
                ? "border-red-500 focus:border-red-500"
                : "border-slate-300 focus:border-blue-500"
            }`}
        />

        {errors?.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description[0]}
          </p>
        )}

      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        {editingDepartment
          ? "Update Department"
          : "Save Department"}
      </button>

    </form>
  );
}

export default DepartmentForm;