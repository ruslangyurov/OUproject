import { createContext, useState, useContext } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState("");

  const isAuth = !!auth;
  if (isAuth) {
    const decoded = jwtDecode(auth);
    const { username, role, user_id } = decoded.userInfo
    
    return (
        <AuthContext.Provider value={{ username, user_id, role, isAuth, auth, setAuth }}>
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
