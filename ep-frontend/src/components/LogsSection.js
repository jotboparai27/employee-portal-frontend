import useDashboardLogic from '../hooks/useDashboardLogic';

const LogsSection = () => {
  const { logs } = useDashboardLogic();

  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <h2 className="text-xl font-bold mb-6 text-blue-700">Activity Logs</h2>
      <table className="min-w-full bg-white text-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Event</th>
            <th className="py-2 px-4 border-b">Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-400">No logs found</td>
            </tr>
          )}
          {logs.map((log, i) => (
            <tr key={i}>
              <td className="py-2 px-4 border-b">{new Date(log.date).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{log.event}</td>
              <td className="py-2 px-4 border-b">{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default LogsSection;
