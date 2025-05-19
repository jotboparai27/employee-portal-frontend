import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import useDashboardLogic from '../hooks/useDashboardLogic';
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const { summary } = useDashboardLogic();

  const data = {
    labels: ['Employees', 'Shifts', 'Requests'],
    datasets: [
      {
        label: 'Count',
        data: [
          summary?.totalEmployees || 0,
          summary?.totalShifts || 0,
          summary?.totalRequests || 0,
        ],
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <h2 className="text-xl font-bold mb-6 text-blue-700">Analytics Overview</h2>
      <div className="max-w-xl">
        <Bar data={data} />
      </div>
      {!summary && <div className="text-gray-500 mt-4">Loading analytics...</div>}
    </div>
  );
};
export default Analytics;
