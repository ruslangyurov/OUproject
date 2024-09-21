import react from 'react'
import {useState, useEffect} from 'react'
import axios from '../apiAxios/axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export const FullTrailers = () => {
  const [fullTrailers, setfullTrailers] = useState([])
  const [errMsg, setErrMsg] = useState("")
  const [loading, setLoading] = useState(true)
  const YARD_URL = "/yard/FullTrailers"

  useEffect(() => {
    getResults()
   
  }, [])

  const getResults = async() => {
    await axios.get(YARD_URL).then((res) => setfullTrailers(res.data)).then(setLoading(false)).catch(err => {
      if (err.request) {
          setErrMsg(err.request.data)
            }
      if (!err?.response) {
           setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
           setErrMsg(err.response.data.message)
      } else {setErrMsg(err.response.data.message)}
          })
    
        }

    if (loading) {
        return ""

    } else if (fullTrailers.length > 0) {
        return (
            <TableContainer component={Paper}>
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
                        {fullTrailers.map((bay) => (
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
        return <h2>No full trailers at the moment.</h2>
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


