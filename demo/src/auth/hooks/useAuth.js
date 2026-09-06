import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: { name: 'Anurag Yadav', role: 'student', email: 'anurag.yadav@tsdcem.ac.in' },
      selectedRole: 'student',
      setSelectedRole: () => {},
      loading: false,
      setLoading: () => {},
      validateCollegeEmail: (email) => /^[a-zA-Z0-9._%+-]+@tsdcem\.ac\.in$/.test(email)
    };
  }
  return context;
};
