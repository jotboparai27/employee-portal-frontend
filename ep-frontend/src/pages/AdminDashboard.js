import { useState } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import TopBar from '../components/TopBar';
import Analytics from '../components/Analytics';
import ShiftManagement from '../components/ShiftManagement';
import RequestsManagement from '../components/RequestsManagement';
import LogsSection from '../components/LogsSection';

const Dashboard = () => {
  const [section, setSection] = useState('analytics');
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar section={section} setSection={setSection} />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {section === 'analytics' && <Analytics />}
          {section === 'shifts' && <ShiftManagement />}
          {section === 'requests' && <RequestsManagement />}
          {section === 'logs' && <LogsSection />}
        </main>
      </div>
    </div>
  );
};
export default Dashboard;
