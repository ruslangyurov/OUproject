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
import { Layout } from './Components/Layout';
import {AdminLayout} from './Components/AdminLayout';
import {AdminMenu} from './pages/AdminMenu';
import {NewUser} from './pages/NewUser';
import {Search} from './pages/Search'
import { useState } from 'react';
import { AuthContextProvider } from './apiContext/AuthContext';
import {ProtectedRoute} from './Components/ProtectedRoute';
import { RequestInterceptor, ResponseInterceptor } from './apiAxios/axios';
import "./App.css"; 


export function App() {
  

  return (
    
      <div className='App'>
        <AuthContextProvider>
          <RequestInterceptor/>
          <ResponseInterceptor/>
          <Routes>
            <Route path = "/" element = {<Layout />}> 
              <Route index element = {<Home/>}/>
              <Route path = '/Login' element = {<Login/>} />
              <Route path = '/Logout' element = {<Logout />} />
              <Route element = {<ProtectedRoute/>}>
                <Route path = '/Inbound' element = {<Inbound />}/>
                <Route path = '/Outbound' element = {<Outbound />}/>
                <Route path = '/Parking' element = {<Parking />}/>
                <Route path = '/Empty Trailers' element = {<EmptyTrailers />}/>
                <Route path = '/Full Trailers' element = {<FullTrailers />}/>
                <Route path = '/Search' element = {<Search />}/>
             </Route> 
              <Route element = {<ProtectedRoute/>}>
                  <Route path = '/Admin' element = {<AdminMenu />}/>
                  <Route path = '/NewUser' element = {<NewUser />}/>
              </Route>

           
           </Route>
          </Routes>
          
           
         
        </AuthContextProvider>
        
      </div>
  )
}

// Log to console
console.log('Hello console')

export default App;

