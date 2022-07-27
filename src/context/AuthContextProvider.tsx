import React from "react";
import { AuthContext } from "./AuthContext";
import { mockedAuthProvider } from "../services/mockedAuthProvider";

// Provides auth context for auth to be passed to any component in the tree
function AuthContextProvider({ children, resetValues }: { children: React.ReactNode, resetValues: Function }) {
    let [user, setUser] = React.useState<any>(null);
  
    let signin = (newUser: string, password: string, callback: ErrorCallback) => {
      return mockedAuthProvider.auth((err: any) => {
        setUser(newUser);
        callback(err);
      });
    };
  
    let signout = (callback: ErrorCallback) => {
      return mockedAuthProvider.signout((err: any) => {
        setUser(null);
        resetValues();
        callback(err);
      });
    };
  
    let value = { user, signin, signout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }

export default AuthContextProvider