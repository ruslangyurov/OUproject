import react from "react";
import {useState} from 'react';
import axiosInstance from '../apiAxios/axios';


export const UpdateUser = () => {
    const [username, setUsername] = useState("");
    const [newUsername, setNewUsername] = useState("")
    const [role, setRole] = useState("")
    const [newRole, setNewRole] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState("")
    
    
  
    const handleUpdate = async() => {
  
      try {
        await axiosInstance.patch("/user", { username, role, newUsername, newPassword, newRole })
        setSuccess("User updated successfully.")
  
      } catch (err) {
          if (!err?.response) {
            setErrMsg("No Server Response");
          } else if (err.response.status === 404) {
            setErrMsg("Page not found");
          } else if (err.response.status === 400) {
            setErrMsg("All fields are required");
          } else {
            setErrMsg("Unknown error");
          }
      };
    }

      return (
        <>
        
          <div className="newUser_container">
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Username</label> 
                <input 
                    className="newUser_container_input"
                    type = "text" 
                    name = "updateUserUsername"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Role</label>
                <select className="newUser_container_input">
                   <option value="Admin">Admin</option>
                   <option value="Employee">Employee</option>
                   <option value="Manager">Manager</option>
                   <option selected="blank">Employee</option>
                </select>
              </div>
                <label>New Username</label>
                <input 
                   className="newUser_container_input"
                   type = "text" 
                   name = "updateUserNewUsername"
                   onChange={(e) => setNewUsername(e.target.value)}
                />
                <label>New Password</label>
                 <input 
                   className="newUser_container_input"
                   type = "password" 
                   name = "updateUserNewPassword"
                   onChange={(e) => setNewPassword(e.target.value)}
                />
                
                <label> New Role</label>
                <select className="newUser_container_input">
                   <option value="Admin">Admin</option>
                   <option value="Employee">Employee</option>
                   <option value="Manager">Manager</option>
                   <option selected="blank">Employee</option>
                </select>
            </form>
          </div>
        
        </>
      )

    };
  