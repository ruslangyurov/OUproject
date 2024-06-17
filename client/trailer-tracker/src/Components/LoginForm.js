import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import axios from '../apiAxios/axios';


export const BasicLogin = () => {
  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("")
  const LOGIN_URL = '/auth'
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(LOGIN_URL, {username, password}).then(response => {console.log(response.data); res.send(response.data)})
    

  }

  return (
   <div>
        <TextField
          required
          type = "String"
          id="Username"
          label="Username"
          defaultValue=""
          helperText="Please enter username"
          onChange={(e) => {setUsername(e.target.value)}}
        />
        <TextField 
          required
          type = "Password"
          id="Password"
          label="Password"
          defaultValue=""
          helperText="Please enter password"
          onChange={(e) => {setPassword(e.target.value)}}
        />

        <Button variant="contained" endIcon={<SendIcon />} onClick={handleLogin} sx={{ml:2,height:53, width:100}}>Submit</Button>
        


    </div>
  )

  }

