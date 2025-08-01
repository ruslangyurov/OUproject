import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../Config/AuthContext';
import axiosInstanse from '../apiAxios/axios';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';







export const BasicLogin = () => {
  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const {auth,setAuth} = useContext(AuthContext)
  const LOGIN_URL = '/auth'

  const navigate = useNavigate();

  

  useEffect(() => {
    setErrMsg("")
  },[username, password])

  useEffect(() => {
    if (auth) {
      navigate("/"); // Redirect on successful login
      }
  }, [auth, navigate]);

  const handleLogin = async(e) => {
    e.preventDefault();
    // change isAuth to true when user is logged in and navigate back to the home page
    try {
      const res = await axiosInstanse.post(LOGIN_URL, { username, password });
      setAuth(res.data.accessToken); // Save auth token
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 404) {
        setErrMsg("Page not found");
      } else if (err.response.status === 400) {
        setErrMsg("All fields are required");
      } else if (err.response.status === 401) {
        setErrMsg("Unknown username or password");
      } else {
        setErrMsg("Unknown error");
      }
    }
  };
     
  

  return (
 <> 
   
   {errMsg && (
   <Typography color="error" sx={{ mt: '80px', mb: 1 }}>
    {errMsg}
   </Typography>
  )}


   <Box sx={{ display:"flex", flexWrap:"wrap",mt:"130px", flexDirection: {xs:"column", sm:"column", md:"row", lg:"row"},justifyContent:"flex-start", alignContent:"center" }}>
        <TextField sx={{ width: { xs: "80%", md: "200px" }}}
          required
          type = "String"
          id="Username"
          label="Username"
          value= {username}
          helperText="Please enter username"
          onChange={(e) => {setUsername(e.target.value)}}
          
        />
        <TextField sx={{ width: { xs: "80%", md: "200px" }}}
          required
          type = "Password"
          id="Password"
          label="Password"
          value= {password}
          helperText="Please enter password"
          onChange={(e) => {setPassword(e.target.value)}}
        />

        <Button variant="contained" onClick={handleLogin} sx={{height:53, width: {md:"12%", xs:"100px"}}}>Log in</Button>
        


    </Box>
  </>
  )

  }
