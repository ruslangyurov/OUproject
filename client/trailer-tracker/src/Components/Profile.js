import React, { useState, useEffect } from "react"
import { useAuth } from "../Config/AuthContext"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper';
import { Box, Tab } from "@mui/material";
import EditUserInfo from "./EditUserInfo";
import EditUserEmployment from "./EditUserEmployment";
import axiosInstance from "../apiAxios/axios";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

export const Profile = () => {

  const {username, role} =  useAuth()
  const [errMsg, setErrMsg] = useState("") 
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState(""); 
  const [employmentHistory, setEmploymentHistory] = useState(null)
  const USER_URL = '/user/profile'
  const USER_URL_EDIT = '/user/profile/edit'

   const theme = useTheme()
   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
   
    const getUserInfo = () => {
      axiosInstance.get(USER_URL).then((response) => {
        setNewName(response.data.name)
        setNewAddress(response.data.address)
        setNewPhoneNumber(response.data.phoneNumber)
        setEmploymentHistory(response.data.employmentHistory)
      }).catch((err) => {
        setErrMsg(err?.response?.data?.message || "Sth went wrong.")
      })
    }
    getUserInfo();
  },[username])

  const handleUserUpdate = (e) => {
     e.preventDefault();
     axiosInstance.patch(USER_URL_EDIT, {newName, newAddress, newPhoneNumber}).
     then((res) => {
      setNewName(res.data.name)
      setNewAddress(res.data.address)
      setNewPhoneNumber(res.data.phoneNumber)
    }).catch((error) => {
      if (error?.response?.data?.message?.trim().toLowerCase() != "jwt expired".toLowerCase()) {
        setErrMsg(error.response.data.message)
      }
      
     })
    };

   
  if (isSmallScreen) {
    return (
      <Box sx = {{mt:"80px", px:2}}>
       
          <Paper sx = {{mb:2, p:2}}>
            <Typography variant = "subtitle1" sx = {{fontSize:"16px", mb:"6px"}}><strong>Personal Info</strong></Typography>
            <Typography variant = "subtitle2"><strong>Name:</strong>{newName}</Typography>
            <Typography variant="subtitle2"><strong>Address:</strong> {newAddress}</Typography>
            <Typography variant="subtitle2"><strong>Phone Number:</strong> {newPhoneNumber}</Typography>
          </Paper>
          <EditUserInfo 
            newName = {newName}
            setNewName = {setNewName}
            newAddress = {newAddress}
            setNewAddress = {setNewAddress}
            newPhoneNumber = {newPhoneNumber}
            setNewPhoneNumber = {setNewPhoneNumber}
            editButton = {
              <Button variant="contained" sx={{ mt: 2 }} onClick={handleUserUpdate}>
                Save
              </Button>}  />
      </Box>  
    

      <Box sx = {{mt:"80px", px:2}}>
        {employmentHistory.map((job, index) => (
          <Paper key = {index} sx = {{mb:2, p:2}}>
            <Typography variant = "subtitle2"><strong>Department:</strong>{job.department}</Typography>
            <Typography variant="subtitle2"><strong>Position:</strong> {job.position}</Typography>
            <Typography variant="subtitle2"><strong>Stock:</strong> {job.startDate}</Typography>
            <Typography variant="subtitle2"><strong>Comment:</strong> {job.endDate}</Typography>
          </Paper>
        ))}
      </Box> 
    ) 
    
  }
      
   
  
  return (
  <Box sx={{width:"100vw", display:"flex", p:"100px", boxSizing:"border-box", gap:2, flexDirection:"column", alignItems:"center"}}> 
    {errMsg}
    <Box sx = {{ width:{md:"40%", xs:"90%"}, p:"40px", height:"40%"}}>
      <TableContainer component={Paper}>
            <Table sx={{minWidth: "70%"}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", fontSize:"1.3rem", border:"0" }}>Personal Info</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Name</TableCell>
                    <TableCell align="right">{newName}</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Address</TableCell>
                    <TableCell align="right">{newAddress}</TableCell>
                  </TableRow>
                   <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Tel. Number</TableCell>
                    <TableCell align="right">{newPhoneNumber}</TableCell>
                  </TableRow>
                  
              </TableBody>
            </Table>
      </TableContainer>
      <EditUserInfo 
        newName = {newName}
        setNewName = {setNewName}
        newAddress = {newAddress}
        setNewAddress = {setNewAddress}
        newPhoneNumber = {newPhoneNumber}
        setNewPhoneNumber = {setNewPhoneNumber}
        editButton = {<Button variant="contained" sx={{ mt: 2 }} onClick={handleUserUpdate}>
            Save
          </Button>}  />
    </Box>
    <Box sx = {{ width:"40%", p:"40px", height:"40%"}}>
      <Table sx={{minWidth:"40%"}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize:"1.3rem", border:"0" }}>Employment history</TableCell>
              </TableRow>
            </TableHead>
      </Table>
      <TableContainer component={Paper}>
            <Table sx={{ minWidth: "40%"  }} aria-label="simple table">
              
              <TableHead>
                <TableRow>
                  <TableCell  sx={{fontWeight:"bold", fontSize:"0.8rem"}}>Department</TableCell>
                  <TableCell  sx={{fontWeight:"bold", fontSize:"0.8rem"}}>Position</TableCell>
                  <TableCell  sx={{fontWeight:"bold", fontSize:"0.8rem"}}>Start Date</TableCell>
                  <TableCell  sx={{fontWeight:"bold", fontSize:"0.8rem"}}>End Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employmentHistory?.map((job,index) => (
                 
                  <TableRow key = {index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">{job.department}</TableCell>
                    <TableCell align="right">{job.position}</TableCell>
                    <TableCell align="right">{job.startDate}</TableCell>
                    <TableCell align="right">{job.endDate}</TableCell>
                </TableRow>
                
                ))}
              </TableBody>
            </Table>
      </TableContainer>
      <EditUserEmployment/>
      
    </Box>
  </Box>   
  )
  }