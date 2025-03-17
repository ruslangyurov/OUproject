import * as React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../apiAxios/axios";
import Box from '@mui/material/Box';


export const NewUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("")
  
  

  const createNewUser = async() => {

    try {
      await axiosInstance.post("/user", { username, password, role })
      setSuccess("New user added successfully.")

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
  };

 
  return (
    <>
    
      <div className="newUser_container">
        <form onSubmit={createNewUser}>
          <label>Username</label>
          <input
            type="text"
            className="newUser_container_input"
            name="newUserUsername"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            className="newUser_container_input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Role</label>
          <select className="newUser_container_input">
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option selected="blank">Employee</option>
          </select>
        </form>
        <div>
          <input type="submit" className="newUser_submit_button" />
        </div>
      </div>
      <Box 
        sx = {{position:"absolute", bottom:"30%", color:"black", left:"50%", transform:"translate(-50%, -50%)", fontSize:"2vw"}}
        onChange = {() => {if (success) {setSuccess("")}}}>
        <p>{success}</p>
      </Box>
      
        
    </>
  );
};
