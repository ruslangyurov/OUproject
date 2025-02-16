import { createContext, useState, useContext } from "react";
import {jwtDecode} from "jwt-decode";
import { useCallback } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState("");                 // this will contain the authentication token sent by the server
  const[wsConnected, setWsConnected] = useState(false) // is the user connected to the server via a TCP socket
  
  const onConnect = useCallback(() => {  
    setWsConnected(true);
  }, []);

  const onDisconnect = useCallback(() => {  
    setWsConnected(false);
  }, []);


  

  const contextValue = {auth, setAuth, isAuth}

  const isAuth = !!auth;

  if (isAuth) {
    const decoded = jwtDecode(auth);
    const { username, role, user_id } = decoded.userInfo
    contextValue = { ...contextValue, username, user_id, role, wsConnected, onConnect, onDisconnect };
   
}
  return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
