import { Link, Outlet } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";


export const Admin = () => {

  const navigate = useNavigate()

  
  
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
        <div className="admin_header_text">Admin</div>
      </div>
      <div className="admin">
        {/* <div className="admin-menu"> */}
          <Link className="admin-link" to = "new-user"><h3>Create New User</h3></Link>
          <Link className="admin-link"><h3>Update User</h3></Link>
          <Link className="admin-link"><h3>Delete User</h3></Link>
          <Link className="admin-link"><h3>Create Bay</h3></Link>
          <Link className="admin-link"><h3>Update Bay</h3></Link>
          <Link className="admin-link"><h3>Delete Bay</h3></Link>
        {/* </div>   */}
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
