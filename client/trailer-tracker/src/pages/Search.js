import react from 'react'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import axios from '../apiAxios/axios'
import { setRef } from '@mui/material'


export const Search = () => {
    const [results, setResults] = useState([]);
    const [errMsg, setErrMsg] = useState("");

    const {state} = useLocation()
    useEffect(() => {
        res()
    },[state])
    const URL_SEARCH = '/yard/search'   
    const res = async() => {
        await axios.get(URL_SEARCH, {params: {trailerNumber:state}}).then((res) => setResults(res.trailerNumber)).then(console.log(state)).then(console.log(results)).catch((err) => {
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
    return(
        <>
            {results}
            {errMsg}
        </>
        
    )

}
