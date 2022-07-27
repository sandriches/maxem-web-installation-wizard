import React from 'react';

interface AuthContextType {
    user: any;
    signin: (user: string, password: string, callback: ErrorCallback) => void;
    signout: (callback: ErrorCallback) => void;
  }
  
export const AuthContext = React.createContext<AuthContextType>(null!);