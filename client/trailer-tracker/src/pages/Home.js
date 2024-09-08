
import ResponsiveAppBar from '../Components/appBar'
import ListDividers from '../Components/Divider'
import { useContext } from 'react';
import isAuthContext from '../isAuth';
import { is } from 'date-fns/locale';




export const Home = () => {
    // is user authenticated
    const {isAuth, setAuth} = useContext(isAuthContext)

    if (isAuth) {
        return (
            <div>
                <ResponsiveAppBar/>
                <ListDividers />
            </div>
    
        ) 
    } else {
        return 
        <h2>Please Login</h2>
    }
   
  
};
