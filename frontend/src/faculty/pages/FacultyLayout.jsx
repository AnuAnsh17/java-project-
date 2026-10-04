import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FacultyNavbar } from '../components/FacultyNavbar';
import { FacultySidebar } from '../components/FacultySidebar';
import { FacultyProvider } from '../context/FacultyContext';
import '../styles/faculty.css';

export const FacultyLayout = () => {
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <FacultyProvider>
      <div className="faculty-app-shell">
        <FacultyNavbar mobileOpen={mobileSidebar} onToggleSidebar={() => setMobileSidebar(!mobileSidebar)} />
        <div className="faculty-main-layout">
          {mobileSidebar && <button className="workspace-backdrop" type="button" aria-label="Close navigation" onClick={() => setMobileSidebar(false)} />}
          <FacultySidebar mobileOpen={mobileSidebar} onCloseMobile={() => setMobileSidebar(false)} />
          <main className="faculty-content-area">
            <Outlet />
          </main>
        </div>
      </div>
    </FacultyProvider>
  );
};
