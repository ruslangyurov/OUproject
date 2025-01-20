import { createContext, useState, useContext } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const isAuth = !!auth.accessToken;
  if (isAuth) {
    const decoded = jwtDecode(auth.accessToken);
    const { username, role } = decoded.userInfo
    
    return (
        <AuthContext.Provider value={{ username, role, isAuth, auth, setAuth }}>
            {children}
        </AuthContext.Provider>
  );
}
  return (
    <AuthContext.Provider value={{isAuth, auth, setAuth }}>
        {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
