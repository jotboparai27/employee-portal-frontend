import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import {
  fetchMyShifts,
  clockIn,
  clockOut,
  fetchMyRequests,
  submitRequest,
  fetchMyAnalytics,
} from "../utils/api";

const EmployeeDashboard = () => {
  const [shifts, setShifts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [clockStatus, setClockStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [requestType, setRequestType] = useState("shift_swap");
  const [requestDetails, setRequestDetails] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");

  // Get employee name from token
  const token = localStorage.getItem("token");
  let employeeName = "Employee";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      employeeName = decoded.name || "Employee";
    } catch (e) {}
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const shiftData = await fetchMyShifts();
        setShifts(Array.isArray(shiftData) ? shiftData : []);
        const requestData = await fetchMyRequests();
        setRequests(Array.isArray(requestData) ? requestData : []);
        const analyticsData = await fetchMyAnalytics?.();
        setAnalytics(analyticsData);
      } catch (e) {
        setShifts([]);
        setRequests([]);
        setAnalytics(null);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Clock in/out handlers
  const handleClockIn = async () => {
    try {
      await clockIn();
      setClockStatus("in");
      alert("Clocked In!");
    } catch (e) {
      alert("Clock In failed!");
    }
  };
  const handleClockOut = async () => {
    try {
      await clockOut();
      setClockStatus("out");
      alert("Clocked Out!");
    } catch (e) {
      alert("Clock Out failed!");
    }
  };

  // Submit request
  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitMsg("");
    try {
      await submitRequest(requestType, requestDetails);
      setSubmitMsg("Request submitted!");
      setRequestDetails("");
      // refresh requests
      const requestData = await fetchMyRequests();
      setRequests(Array.isArray(requestData) ? requestData : []);
    } catch {
      setSubmitMsg("Failed to submit request.");
    }
    setSubmitLoading(false);
  };

  // Helper for pretty dates
  const prettyDate = (str) => {
    if (!str) return "";
    const date = new Date(str);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#f5eee6]">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-6">
          <div className="flex items-center gap-2">
            <img src="/logo.png" className="h-10" alt="Logo" />
            <span className="font-bold text-xl text-[#525c6b]">
              PGC Employee Portal
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#525c6b] font-medium">
              {employeeName}
            </span>
            <button
              className="text-sm bg-[#6c6e72] text-white px-3 py-1 rounded hover:bg-[#313744] transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-10 space-y-14 px-4">
        {/* Analytics */}
        <section>
          <h2 className="text-2xl font-bold text-[#313744] mb-4 flex items-center gap-2">
            <span role="img" aria-label="analytics">📊</span> Analytics
          </h2>
          {analytics ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 shadow border border-[#e5e6ea] text-center">
                <div className="text-gray-500">Total Shifts</div>
                <div className="text-2xl font-bold text-[#525c6b]">{analytics.totalShifts}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow border border-[#e5e6ea] text-center">
                <div className="text-gray-500">Hours Worked</div>
                <div className="text-2xl font-bold text-[#525c6b]">{analytics.totalHours}</div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500">No analytics found.</div>
          )}
        </section>

        {/* Clock In/Out and Shifts */}
        <section>
          <h2 className="text-2xl font-bold text-[#313744] mb-4 flex items-center gap-2">
            <span role="img" aria-label="shifts">🕒</span> Shifts
          </h2>
          <div className="bg-white rounded-xl shadow border border-[#e5e6ea] p-6 flex flex-wrap items-center gap-4 mb-6">
            <button
              onClick={handleClockIn}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold"
            >
              Clock In
            </button>
            <button
              onClick={handleClockOut}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold"
            >
              Clock Out
            </button>
            <span className="ml-4 text-gray-500">
              {clockStatus && `You are clocked ${clockStatus}`}
            </span>
          </div>
          {/* Shifts Table */}
          {loading ? (
            <div>Loading...</div>
          ) : shifts.length === 0 ? (
            <div className="text-gray-500">No shifts found.</div>
          ) : (
            <div className="bg-white rounded-xl shadow border border-[#e5e6ea] p-6 flex flex-wrap items-center gap-4 mb-6">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#f5eee6]">
                  <th className="py-2 px-4 border-b border-[#e5e6ea] text-left">Date</th>
                  <th className="py-2 px-4 border-b border-[#e5e6ea] text-left">Start</th>
                  <th className="py-2 px-4 border-b border-[#e5e6ea] text-left">End</th>
                </tr>
              </thead>
              <tbody>
                {shifts.map((s) => (
                  <tr key={s._id} className="hover:bg-[#f5eee6]/50">
                    <td className="py-2 px-4 border-b border-[#e5e6ea]">
                      {prettyDate(s.date)}
                    </td>
                    <td className="py-2 px-4 border-b border-[#e5e6ea]">{s.startTime}</td>
                    <td className="py-2 px-4 border-b border-[#e5e6ea]">{s.endTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </section>

        {/* Requests */}
        <section>
          <h2 className="text-2xl font-bold text-[#313744] mb-4 flex items-center gap-2">
            <span role="img" aria-label="requests">📋</span> Requests
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow border border-[#e5e6ea] p-6">
              <h3 className="text-lg font-semibold mb-4 text-[#525c6b]">Submit a Request</h3>
              <form onSubmit={handleSubmitRequest} className="flex flex-col gap-3">
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="border border-[#d5d7df] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#525c6b] w-full"
                >
                  <option value="shift_swap">Shift Swap</option>
                  <option value="benefit">Benefit Request</option>
                </select>
                <input
                  type="text"
                  className="border border-[#d5d7df] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#525c6b] w-full"
                  placeholder="Details"
                  value={requestDetails}
                  required
                  onChange={(e) => setRequestDetails(e.target.value)}
                />
                <button
                  type="submit"
                  className={`bg-[#525c6b] hover:bg-[#313744] text-white font-semibold px-6 py-2 rounded transition-colors ${
                    submitLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={submitLoading}
                >
                  {submitLoading ? "Submitting..." : "Submit"}
                </button>
                {submitMsg && (
                  <div className="text-sm mt-2 text-[#525c6b]">{submitMsg}</div>
                )}
              </form>
            </div>
            <div className="bg-white rounded-xl shadow border border-[#e5e6ea] p-6">
              <h3 className="text-lg font-semibold mb-4 text-[#525c6b]">Your Requests</h3>
              {loading ? (
                <div>Loading...</div>
              ) : requests.length === 0 ? (
                <div className="text-gray-500">No requests found.</div>
              ) : (
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-[#f5eee6]">
                      <th className="py-2 px-4 border-b border-[#e5e6ea] text-left">Type</th>
                      <th className="py-2 px-4 border-b border-[#e5e6ea] text-left">Details</th>
                      <th className="py-2 px-4 border-b border-[#e5e6ea] text-left">Status</th>
                      <th className="py-2 px-4 border-b border-[#e5e6ea] text-left">Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((r) => (
                      <tr key={r._id} className="hover:bg-[#f5eee6]/50">
                        <td className="py-2 px-4 border-b border-[#e5e6ea] capitalize">
                          {r.type.replace("_", " ")}
                        </td>
                        <td className="py-2 px-4 border-b border-[#e5e6ea]">{r.details}</td>
                        <td className="py-2 px-4 border-b border-[#e5e6ea] capitalize">{r.status}</td>
                        <td className="py-2 px-4 border-b border-[#e5e6ea]">
                          {prettyDate(r.submittedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
