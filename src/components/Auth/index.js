import React from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children, user }) => {
  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  );
}