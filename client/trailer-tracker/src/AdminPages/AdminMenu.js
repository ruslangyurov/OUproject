import { Link, Outlet } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { useAdminLocation } from "../Components/Location";



export const AdminMenu = () => {

  const navigate = useNavigate()

  
  
  return (
    <>
    
       
      <div className="admin">
        
          <Link className="admin-link" to = "new-user"><h3>Create New User</h3></Link>
          <Link className="admin-link" to = "update-user"><h3>Update User</h3></Link>
          <Link className="admin-link" to = "delete-user"><h3>Delete User</h3></Link>
          <Link className="admin-link" to = "create-bay"><h3>Create Bay</h3></Link>
          <Link className="admin-link" to = "delete-bay"><h3>Update Bay</h3></Link>
          
       
      </div>
          
        {/* <li class="admin">
          <Link className="admin_link" to={"/newUser"}>
            <h3>Update user</h3>
          </Link>
        </li>
        <li class="admin">
          <Link className="admin_link" to={"/newUser"}>
            <h3>Delete user</h3>
          </Link>
        </li>
        <li class="admin">
          <Link className="admin_link" to={"/newUser"}>
            <h3>Create bay</h3>
          </Link>
        </li>
        <li class="admin">
          <Link className="admin_link" to={"/newUser"}>
            <h3>Update bay</h3>
          </Link>
        </li>
        <li class="admin">
          <Link className="admin_link" to={"/newUser"}>
            <h3>Delete bay</h3>
          </Link>
        </li>
      </menu> */}
     
    </>
  );
};
