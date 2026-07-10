function DepartmentForm({
  formData,
  setFormData,
  handleSubmit,
  editingDepartment,
}) {

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <div>

        <label className="mb-2 block font-medium">
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
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          required
        />

      </div>

      <div>

        <label className="mb-2 block font-medium">
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
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          required
        />

      </div>

      <div>

        <label className="mb-2 block font-medium">
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
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
        />

      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white"
        >
        {editingDepartment ? "Update Department" : "Save Department"}
        </button>

    </form>

  );

}

export default DepartmentForm;