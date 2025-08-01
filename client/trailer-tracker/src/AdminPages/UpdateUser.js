import * as React from 'react';
import {useState} from 'react';
import axiosInstance from '../apiAxios/axios';
import {Box} from '@mui/material';


export const UpdateUser = () => {
    const [username, setUsername] = useState("");
    const [newUsername, setNewUsername] = useState("")
    const [role, setRole] = useState("")
    const [newRole, setNewRole] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [resMsg, setResMsg] = useState("");
    
    
    
  
    const handleUpdate = async() => {
  
      try {
        await axiosInstance.patch("/user", { username, role, newUsername, newPassword, newRole })
        setResMsg("User updated successfully.")
  
      } catch (err) {
          if (!err?.response) {
            setResMsg("No Server Response");
          } else {
            setResMsg(err.data.message)
          }
      };
    }

      return (
        <>
          
          
          <div className="newUser_container">
            <Box sx={{display:"flex",color:"black", backgroundColor: "#f5f5dc",justifyContent:"center", mt:"60px"}}>
              {resMsg}
            </Box>
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
                <select 
                  className="newUser_container_input"
                  value = {role}
                  onChange={(e) => setRole(e.target.value)}>
                   <option value="Admin">Admin</option>
                   <option value="Employee">Employee</option>
                   <option value="Manager">Manager</option>
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
                <select 
                className="newUser_container_input"
                value = {newRole}
                onChange={(e) => setNewRole(e.target.value)}
                >  
                   <option value="Admin">Admin</option>
                   <option value="Employee">Employee</option>
                   <option value="Manager">Manager</option>
                   
                </select>
                <div>
                  <input type="submit" className="newUser_submit_button" />
                </div>
            </form>
          </div>
        
        </>
      )

    };
  