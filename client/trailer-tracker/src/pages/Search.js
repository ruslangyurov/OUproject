import react from 'react'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import axiosInstanse from '../apiAxios/axios'
import { setRef } from '@mui/material'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Typography
} from '@mui/material';


export const Search = () => {
    const [results, setResults] = useState([]);
    const [errMsg, setErrMsg] = useState("");
  

    const {state} = useLocation()
    useEffect(() => {
        setResults(null)
        // send the request to the server when the page renders
        findTrailer()

    },[state])

    
    const URL_SEARCH = '/yard/Search'   
    const findTrailer = async () => {
        try {
            const res = await axiosInstanse.get(URL_SEARCH, {
            params: { trailerNumber: state.toLowerCase() }
            });

            if (res.data) {
            setResults(res.data);
            setErrMsg(""); // clear any previous errors
            } else {
            setErrMsg("No trailer found.");
            setResults(null); // optional: clear results
            }

        } catch (err) {
            if (!err?.response) {
            setErrMsg("No Server Response");
            } else if (err.response.status === 400) {
            setErrMsg("No trailer found.");
            } else {
            setErrMsg(err.response.data?.message || "An error occurred");
            }
            setResults(null); // clear results on error
        }
        };

   
        
    if (errMsg) {
        return (
            <Box sx={{ mt: "64px" }}>
                <h2 style={{ color: "red" }}>{errMsg}</h2>
            </Box>
        );
        }

    if (results) {
        return (
            <TableContainer component={Paper} sx={{ mt: "60px" }}>
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
                <TableRow
                    key={results.id || results.bayNumber}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">{results.bayNumber}</TableCell>
                    <TableCell align="right">{results.trailerNumber}</TableCell>
                    <TableCell align="right">{results.stockDelivered}</TableCell>
                    <TableCell align="right">{results.comment}</TableCell>
                </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
        );
        }

    return <h2>No trailer found.</h2>;


}
