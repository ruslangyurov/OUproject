import react from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAdminLocation } from './Location';
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useAdminLocation();
  
  return (
    <>
      <div className="admin_header_container">
        <HomeIcon onClick = {() => navigate('/')}
          sx={{
            position:"absolute",
            left:"4px",
            color: "white",
            cursor: "pointer",
            "&:hover": { color: "black" },
          }}
       
        />
         <ArrowBackIcon 
            sx = {{position:"absolute", left:"30px", color:"white", cursor:"pointer", "&:hover": {color: "black"},}}
            onClick = {() => navigate(-1)}
         />
         <ArrowForwardIcon
            sx = {{position:"absolute", right:"10px", color:"white", cursor:"pointer", "&:hover": {color: "black"},}}
            onClick = {() => window.history.forward()}
         />
          <div className="admin_header_text">{location}</div>
      </div>
      <Outlet/>
    </>
  )
} 


