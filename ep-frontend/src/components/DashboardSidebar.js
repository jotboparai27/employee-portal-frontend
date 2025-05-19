const SidebarButton = ({ label, icon, selected, onClick }) => (
  <button
    className={`flex items-center gap-2 px-4 py-3 w-full rounded-lg transition 
      ${selected ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-blue-50 text-gray-700"}`}
    onClick={onClick}
  >
    {icon} <span>{label}</span>
  </button>
);

const DashboardSidebar = ({ section, setSection }) => (
  <aside className="w-56 min-w-[200px] bg-white shadow-xl flex flex-col py-8 px-4">
       <img src="/logo.png" alt="Company Logo" className="h-auto mr-4" />
    <div className="text-2xl font-extrabold mb-8 text-blue-700 tracking-wide">Admin Panel</div>
    <SidebarButton label="Analytics" selected={section==='analytics'} icon={<i className="fa fa-chart-bar"></i>} onClick={() => setSection('analytics')} />
    <SidebarButton label="Shift Management" selected={section==='shifts'} icon={<i className="fa fa-calendar-alt"></i>} onClick={() => setSection('shifts')} />
    <SidebarButton label="Requests" selected={section==='requests'} icon={<i className="fa fa-envelope-open"></i>} onClick={() => setSection('requests')} />
    <SidebarButton label="Logs" selected={section==='logs'} icon={<i className="fa fa-file-alt"></i>} onClick={() => setSection('logs')} />
  </aside>
);

export default DashboardSidebar;
