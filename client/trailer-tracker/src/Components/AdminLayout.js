import react from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAdminLocation } from './Location';
import HomeIcon from "@mui/icons-material/Home";


export const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useAdminLocation();
  
  return (
    <>
      <div className="admin_homeIcon">
        <HomeIcon onClick = {() => navigate('/')}
          sx={{
            color: "white",
            cursor: "pointer",
            "&:hover": { color: "black" },
          }}
        />
      </div>
      <div className="admin_header_container">
        <div className="admin_header_text">{location}</div>
      </div>
      <Outlet/>
    </>
  )
} 


