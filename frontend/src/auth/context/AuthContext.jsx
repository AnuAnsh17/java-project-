import React, { createContext, useState } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('student');
  const [loading, setLoading] = useState(false);

  const value = {
    user,
    setUser,
    selectedRole,
    setSelectedRole,
    loading,
    setLoading,
    validateCollegeEmail: authService.validateCollegeEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
