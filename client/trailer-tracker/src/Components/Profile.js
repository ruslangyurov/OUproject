import React, { useState } from "react"
import { useAuth } from "../Config/AuthContext"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";
import EditUserInfo from "./EditUserInfo";

export const Profile = () => {
  const [hasRights, setHasRights] = useState(null)
  const {username, role} =  useAuth()

  const bla = "admin"
  //bla === "admin" ? setHasRights(true):  
  
  return (
  <Box sx={{width:"100vw", display:"flex", p:"100px", boxSizing:"border-box", gap:2, flexDirection:"column", alignItems:"center"}}> 
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
                    <TableCell align="right">Roskata</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Address</TableCell>
                    <TableCell align="right">Shefche</TableCell>
                  </TableRow>
                   <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Tel. Number</TableCell>
                    <TableCell align="right">0888888</TableCell>
                  </TableRow>
                  
              </TableBody>
            </Table>
      </TableContainer>
      <EditUserInfo/>
    </Box>
    <Box sx = {{ width:"40%", p:"40px", height:"40%"}}>
      <TableContainer component={Paper}>
            <Table sx={{ minWidth: "40%"  }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", fontSize:"1.3rem", border:"0" }}>Employment history</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Usernam</TableCell>
                    <TableCell align="right">Gudjukuchu</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Role</TableCell>
                    <TableCell align="right">Employee</TableCell>
                  </TableRow>
                   <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Title</TableCell>
                    <TableCell align="right">Tapunget</TableCell>
                  </TableRow>
                   <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">Period</TableCell>
                    <TableCell align="right">All the time</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
      </TableContainer>
      
    </Box>
  </Box>   
  )
  }