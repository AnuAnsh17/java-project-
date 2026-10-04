import React, { createContext, useState, useEffect } from 'react';
import { studentService } from '../services/studentService';
import { useAuth } from '../../auth/hooks/useAuth';

export const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudentData() {
      try {
        const prof = user?.id ? await studentService.getProfile(user.id) : user;
        setProfile(prof || user);
      } catch (err) {
        console.error('Error loading student context:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStudentData();
  }, [user]);

  return (
    <StudentContext.Provider value={{
      profile,
      loading
    }}>
      {children}
    </StudentContext.Provider>
  );
};
