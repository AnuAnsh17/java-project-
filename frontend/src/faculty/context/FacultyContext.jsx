import React, { createContext } from 'react';

export const FacultyContext = createContext(null);

export const FacultyProvider = ({ children }) => {
  return (
    <FacultyContext.Provider value={{}}>
      {children}
    </FacultyContext.Provider>
  );
};
