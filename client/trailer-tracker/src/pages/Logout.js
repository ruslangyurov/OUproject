import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../apiContext/authContext';
import axios from '../apiAxios/axios';



export default function Logout() {
  const [errMsg, setErrMsg] = useState("")
  const {auth, setAuth} = useContext(AuthContext)
  const LOGOUT_URL = '/auth/logout'
  
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout()
  }, [])

  const handleLogout = async(e) => {
    //Change isAuth to false and navigate user to the home page
    await axiosInstanse.post(LOGOUT_URL).then(setAuth(auth.token = "")).then(() => navigate('/')).catch(err => {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 404) {
        setErrMsg("Page not found");
      } 
 
})
  }
  return (<h2>bla</h2>)
}