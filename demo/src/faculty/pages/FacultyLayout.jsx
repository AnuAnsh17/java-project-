import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FacultyNavbar } from '../components/FacultyNavbar';
import { FacultySidebar } from '../components/FacultySidebar';
import { DemoHeaderBar } from '../../components/DemoHeaderBar';
import '../styles/faculty.css';

export const FacultyLayout = () => {
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <div>
      <DemoHeaderBar />
      <div className="faculty-app-shell">
        <FacultyNavbar onToggleSidebar={() => setMobileSidebar(!mobileSidebar)} />
        <div className="faculty-main-layout">
          <FacultySidebar mobileOpen={mobileSidebar} onCloseMobile={() => setMobileSidebar(false)} />
          <main className="faculty-content-area">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
