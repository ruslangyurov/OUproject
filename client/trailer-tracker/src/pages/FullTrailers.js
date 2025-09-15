import React, { useState, useEffect } from 'react';
import axiosInstanse from '../apiAxios/axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Box, Typography, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';


export const FullTrailers = () => {
  const [fullTrailers, setFullTrailers] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const YARD_URL = "/yard/FullTrailers";

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    getResults();
  }, []);
    

   

  const getResults = async() => {
    try {
      const res = await axiosInstanse.get(YARD_URL);
      setFullTrailers(res.data);
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg(err.response.data?.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (errMsg) {
    return <h2 style={{ color: "red" }}>{errMsg}</h2>;
  }

  if (fullTrailers.length === 0) {
    return <h2>No full trailers at the moment.</h2>;
  }
  if (isSmallScreen) {
    return (
      <Box sx = {{mt:"80px", px:2}}>
        {fullTrailers.map((bay) => (
          <Paper key = {bay.bayNumber} sx = {{mb:2, p:2}}>
            <Typography variant = "subtitle2"><strong>Bay number:</strong>{bay.bayNumber}</Typography>
            <Typography variant="subtitle2"><strong>Trailer Number:</strong> {bay.trailerNumber}</Typography>
            <Typography variant="subtitle2"><strong>Stock:</strong> {bay.stockDelivered}</Typography>
            <Typography variant="subtitle2"><strong>Comment:</strong> {bay.comment}</Typography>
          </Paper>
        ))}
      </Box>  
    )
  }
  return ( 
    <TableContainer sx = {{mt:"80px"}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Bay Number</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">Trailer Number</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">Stock</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fullTrailers.map((bay) => (
            <TableRow key={bay.bayNumber} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{bay.bayNumber}</TableCell>
              <TableCell align="right">{bay.trailerNumber}</TableCell>
              <TableCell align="right">{bay.stockDelivered}</TableCell>
              <TableCell align="right">{bay.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
