import { useState, useEffect } from 'react';
import { fetchDashboardSummary } from '../utils/api';
import DashboardCard from '../components/DashboardCard';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    totalShifts: 0,
    shiftsToday: 0,
    totalRequests: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    loadDashboardData();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>
      <div style={styles.cardContainer}>
        <DashboardCard title="Total Employees" value={summary.totalEmployees} />
        <DashboardCard title="Total Shifts" value={summary.totalShifts} />
        <DashboardCard title="Shifts Today" value={summary.shiftsToday} />
        <DashboardCard title="Total Requests" value={summary.totalRequests} />
        <DashboardCard title="Pending Requests" value={summary.pendingRequests} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  cardContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
};

export default Dashboard;
