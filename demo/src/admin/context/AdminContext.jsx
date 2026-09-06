import React, { createContext, useState, useEffect } from 'react';
import { adminService } from '../services/adminService';

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [adminProfile, setAdminProfile] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const prof = await adminService.getProfile();
        const m = await adminService.getDashboardMetrics();
        setAdminProfile(prof);
        setMetrics(m);
      } catch (err) {
        console.error('Error loading admin context:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <AdminContext.Provider value={{ adminProfile, metrics, loading }}>
      {children}
    </AdminContext.Provider>
  );
};
