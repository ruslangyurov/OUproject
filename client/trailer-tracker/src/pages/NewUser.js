import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../apiAxios/axios";
import { useContext } from "react";
import { AuthContext } from "../apiContext/AuthContext";
import { useAdminLocation } from "../Components/Location";

export const NewUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errMsg, setErrMsg] = useState("");

  

  const Navigate = useNavigate();

  

  const createNewUser = async () => {
    await axios.post("/user", { username, password, role }).catch((err) => {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 404) {
        setErrMsg("Page not found");
      } else if (err.response.status === 400) {
        setErrMsg("All fields are required");
      } else {
        setErrMsg("Unknown error");
      }
    });
  };

  const handleClick = () => {
    Navigate(-1);
  };

  return (
    <>
    
      <div className="newUser_container">
        <form onSubmit={createNewUser}>
          <label>Username</label>
          <input
            type="text"
            className="newUser_container_input"
            name="userInput"
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
    </>
  );
};
