import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from '../apiAxios/axios';
import { useContext } from 'react';
import isAuthContext from '../isAuth';





export const BasicLogin = () => {
  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const {isAuth, setAuth} = useContext(isAuthContext)
  const LOGIN_URL = '/auth'

  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("")
  },[username, password])

  const handleLogin = (e) => {
    e.preventDefault();
    // change isAuth to true when user is logged in and navigate back to the home page
    axios.post(LOGIN_URL, {username, password}).then(setAuth).then(navigate('/')).catch(err => {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 404) {
        setErrMsg("Page not found");
      } else if (err.response.status === 400) {
        setErrMsg("All fields are required")
      } else if (err.response.status === 401){
        setErrMsg("Unknown username or password")
      } else {setErrMsg("Unknown error")}
    })
    setUsername("")
    setPassword("")

  }
     
    

  return (
   
   <div>
        <h1>{errMsg}</h1>
        <TextField
          required
          type = "String"
          id="Username"
          label="Username"
          value= {username}
          helperText="Please enter username"
          onChange={(e) => {setUsername(e.target.value)}}
          
        />
        <TextField 
          required
          type = "Password"
          id="Password"
          label="Password"
          value= {password}
          helperText="Please enter password"
          onChange={(e) => {setPassword(e.target.value)}}
        />

        <Button variant="contained" endIcon={<SendIcon />} onClick={handleLogin} sx={{ml:2,height:53, width:100}}>Submit</Button>
        


    </div>
  )

  }

