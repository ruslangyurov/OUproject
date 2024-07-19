import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from '../apiAxios/axios';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import BayForm from '../Components/BayForm'



export default function FormPropsTextFields(props) {
  const [valueNumber, setValueNumber] = useState("Trailer number")
  const [valueStock, setValueStock] = useState("Stock delivered")
  const [trailerNumber, setTrailerNumber] = useState("")
  const [stock, setStock] = useState("")
  const [empty, setEmpty] = useState('');
  const [comment, setComment] = useState("")
  const [msg, setErrMsg] = useState("")

useEffect(() => {
  setErrMsg("")}, [valueNumber])


  const bay = {
    bayNumber:props.child,
    trailerNumber: valueNumber, 
    stockDelivered: stock,
    fullTrailer: empty,
    comment: comment,
    trestleOn: false
  }

  

  const YARD_URL = "/yard"
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (valueNumber === "Trailer number" || empty === "None") {
      setErrMsg("Please fill in all the required fields")
    }
    
     await axios.post(YARD_URL,bay).then(() => console.log("bla")).catch(err => {
            if (err.request) {
              setErrMsg(err.request.data)
            }
            if (!err?.response) {
              setErrMsg("No Server Response");
            } else if (err.response.status === 400) {
              setErrMsg(err.response.data.message)
            } else {setErrMsg(err.response.status) }
          })
        };
   
    
  
        
      
  return (
    <Box
      component="form" onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': {m: 0, width: '30ch' },
      }}
      noValidate
      autoComplete="off"
    >
      {msg}
      <div>
        <TextField
          onClick = {() => {setValueNumber("")}}
          onChange = {(e) => {setValueNumber(e.target.value)}}
          required
          id="outlined-required"
          label="Required"
          value = {valueNumber}
          helperText = "Please enter trailer number"
        />
        <TextField
          onClick = {() => {setValueStock("")}}
          onChange = {(e) => {setValueStock(e.target.value)}}
          id="Stock - text"
          value= {valueStock}
          label = 'Stock'
          helperText="Enter type of stock delivered"
        />
       
        <TextField
          onChange = {(e) => {setComment(e.target.value)}}
          id="Comment - text"
          label='Comment'
          defaultValue= ""
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="StandTrailer">Stand Trailer</InputLabel>
          <Select
            labelId="StandTrailer"
            id="Trailer"
            value={empty}
            label="Stand Trailer"
            onChange = {(e) => {setEmpty(e.target.value)}}
          >
            <MenuItem value={"Full"}>Full Trailer</MenuItem>
            <MenuItem value={"Empty"}>Empty Trailer</MenuItem>
            <MenuItem value={'None'}>None</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel control={<Switch defaultChecked color = 'warning'/>} label="Broken Bay" sx = {{m:"auto"}} />
        <Button type = "submit" onSubmit = {handleSubmit} variant="contained" endIcon={<SendIcon />}  sx={{ml:8,mt:1,height:50, width:100}}></Button>
        <FormGroup>
          <FormControlLabel control={<Switch defaultChecked color = 'warning'/>} label="TrestleOn"  />
        </FormGroup>
      </div>
    </Box>
  );
} 
