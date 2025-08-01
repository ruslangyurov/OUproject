import { Outlet } from "react-router-dom"
import ResponsiveAppBar from "./appBar";
import Login from "../pages/Login";

export const Layout = () => {

  return (
    <>
      <ResponsiveAppBar/>
      <Outlet/>
      
    </>
    
  
    
  ) 
};