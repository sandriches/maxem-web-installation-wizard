import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useLocation } from 'react-router-dom';

function useAuth() {
    return React.useContext(AuthContext);
}

// Functions to prevent unauthorized users from accessing device selection
function RequireAuth({ children }: { children: JSX.Element[] }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return <>{children}</>;
}

function RequireNoAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (auth.user) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return children;
  }
  

export { RequireAuth, RequireNoAuth }