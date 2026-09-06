import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { StudentNavbar } from '../components/Navbar';
import { StudentSidebar } from '../components/Sidebar';
import { DemoHeaderBar } from '../../components/DemoHeaderBar';
import '../styles/student.css';

export const StudentLayout = () => {
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <div>
      <DemoHeaderBar />
      <div className="student-app-shell">
        <StudentNavbar onToggleSidebar={() => setMobileSidebar(!mobileSidebar)} />
        <div className="student-main-layout">
          <StudentSidebar mobileOpen={mobileSidebar} onCloseMobile={() => setMobileSidebar(false)} />
          <main className="student-content-area">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
