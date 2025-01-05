import {createContext, useState, useContext} from 'react';


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    
    const[auth, setAuth] = useState({})

    const isAuth  = !! auth.accessToken
    const accessToken = auth.accessToken

    return (
        <AuthContext.Provider value = {{accessToken, isAuth, auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context;
}