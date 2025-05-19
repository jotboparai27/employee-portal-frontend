import { useState, useEffect } from 'react';
import {
  fetchDashboardSummary,
  fetchLogs,
  getAllShifts,
  addShift,
  updateShift,
  deleteShift,
  getAllEmployees,
  fetchAllRequests,
  updateRequestStatus,
} from '../utils/api';

const useDashboardLogic = () => {
  const [summary, setSummary] = useState({});
  const [logs, setLogs] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [newShift, setNewShift] = useState({ date: '', startTime: '', endTime: '' });
  const [editMode, setEditMode] = useState(false);
  const [editShiftId, setEditShiftId] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardSummary();
        setSummary(data);

        const logsData = await fetchLogs();
        setLogs(logsData);

        const shiftsData = await getAllShifts();
        setShifts(shiftsData);

        const employeesData = await getAllEmployees();
        setEmployees(employeesData);

        const requestsData = await fetchAllRequests();
        setRequests(requestsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    loadDashboardData();
  }, []);

  const handleAddOrUpdateShift = async () => {
    if (!selectedEmployee) {
      alert('Please select an employee');
      return;
    }

    try {
      const shiftData = {
        employeeId: selectedEmployee,
        date: newShift.date,
        startTime: newShift.startTime,
        endTime: newShift.endTime,
      };

      if (editMode) {
        await updateShift(editShiftId, shiftData);
        alert('Shift updated successfully');
      } else {
        await addShift(shiftData);
        alert('Shift added successfully');
      }

      const updatedShifts = await getAllShifts();
      setShifts(updatedShifts);
      setNewShift({ date: '', startTime: '', endTime: '' });
      setSelectedEmployee('');
      setEditMode(false);
      setEditShiftId(null);
    } catch (error) {
      alert('Failed to add/update shift');
    }
  };

  const handleEditShift = (shift) => {
    setNewShift({
      date: shift.date,
      startTime: shift.startTime,
      endTime: shift.endTime,
    });
    setSelectedEmployee(shift.employeeId);
    setEditShiftId(shift._id);
    setEditMode(true);
  };

  const handleDeleteShift = async (id) => {
    try {
      await deleteShift(id);
      setShifts((prev) => prev.filter((shift) => shift._id !== id));
      alert('Shift deleted successfully');
    } catch (error) {
      alert('Failed to delete shift');
    }
  };

  const handleRequestStatus = async (id, status) => {
    try {
      const response = await updateRequestStatus(id, status);
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: response.status } : req))
      );
      alert(`Request ${status} successfully`);
    } catch (error) {
      alert(`Failed to ${status} request: ${error.message}`);
      console.error('Request update failed:', error);
    }
  };

  return {
    summary,
    logs,
    shifts,
    employees,
    requests,
    selectedEmployee,
    setSelectedEmployee,
    newShift,
    setNewShift,
    editMode,
    handleAddOrUpdateShift,
    handleEditShift,
    handleDeleteShift,
    handleRequestStatus,
  };
};

export default useDashboardLogic;
