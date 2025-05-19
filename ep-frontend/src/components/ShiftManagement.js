import useDashboardLogic from '../hooks/useDashboardLogic';

const ShiftManagement = () => {
  const {
    shifts,
    employees,
    selectedEmployee,
    setSelectedEmployee,
    newShift,
    setNewShift,
    editMode,
    handleAddOrUpdateShift,
    handleEditShift,
    handleDeleteShift,
  } = useDashboardLogic();

  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <h2 className="text-xl font-bold mb-6 text-blue-700">Shift Management</h2>
      <form
        className="flex flex-col md:flex-row gap-4 items-center mb-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddOrUpdateShift();
        }}
      >
        <select
          className="border p-2 rounded"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option value={emp._id} key={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="border p-2 rounded"
          value={newShift.date}
          onChange={(e) => setNewShift((prev) => ({ ...prev, date: e.target.value }))}
          required
        />
        <input
          type="time"
          className="border p-2 rounded"
          value={newShift.startTime}
          onChange={(e) => setNewShift((prev) => ({ ...prev, startTime: e.target.value }))}
          required
        />
        <input
          type="time"
          className="border p-2 rounded"
          value={newShift.endTime}
          onChange={(e) => setNewShift((prev) => ({ ...prev, endTime: e.target.value }))}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700" type="submit">
          {editMode ? 'Update Shift' : 'Add Shift'}
        </button>
      </form>
      <table className="min-w-full bg-white text-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Employee</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Start</th>
            <th className="py-2 px-4 border-b">End</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shifts.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-400">No shifts found</td>
            </tr>
          )}
          {shifts.map((shift) => (
            <tr key={shift._id}>
              <td className="py-2 px-4 border-b">
                {shift.employeeId?.name || 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">{shift.date}</td>
              <td className="py-2 px-4 border-b">{shift.startTime}</td>
              <td className="py-2 px-4 border-b">{shift.endTime}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-blue-600 hover:underline mr-2"
                  onClick={() => handleEditShift(shift)}
                >Edit</button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDeleteShift(shift._id)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ShiftManagement;
