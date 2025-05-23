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

export const Profile = () => {
  const [hasRights, setHasRights] = useState(null)
  const {username, role} =  useAuth()

  const bla = "admin"
  //bla === "admin" ? setHasRights(true):  
  
  return (
  <Box sx={{width:"100vw", display:"flex", p:"100px", boxSizing:"border-box", gap:2}}> 
    <Box sx = {{ border: '3px solid #e0e0e0', borderRadius:"2", width:"40%", p:"40px", height:"auto"}}>
      <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650  }} aria-label="simple table">
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
    </Box>
    <Box sx = {{ border: '3px solid #e0e0e0', borderRadius:"2", width:"40%", p:"40px", height:"auto"}}>
      <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650  }} aria-label="simple table">
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