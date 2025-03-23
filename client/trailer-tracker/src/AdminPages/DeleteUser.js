import react from 'react';
import {useState} from 'react'
import axiosInstance from '../apiAxios/axios'
import  Box  from '@mui/material/Box';


export const DeleteUser = () => {
    const [resutlMessage, setResultMessage] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("")

    const DELUSER_URL = '/user'

    const handleDelete = async(e) => {
        e.preventDefault()

        try {
            const response = await axiosInstance.delete(DELUSER_URL,{username:username, role:role} )
            setResultMessage(response.data.message)
        } catch (err)  {
            if (err.request) {
                setResultMessage("No server response. Please try again later.")
            } else {
                setResultMessage(err.response.data.message)
            }
            
        }
        }
    


  return (
    
    <div className = "newUser_container">

        <form onSubmit={handleDelete}>
            <label>Username</label>    
            <input 
                className = "newUser_container_input"
                type = "text"
                name = "deleteUserUsername"
                onChange={(e)=> setUsername(e.target.value)}
                />
            <label>Role</label>
            <select 
            className="newUser_container_input"
            name = "deleteUserRole"
            onChange={(e) => setRole(e.target.value)}>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option selected = "blank"></option>
            </select>
            <div>
                <input type="submit" className="newUser_submit_button" />
            </div>
        
        </form>

           
           <Box 
                sx = {{position:"absolute", bottom:"30%", color:"black", left:"50%", transform:"translate(-50%, -50%)", fontSize:"2vw"}}
                onChange = {() => {if (resutlMessage) {setResultMessage("")}}}>
                <p>{resutlMessage}</p>
           </Box>

    </div>
    
  )  
}