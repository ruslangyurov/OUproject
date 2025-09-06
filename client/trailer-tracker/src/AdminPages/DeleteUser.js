import React from 'react';
import { useState } from 'react';
import axiosInstance from '../apiAxios/axios';
import Box from '@mui/material/Box';
import {useTimer} from '../Components/Timer';

export const DeleteUser = () => {
    const [errMsg, setErrMsg] = useState(null);
    const [success, setSuccess] = useState(null);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");

    const DELUSER_URL = '/user';

    useTimer(success, setSuccess)

    const clearMsg = () => {
        setErrMsg("")
        setSuccess("")
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!username || !role) {
            setErrMsg("Please provide both username and role.");
            return;
            }
        try {
            // Axios DELETE requests require payload to be in a 'data' key
            const response = await axiosInstance.delete(DELUSER_URL, {
                data: { username, role }
            });
            setSuccess(response?.data?.message);
        } catch (err) {
            setErrMsg(err.response?.data?.message || "An error occurred.");
            }
        }
    

    return (
        <>
           {errMsg && <div className = "resMsg" style = {{color:"red"}}>
            {errMsg}
          </div>}
          {success && <div className = "resMsg" style = {{color:"green"}}>
           {success}
          </div>}
            <div className="newUser_container">
                <form className = "form-group"onSubmit={handleDelete}>
                    <label>Username</label>
                    <input
                        className="newUser_container_input"
                        type="text"
                        name="deleteUserUsername"
                        onChange={(e) => setUsername(e.target.value)}
                        onClick = {() => {clearMsg()}}
                    />

                    <label>Role</label>
                    <select
                        className="newUser_container_input"
                        name="deleteUserRole"
                        onChange={(e) => setRole(e.target.value)}
                        onClick = {() => {clearMsg()}}
                        defaultValue=""
                    >
                        <option value="Admin">Admin</option>
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                        <option value="" disabled hidden>Select role</option>
                    </select>

                    <div>
                        <button type="submit" className="newUser_submit_button">Delete User</button>

                    </div>
                </form>

            </div>
        </>    
    );
};
