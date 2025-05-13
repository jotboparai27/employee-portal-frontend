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
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
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

export default api;
