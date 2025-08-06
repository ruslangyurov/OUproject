import * as React from "react";
import { useState } from "react";
import axiosInstance from "../apiAxios/axios";
import Box from '@mui/material/Box';

export const NewUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [success, setSuccess] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  // Function to create a new user
  const createNewUser = async (e) => {
    e.preventDefault(); 

    try {
      await axiosInstance.post("/user", { username, password, role });
      setSuccess("New user added successfully.");
      
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg(err.response?.data?.message || "Something went wrong");

      }
    }
  };

  return (
    <>
      {errMsg && ( <div style={{ position: "absolute", color: "red", fontSize: "2vw", margin: "75px 15px 0 0" }}>
        {errMsg}
      </div>
      )}
      {success && ( <div style={{ position: "absolute", color: "red", fontSize: "2vw", margin: "75px", left:"50%", transform:"translateX(-50%)" }}>
        {errMsg}
      </div>
      )}

      <div className="newUser_container">
        <form className="form-group" onSubmit={createNewUser}>
          <label>Username</label>
          <input
            type="text"
            className="newUser_container_input"
            name="newUserUsername"
            onChange={(e) => setUsername(e.target.value)}
            onClick={() => {62
("")}}
          />

          <label>Password</label>
          <input
            type="password"
            className="newUser_container_input"
            onChange={(e) => setPassword(e.target.value)} 
            onClick={() => {setErrMsg(""); setSuccess("")}}
          />

          <label>Role</label>
          <select
            className="newUser_container_input"
            onChange={(e) => setRole(e.target.value)}
            onClick={() => {setErrMsg(""); setSuccess("")}} 
            defaultValue="" 
          >
            <option value="" disabled hidden>Select role</option>
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
  );
};
