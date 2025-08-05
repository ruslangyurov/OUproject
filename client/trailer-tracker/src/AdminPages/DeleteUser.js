import React from 'react';
import { useState } from 'react';
import axiosInstance from '../apiAxios/axios';
import Box from '@mui/material/Box';

export const DeleteUser = () => {
    const [resultMessage, setResultMessage] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");

    const DELUSER_URL = '/user';

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!username || !role) {
            setResultMessage("Please provide both username and role.");
            return;
}
        try {
            // Axios DELETE requests require payload to be in a 'data' key
            const response = await axiosInstance.delete(DELUSER_URL, {
                data: { username, role }
            });
            setResultMessage(response?.data?.message);
        } catch (err) {
            if (err.request) {
                setResultMessage("No server response. Please try again later.");
            } else {
                setResultMessage(err.response?.data?.message || "An error occurred.");
            }
        }
    };

    return (
        <>
            <div style={{position:"absolute", color:"red", fontSize: "2vw", m: "75px 15px 0 0"}}>
                {resMsg}
            </div>
            <div className="newUser_container">
                <form className = "form-group"onSubmit={handleDelete}>
                    <label>Username</label>
                    <input
                        className="newUser_container_input"
                        type="text"
                        name="deleteUserUsername"
                        onChange={(e) => setUsername(e.target.value)}
                        onClick = {() => {setResultMessage("")}}
                    />

                    <label>Role</label>
                    <select
                        className="newUser_container_input"
                        name="deleteUserRole"
                        onChange={(e) => setRole(e.target.value)}
                        onClick = {() => {setResultMessage("")}}
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
