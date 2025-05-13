import { useState, useEffect } from 'react';
import {
    getAllShifts,
    addShift,
    updateShift,
    deleteShift,
    getAllEmployees
} from '../utils/api';

const ShiftManagement = () => {
    const [shifts, setShifts] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [newShift, setNewShift] = useState({ date: '', startTime: '', endTime: '' });
    const [editMode, setEditMode] = useState(false);
    const [editShiftId, setEditShiftId] = useState(null);

    // Fetch shifts and employees on load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const shiftData = await getAllShifts();
                setShifts(shiftData);

                const employeeData = await getAllEmployees();
                setEmployees(employeeData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Add or update shift
    const handleAddOrUpdateShift = async () => {
        if (!selectedEmployee) {
            alert('Please select an employee');
            return;
        }

        try {
            if (editMode) {
                await updateShift(editShiftId, {
                    employeeId: selectedEmployee,
                    date: newShift.date,
                    startTime: newShift.startTime,
                    endTime: newShift.endTime
                });
                alert('Shift updated successfully');
            } else {
                await addShift({
                    employeeId: selectedEmployee,
                    date: newShift.date,
                    startTime: newShift.startTime,
                    endTime: newShift.endTime
                });
                alert('Shift added successfully');
            }

            // Refresh shifts list
            const updatedShifts = await getAllShifts();
            setShifts(updatedShifts);
            setNewShift({ date: '', startTime: '', endTime: '' });
            setSelectedEmployee('');
            setEditMode(false);
        } catch (error) {
            alert('Failed to save shift');
        }
    };

    // Delete shift
    const handleDeleteShift = async (id) => {
        try {
            await deleteShift(id);
            alert('Shift deleted successfully');
            const updatedShifts = await getAllShifts();
            setShifts(updatedShifts);
        } catch (error) {
            alert('Failed to delete shift');
        }
    };

    // Set edit mode
    const handleEditShift = (shift) => {
        setEditMode(true);
        setEditShiftId(shift._id);
        setSelectedEmployee(shift.employeeId);
        setNewShift({
            date: shift.date,
            startTime: shift.startTime,
            endTime: shift.endTime
        });
    };

    return (
        <div>
            <h2>Shift Management</h2>
            <div>
                <label>Employee:</label>
                <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                        <option key={emp._id} value={emp._id}>
                            {emp.name} ({emp.email})
                        </option>
                    ))}
                </select>
                <label>Date:</label>
                <input
                    type="date"
                    value={newShift.date}
                    onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
                />
                <label>Start Time:</label>
                <input
                    type="time"
                    value={newShift.startTime}
                    onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
                />
                <label>End Time:</label>
                <input
                    type="time"
                    value={newShift.endTime}
                    onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
                />
                <button onClick={handleAddOrUpdateShift}>
                    {editMode ? 'Update Shift' : 'Add Shift'}
                </button>
            </div>

            <h3>Existing Shifts</h3>
            <ul>
                {shifts.map((shift) => (
                    <li key={shift._id}>
                        {shift.date} | {shift.startTime} - {shift.endTime} |
                        Employee: {shift.employeeId?.name || "Unknown"}
                        <button onClick={() => handleEditShift(shift)}>Edit</button>
                        <button onClick={() => handleDeleteShift(shift._id)}>Delete</button>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default ShiftManagement;
