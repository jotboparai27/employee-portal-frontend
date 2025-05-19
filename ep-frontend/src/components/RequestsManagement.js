import useDashboardLogic from '../hooks/useDashboardLogic';

const RequestsManagement = () => {
  const { requests, handleRequestStatus } = useDashboardLogic();

  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <h2 className="text-xl font-bold mb-6 text-blue-700">Requests Management</h2>
      <table className="min-w-full bg-white text-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Employee</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Details</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-400">No requests found</td>
            </tr>
          )}
          {requests.map((req) => (
            <tr key={req._id}>
              <td className="py-2 px-4 border-b">
                {req.userId?.name || 'Unknown'}
              </td>
              <td className="py-2 px-4 border-b">{req.type}</td>
              <td className="py-2 px-4 border-b">{req.details}</td>
              <td className="py-2 px-4 border-b capitalize">{req.status}</td>
              <td className="py-2 px-4 border-b">
                {req.status === 'pending' && (
                  <>
                    <button className="text-green-600 hover:underline mr-2"
                      onClick={() => handleRequestStatus(req._id, 'approve')}
                    >Approve</button>
                    <button className="text-red-600 hover:underline"
                      onClick={() => handleRequestStatus(req._id, 'reject')}
                    >Reject</button>
                  </>
                )}
                {req.status !== 'pending' && <span>-</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default RequestsManagement;
