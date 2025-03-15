import { createContext, useState, useContext } from "react";
import {jwtDecode} from "jwt-decode";
import { useMemo } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState("");                 // this will contain the authentication token sent by the server
 
  const contextValue = useMemo(() => {
    if (!auth) {
      return ({isAuth:false, auth, setAuth})
    } else {
      const decoded = jwtDecode(auth);
      const {username, user_id, role}  = decoded.userInfo
      return ({isAuth:true, auth, setAuth, username, role, user_id})
    }
    
  },[auth])


  return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  return useContext(AuthContext);
  
};
