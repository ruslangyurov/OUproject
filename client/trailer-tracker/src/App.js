import React from 'react';
import {BrowserRouter as Router, Routes,Route, useActionData} from "react-router-dom"
import {Inbound} from "./pages/Inbound";
import {Home} from "./pages/Home";
import {EmptyTrailers} from "./pages/EmptyTrailers"
import {Outbound} from "./pages/Outbound";
import { Parking } from './pages/Parking';
import Login from './pages/Login'
import ResponsiveAppBar from './Components/appBar';
import { Layout } from './Components/Layout';
import ListDividers from './Components/Divider';
import {Search} from './pages/Search'
import { useState } from 'react';
import isAuthContext from './isAuth';



export function App() {
  const [isAuth, setIsAuth] = useState(false)
  const setAuth = () => {
    setIsAuth(!isAuth);
};
  return (
    <isAuthContext.Provider value={{isAuth, setAuth}}>
      <div className='App'>

        <Routes>
          <Route path = "/" element = {<Layout />}> 
            <Route index element = {<ListDividers/>}/>
            <Route path = '/Inbound' element = {<Inbound />}/>
            <Route path = '/Outbound' element = {<Outbound />}/>
            <Route path = '/Parking' element = {<Parking />}/>
            <Route path = '/Login' element = {<Login />}/>
            <Route path = '/EmptyTrailers' element = {<EmptyTrailers />}/>
            <Route path = '/Search' element = {<Search />}/>
          </Route>
        </Routes>
      </div>
    </isAuthContext.Provider>
  );
}

// Log to console
console.log('Hello console')

export default App;
