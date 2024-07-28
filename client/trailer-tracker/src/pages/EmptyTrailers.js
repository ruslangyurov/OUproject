import react from 'react'
import {useState, useEffect} from 'react'
import axios from '../apiAxios/axios';



export const EmptyTrailers = () => {
  const [EmptyTrailers, setEmptyTrailers] = useState([])
  const [errMsg, setErrMsg] = useState("")
  const YARD_URL = "/yard"

  useEffect(() => {
    getResults()
  }, [])

  const getResults = () => {
    axios.get(YARD_URL).then(res => {setEmptyTrailers(res.data.bays)}).catch(err => {
      if (err.request) {
          setErrMsg(err.request.data)
            }
      if (!err?.response) {
           setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
           setErrMsg(err.response.data)
      } else {setErrMsg(err.response.data.message)}
          })
}
    return (
        {setErrMsg}
    )

  }
  