import { createContext, useState, useContext } from "react";
import {jwtDecode} from "jwt-decode";
import { useMemo, useEffect } from "react";
import axiosInstance from '../apiAxios/axios';
import {refreshToken} from './RefreshHelper';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState("");                 // this will contain the authentication token sent by the server
  
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const newToken = await refreshToken();
        setAuth(newToken);
      } catch (err) {
        console.log(err?.message);
      }
    };

    if (!auth) {
      refreshToken();
    }
  }, []);


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
