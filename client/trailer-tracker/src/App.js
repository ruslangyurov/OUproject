import React from 'react';
import {BrowserRouter as Router, Routes,Route, Link} from "react-router-dom"
import {Inbound} from "./pages/Inbound";
import {Layout} from "./Components/Layout";
import {Home} from "./pages/Home";
import {Outbound} from "./pages/Outbound";
import { Parking } from './pages/Parking';


export function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path = "/" element = {<Home/>}> </Route>
          <Route path = '/Inbound' element = {<Inbound />}></Route>
          <Route path = '/Outbound' element = {<Outbound />}></Route>
          <Route path = '/Parking' element = {<Parking />}></Route>
          <Route path = '/Login' element = {<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

// Log to console
console.log('Hello console')

export default App;
