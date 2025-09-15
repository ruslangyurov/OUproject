import react from 'react'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import axiosInstanse from '../apiAxios/axios'
import { setRef } from '@mui/material'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Typography, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';


export const Search = () => {
    const [results, setResults] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

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
        if (isSmallScreen) {
            return (
                <Box sx = {{mt:"80px", px:2}}>
                    {results.map((bay) => (
                    <Paper key = {bay.bayNumber} sx = {{mb:2, p:2}}>
                        <Typography variant = "subtitle2"><strong>Bay number:</strong> {bay.bayNumber}</Typography>
                        <Typography variant="subtitle2"><strong>Trailer Number:</strong> {bay.trailerNumber}</Typography>
                        <Typography variant="subtitle2"><strong>Stock:</strong> {bay.stockDelivered}</Typography>
                        <Typography variant="subtitle2"><strong>Comment:</strong> {bay.comment}</Typography>
                    </Paper>
                    ))}
                </Box>  
        )
        }
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
                    {results.map(bay => (
                    <TableRow
                        key={bay.bayNumber}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
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
    } else {return <h2>No trailer found.</h2>;}


}
