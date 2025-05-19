import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Automatically attach token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User login
export const loginUser = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data;
};


// Register User
export const registerUser = async (name, email, password, role) => {
  const response = await api.post('/api/auth/register', { name, email, password, role });
  return response.data;  // Expecting { token: "JWT_TOKEN" }
};

// Fetch shifts
export const fetchShifts = async () => {
  const response = await api.get('/api/shifts');
  return response.data;
};

// Fetch recent logs
export const fetchLogs = async () => {
  const response = await api.get('/api/logs');
  return response.data;
};

// Fetch dashboard summary
export const fetchDashboardSummary = async () => {
  const response = await api.get('/api/dashboard/summary');
  return response.data;
};


// Get all shifts
export const getAllShifts = async () => {
  const response = await api.get('/api/shifts');
  return response.data;
};

// Add a new shift
export const addShift = async (shiftData) => {
  const response = await api.post('/api/shifts', shiftData);
  return response.data;
};

// Update an existing shift
export const updateShift = async (id, shiftData) => {
  const response = await api.patch(`/api/shifts/${id}`, shiftData);
  return response.data;
};

// Delete a shift
export const deleteShift = async (id) => {
  const response = await api.delete(`/api/shifts/${id}`);
  return response.data;
};

// Get all employees
export const getAllEmployees = async () => {
  const response = await api.get('/api/employees');
  return response.data;
};

// Fetch all admin requests
export const fetchAllRequests = async () => {
  const response = await api.get('/api/admin/requests/all');
  return response.data;
};

// Approve a request
export const approveRequest = async (id) => {
  const response = await api.patch(`/api/admin/requests/${id}/approve`);
  return response.data;
};

// Reject a request
export const rejectRequest = async (id) => {
  const response = await api.patch(`/api/admin/requests/${id}/reject`);
  return response.data;
};


// Update request status (approve/reject)
export const updateRequestStatus = async (id, status) => {
  try {
    const response = await api.patch(`/api/admin/requests/${id}/${status}`);
    return response.data;
  } catch (error) {
    console.error('Error updating request status:', error);
    throw error;
  }
};

// Fetch shifts for logged-in employee
export const fetchMyShifts = async () => {
  const res = await api.get('/api/my-shifts');
  return res.data;
};

// Fetch requests for logged-in employee
export const fetchMyRequests = async () => {
  const res = await api.get('/api/requests/my');
  return res.data;
};

// Clock in/out (assuming these endpoints exist)
export const clockIn = async () => api.post('/api/clock/in');
export const clockOut = async () => api.patch('/api/clock/out');

export const submitRequest = async (type, details) => {
  const res = await api.post('api/requests', { type, details });
  return res.data;
};

export const fetchMyAnalytics = async () => {
  const res = await api.get('api/clock/my-summary');
  return res.data;
};

export default api;
