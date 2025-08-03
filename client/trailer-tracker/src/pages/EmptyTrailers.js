
import React, { useState, useEffect } from 'react';
import axiosInstanse from '../apiAxios/axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Box, Typography, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';




export const EmptyTrailers = () => {
  const [emptyTrailers, setEmptyTrailers] = useState([])
  const [errMsg, setErrMsg] = useState("")
  const [loading, setLoading] = useState(true)
  const YARD_URL = "/yard/EmptyTrailers"


  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))


  useEffect(() => {
    getResults()
  }, [])

  const getResults = async () => {
    try {
        const res = await axiosInstanse.get(YARD_URL);
        if (res.data) {
            setEmptyTrailers(res.data);
            setLoading(false);
        }
    } catch (err) {
        if (!err.response) {
            setErrMsg("No Server Response");
        } else if (err.response.status === 400) {
            setErrMsg(err.response.data.message);
        } else {
            setErrMsg(err.response.data?.message || "An error occurred");
        }
    }
};


    if (loading) {
        return (
            <Box sx = {{ mt:"64px"}}>
                <h4 style = {{font: "Aptos black"}}>"Loading empty trailers..."</h4>
            </Box>
        )
    }
    if (errMsg) {

        return (
        <Box sx = {{mt:"64px"}}>
            <h2 style={{ color: "red" }}>{errMsg}</h2>;
        </Box>
        )
    }

    if (isSmallScreen) {
        return (
        <Box sx = {{mt:"80px", px:2}}>
            {emptyTrailers.map((bay) => (
            <Paper key = {bay.bayNumber} sx = {{mb:2, p:2}}>
                <Typography variant = "subtitle2"><strong>Bay number</strong>{bay.bayNumber}</Typography>
                <Typography variant="subtitle2"><strong>Trailer Number:</strong> {bay.trailerNumber}</Typography>
                <Typography variant="subtitle2"><strong>Stock:</strong> {bay.stockDelivered}</Typography>
                <Typography variant="subtitle2"><strong>Comment:</strong> {bay.comment}</Typography>
            </Paper>
            ))}
        </Box>  
        )
    }   
    if (emptyTrailers.length > 0) {
        return (
            <TableContainer component={Paper} sx={{mt:"60px"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx = {{fontWeight: "bold"}}>Bay Number </TableCell>
                            <TableCell sx = {{fontWeight: "bold"}} align="right">Trailer Number</TableCell>
                            <TableCell sx = {{fontWeight: "bold"}} align="right">Stock</TableCell>
                            <TableCell sx = {{fontWeight: "bold"}} align="right">Comment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {emptyTrailers.map((bay) => (
                        <TableRow
                            key={bay.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {bay.bayNumber}
                            </TableCell>
                            <TableCell align="right">{bay.trailerNumber}</TableCell>
                            <TableCell align="right">{bay.stockDelivered}</TableCell>
                            <TableCell align="right">{bay.comment}</TableCell>
                            
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    } else {
        return <h2>No Empty Trailers at the moment.</h2>
    }
}
       
      
    
 
   
//   }
 
// import axios from '../apiAxios/axios';
// import React, { useEffect, useState} from 'react';


// export const EmptyTrailers = () => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([])

//   useEffect(() => {
//     const fetchData = async () =>{
//       setLoading(true);
//       try {
//         const {data: response} = await axios.get();
//         setData(response);
//       } catch (error) {
//         console.error(error.message);
//       }
//       setLoading(false);
//     }

//     fetchData();
//   }, []);

//   return (
//     <div>
//     {loading && <div>Loading</div>}
//     {!loading && (
//       <div>
//         <h2>Doing stuff with data</h2>
     
//       </div>
//     )}
//     </div>
//   )
// }


