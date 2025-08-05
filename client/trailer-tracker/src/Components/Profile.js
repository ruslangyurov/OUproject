import React, { useState, useEffect } from "react"
import { useAuth } from "../Config/AuthContext"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Tab } from "@mui/material";
import EditUserInfo from "./EditUserInfo";
import EditUserEmployment from "./EditUserEmployment";
import axiosInstance from "../apiAxios/axios";

export const Profile = () => {
  const [userInfo, setUserInfo] = useState({})
  const {username, role} =  useAuth()
  const [errMsg, setErrMsg] = useState("") 

  const USER_URL = '/user/profile'

  useEffect(() => {
   
    const getUserInfo = async () => {
      await axiosInstance.get(USER_URL).then((response) => {
        setUserInfo(response.data)
      }).catch((err) => {
        setErrMsg(err?.response?.data?.message || "Sth went wrong.")
      })
    }
    getUserInfo();
  },[username])

   
 
  
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
                    <TableCell align="right">{userInfo.name}</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Address</TableCell>
                    <TableCell align="right">{userInfo.address}</TableCell>
                  </TableRow>
                   <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Tel. Number</TableCell>
                    <TableCell align="right">{userInfo.phoneNumber}</TableCell>
                  </TableRow>
                  
              </TableBody>
            </Table>
      </TableContainer>
      <EditUserInfo/>
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
                {userInfo?.employmentHistory?.map((job,index) => (
                 
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