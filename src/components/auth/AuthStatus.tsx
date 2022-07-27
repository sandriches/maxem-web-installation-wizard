import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom'

function useAuth() {
    return React.useContext(AuthContext);
  }
  

function AuthStatus() {
    let auth = useAuth();
    let navigate = useNavigate();
  
    if (!auth.user) {
      return <p>You are not authenticated. Please enter serial number and password</p>;
    }
  
    return (
      <p>
        Serial number: <b>{auth.user}</b>.{" "}
        
        <button
          onClick={() => {
            auth.signout(() => navigate("/"));
          }}
        >
          Authenticate a different device
        </button>
      </p>
    );
  }

export default AuthStatus