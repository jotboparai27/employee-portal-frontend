import jwtDecode from "jwt-decode";
import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import { Navigate } from "react-router-dom";

const DashboardRouter = () => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  let role = "";
  try {
    const decoded = jwtDecode(token);
    role = decoded.role;
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  if (role === "admin") return <AdminDashboard />;
  if (role === "employee") return <EmployeeDashboard />;
  return <div>Unauthorized</div>;
};
export default DashboardRouter;
