import * as React from "react";
import { useState } from "react";
import axiosInstance from "../apiAxios/axios";
import {useTimer} from '../Components/Timer';

export const NewUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [success, setSuccess] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  useTimer(success, setSuccess)
 

  const clearMessages = () => {
    setErrMsg("");
    setSuccess("");
  };

  const createNewUser = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/user", {
        username,
        password,
        role,
        name,
        address,
        phone
      });
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
      {errMsg && <div className = "resMsg" style = {{color:"red"}}>
            {errMsg}
          </div>}
      {success && <div className = "resMsg" style = {{color:"green"}}>
           {success}
          </div>}
           
      <div className="newUser_container">
          <div className="form-columns" onSubmit={createNewUser}>
            {/* First Column */}
            <div className="form-column">
              <label>Username</label>
              <input
                type="text"
                className="form-columns-input"
                onChange={(e) => setUsername(e.target.value)}
                onClick={clearMessages}
              />

              <label>Password</label>
              <input
                type="password"
                className="form-columns-input"
                onChange={(e) => setPassword(e.target.value)}
                onClick={clearMessages}
              />

              <label>Role</label>
              <select
                className="form-columns-input"
                onChange={(e) => setRole(e.target.value)}
                onClick={clearMessages}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select role
                </option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            {/* Second Column */}
            <div className="form-column">
              <label>Name</label>
              <input
                type="text"
                className="form-columns-input"
                onChange={(e) => setName(e.target.value)}
                onClick={clearMessages}
              />

              <label>Address</label>
              <input
                type="text"
                className="form-columns-input"
                onChange={(e) => setAddress(e.target.value)}
                onClick={clearMessages}
              />

              <label>Phone Number</label>
              <input
                type="tel"
                className="form-columns-input"
                onChange={(e) => setPhone(e.target.value)}
                onClick={clearMessages}
              />
            </div>
          </div>

          <div>
            <input type="submit" className="newUser_submit_button" />
          </div>
        </form>
      </div>
    </>
  );
};
