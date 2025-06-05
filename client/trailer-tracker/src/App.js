import React from 'react';
import "normalize.css";
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
import {AdminMenu} from './AdminPages/AdminMenu';
import {NewUser} from './AdminPages/NewUser';
import {UpdateUser} from './AdminPages/UpdateUser';
import {DeleteUser} from './AdminPages/DeleteUser';
import {CreateBays} from './AdminPages/DeleteUser';
import {Search} from './pages/Search'
import { useState } from 'react';
import { AuthContextProvider } from './Config/AuthContext';
import { SocketContextProvider } from './Config/SocketContext';
import {ProtectedRoute} from './Components/ProtectedRoute';
import { RequestInterceptor, ResponseInterceptor } from './apiAxios/axios';
import "./App.css"; 
import { Profile } from './Components/Profile';



export function App() {
 
 
  return (
    
      <div className='App'>
        <AuthContextProvider>
          <SocketContextProvider>
            <RequestInterceptor/>
            <ResponseInterceptor/>
            <Routes>
              <Route path = "/" element = {<Layout />}> 
                <Route index element = {<Home/>}/>
                <Route path = '/Login' element = {<Login/>} />
                <Route path = '/Logout' element = {<Logout />} />
                <Route path = '/Inbound' element = {<Inbound />}/>
                <Route path = '/Outbound' element = {<Outbound />}/>
                <Route path = '/Parking' element = {<Parking />}/>
                <Route path = '/Empty-Trailers' element = {<EmptyTrailers />}/>
                <Route path = '/Full-Trailers' element = {<FullTrailers />}/>
                <Route path = '/Search' element = {<Search />}/>
                <Route path = '/Profile' element = {<Profile />}/>
              </Route> 
              
              <Route path="/Admin" element={<AdminLayout />}>
                <Route path="menu" element={<AdminMenu />} />
                <Route path="menu/new-user" element={<NewUser />} />  
                <Route path="menu/update-user" element={<UpdateUser />} /> 
                <Route path="menu/delete-user" element={<DeleteUser />} /> 
                <Route path="menu/create-bays" element={<CreateBays />} /> 
              </Route>

            </Routes>
          </SocketContextProvider>
        </AuthContextProvider>
        
      </div>
  )
}

// Log to console
console.log('Hello console')

export default App;



{/* <AuthContextProvider>
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
</AuthContextProvider> */}
