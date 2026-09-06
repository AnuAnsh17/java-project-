import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminProvider } from '../context/AdminContext';
import '../styles/admin.css';

export const AdminLayout = () => {
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <AdminProvider>
      <div className="admin-app-shell">
        <AdminNavbar onToggleSidebar={() => setMobileSidebar(!mobileSidebar)} />
        <div className="admin-main-layout">
          <AdminSidebar mobileOpen={mobileSidebar} onCloseMobile={() => setMobileSidebar(false)} />
          <main className="admin-content-area">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminProvider>
  );
};
