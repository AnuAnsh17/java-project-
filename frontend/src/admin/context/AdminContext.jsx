import React, { createContext, useState, useEffect } from 'react';
import { adminService } from '../services/adminService';
import { useAuth } from '../../auth/hooks/useAuth';

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const { user } = useAuth();
  const [adminProfile, setAdminProfile] = useState(user);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const m = await adminService.getDashboardMetrics();
        setAdminProfile(user);
        setMetrics(m);
      } catch (err) {
        console.error('Error loading admin context:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  return (
    <AdminContext.Provider value={{ adminProfile, metrics, loading }}>
      {children}
    </AdminContext.Provider>
  );
};
