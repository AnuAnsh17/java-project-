import React, { createContext, useState, useEffect } from 'react';
import { facultyService } from '../services/facultyService';
import { useAuth } from '../../auth/hooks/useAuth';

export const FacultyContext = createContext(null);

export const FacultyProvider = ({ children }) => {
  const { user } = useAuth();
  const [facultyProfile, setFacultyProfile] = useState(user);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const m = await facultyService.getDashboardMetrics();
        setFacultyProfile(user);
        setMetrics(m);
      } catch (err) {
        console.error('Error loading faculty context:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  return (
    <FacultyContext.Provider value={{ facultyProfile, metrics, loading }}>
      {children}
    </FacultyContext.Provider>
  );
};
