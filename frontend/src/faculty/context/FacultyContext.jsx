import React, { createContext, useState, useEffect } from 'react';
import { facultyService } from '../services/facultyService';

export const FacultyContext = createContext(null);

export const FacultyProvider = ({ children }) => {
  const [facultyProfile, setFacultyProfile] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const prof = await facultyService.getProfile();
        const m = await facultyService.getDashboardMetrics();
        setFacultyProfile(prof);
        setMetrics(m);
      } catch (err) {
        console.error('Error loading faculty context:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <FacultyContext.Provider value={{ facultyProfile, metrics, loading }}>
      {children}
    </FacultyContext.Provider>
  );
};
