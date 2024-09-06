import react from 'react'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import axios from '../apiAxios/axios'
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
    const [loaded, setLoaded] = useState(false)

    const {state} = useLocation()
    useEffect(() => {
        resp()
        setErrMsg("")
        setLoaded(true)
    },[state])

    
    const URL_SEARCH = '/yard/Search'   
    const resp = () => {
        axios.get(URL_SEARCH, {params: {trailerNumber:state}}).then((res) => setResults(res.bay)).then(console.log(results)).catch((err) => {
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
   
        
    if (results.length > 0) {
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
                        {results.map((bay) => (
                        <TableRow
                            key={bay.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {bay}
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
    }

}
