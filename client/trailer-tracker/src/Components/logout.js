import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const LOGOUT_URL = '/auth/logout'

const navigate = useNavigate();

const handleLogout = async(e) => {
  e.preventDefault();
  await axios.post(LOGOUT_URL).then(() => navigate('/')).catch(err => {
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
  

}
   
<Button variant="contained" endIcon={<SendIcon />} onClick={handleLogout} sx={{ml:2,height:53, width:100}}>Logout</Button>
      




