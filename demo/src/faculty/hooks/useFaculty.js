import { useContext } from 'react';
import { FacultyContext } from '../context/FacultyContext';

export const useFaculty = () => {
  const context = useContext(FacultyContext);
  if (!context) {
    throw new Error('useFaculty must be used within a FacultyProvider');
  }
  return context;
};
