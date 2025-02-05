import React, { useState, useEffect } from 'react';
import axiosInstanse from '../apiAxios/axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const FullTrailers = () => {
  const [fullTrailers, setFullTrailers] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const YARD_URL = "/yard/FullTrailers";

  useEffect(() => {
    const getResults = async () => {
      try {
        const res = await axiosInstanse.get(YARD_URL);
        console.log(res.data)
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
    };

    getResults();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (errMsg) {
    return <h2 style={{ color: "red" }}>{errMsg}</h2>;
  }

  if (fullTrailers.length === 0) {
    return <h2>No full trailers at the moment.</h2>;
  }

  return ( <h2>bal</h2>
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell sx={{ fontWeight: "bold" }}>Bay Number</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }} align="right">Trailer Number</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }} align="right">Stock</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }} align="right">Comment</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {fullTrailers.map((bay) => (
    //         <TableRow key={bay.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    //           <TableCell component="th" scope="row">{bay.bayNumber}</TableCell>
    //           <TableCell align="right">{bay.trailerNumber}</TableCell>
    //           <TableCell align="right">{bay.stockDelivered}</TableCell>
    //           <TableCell align="right">{bay.comment}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};
