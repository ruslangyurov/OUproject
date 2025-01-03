import React from 'react';
import {BrowserRouter as Router, Routes,Route, useActionData} from "react-router-dom"
import {Inbound} from "./pages/Inbound";
import {Home} from "./pages/Home";
import {EmptyTrailers} from "./pages/EmptyTrailers"
import {FullTrailers} from "./pages/FullTrailers"
import {Outbound} from "./pages/Outbound";
import { Parking } from './pages/Parking';
import Login from './pages/Login'
import Logout from './pages/Logout';
import ResponsiveAppBar from './Components/appBar';
import { Layout } from './Components/Layout';
import ListDividers from './Components/Divider';
import {Search} from './pages/Search'
import { useState } from 'react';
import { AuthContextProvider } from './apiContext/AuthContext';
import {ProtectedRoute} from './Components/ProtectedRoute';



export function App() {
  

  return (
    
      <div className='App'>
        <AuthContextProvider>
          <Routes>
            <Route path = "/" element = {<Layout />}> 
              <Route index element = {<ListDividers/>}/>
              <Route element = {<ProtectedRoute/>}>
                <Route path = '/Inbound' element = {<Inbound />}/>
              </Route>

              
              <Route path = '/Outbound' element = {<Outbound />}/>
              <Route path = '/Parking' element = {<Parking />}/>
              <Route path = '/Login' element = {<Login />}/>
              <Route path = '/Logout' element = {<Logout />}/>
              <Route path = '/Empty Trailers' element = {<EmptyTrailers />}/>
              <Route path = '/Full Trailers' element = {<FullTrailers />}/>
              <Route path = '/Search' element = {<Search />}/>
            </Route>
          </Routes>
        </AuthContextProvider>
        
      </div>
  )
}

// Log to console
console.log('Hello console')

export default App;