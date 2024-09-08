import {useState,useEffect, useRef} from 'react'
import Bay from '../Components/Bay'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useContext } from 'react';
import isAuthContext from '../isAuth';


export const Parking = () => {
    const {isAuth, setAuth} = useContext(isAuthContext)
    return (
     
        <Button variant="contained" endIcon={<SendIcon />} onClick={setAuth}>isAuth</Button>
    

    )
  }
