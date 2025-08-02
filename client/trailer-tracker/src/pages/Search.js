import react from 'react'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import axiosInstanse from '../apiAxios/axios'
import { setRef } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
    const findTrailer = async() => {
        await axiosInstanse.get(URL_SEARCH, {params: {trailerNumber:state.toLowerCase()}}).
        then((res) => setResults(res.data)).catch((err) => {
            if (err.request) {
                setErrMsg(err.request.data)
              }
              if (!err?.response) {
                setErrMsg("No Server Response");
              } else if (err.response.status === 400) {
                  setErrMsg("No trailer found")
              } else {setErrMsg(err.response.data.message)}
            })
        
    }
   
        
    if (results) {
        return (
            <TableContainer component={Paper} sx = {{mt:"60px"}}>
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
                        {/* {results.map((bay) => ( */}
                        <TableRow
                            key={results.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {results.bayNumber}
                            </TableCell>
                            <TableCell align="right">{results.trailerNumber}</TableCell>
                            <TableCell align="right">{results.stockDelivered}</TableCell>
                            <TableCell align="right">{results.comment}</TableCell>
                            
                        </TableRow>
                        
                    </TableBody>
                </Table>
            </TableContainer>
        )
    } else if (errMsg) { 
        return <h2>{errMsg}</h2>
    } else {return "No trailer found."}
    

}
