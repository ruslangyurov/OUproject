import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export const Admin = () => {
  return (
    <>
      <div className="admin_homeIcon">
        <HomeIcon
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
      <menu class="admin">
        <li class="admin">
          <Link className="admin_link" to={"/newUser"}>
            <h3>Create new user</h3>
          </Link>
        </li>
        <li class="admin">
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
      </menu>
    </>
  );
};
