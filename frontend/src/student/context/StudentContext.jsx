import React, { createContext } from 'react';

export const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  return (
    <StudentContext.Provider value={{}}>
      {children}
    </StudentContext.Provider>
  );
};
