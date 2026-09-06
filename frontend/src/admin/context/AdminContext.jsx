import React, { createContext } from 'react';

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  return (
    <AdminContext.Provider value={{}}>
      {children}
    </AdminContext.Provider>
  );
};
