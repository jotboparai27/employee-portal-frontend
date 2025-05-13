import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ShiftManagement from './pages/ShiftManagement';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
           {/* <Route path="/shifts" element={<ProtectedRoute><ShiftManagement /></ProtectedRoute>} /> */}
           <Route path="/shifts" element={<ShiftManagement />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
