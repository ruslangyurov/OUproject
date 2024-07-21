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
import { redirect } from 'react-router-dom';



export default function FormPropsTextFields(props) {
  const [valueNumber, setValueNumber] = useState("Trailer number")
  const [valueStock, setValueStock] = useState("Stock delivered")
  const [empty, setEmpty] = useState('');
  const [comment, setComment] = useState("")
  const [msg, setErrMsg] = useState("")
  const [updated, setUpdated] = useState("")
  const [checked, setChecked] = useState(true)

  useEffect(() => {
    setErrMsg("")}, [valueNumber, valueStock, empty, comment])


  const bay = {
    bayNumber: props.child,
    trailerNumber: valueNumber, 
    stockDelivered: valueStock,
    fullTrailer: empty,
    comment: comment,
    trestleOn: false
  }

  

  const YARD_URL = "/yard"
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (valueNumber === "Trailer number" || props.empty === "None") {
      setErrMsg("Please fill in all the required fields")
    }

    
    await axios.patch(YARD_URL,bay).then((res) => setUpdated(res.data)).catch(err => {
            if (err.request) {
              setErrMsg(err.request.data)
            }
            if (!err?.response) {
              setErrMsg("No Server Response");
            } else if (err.response.status === 400) {
                setErrMsg(err.response.data)
            } else {setErrMsg(err.response.data.message)}
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
      <Box
        sx = {{width: 300, ml:2}}>
          {msg}
      </Box>
      
      <div>
        <TextField
          onClick = {() => {if (valueNumber === "Trailer number") {setValueNumber("")}}}
          onChange = {(e) => {
            setValueNumber(e.target.value)
            setChecked(false)
          }}
          required
          id="outlined-required"
          label="Required"
          value = {valueNumber}
          helperText = "Please enter trailer number"
          error = {valueNumber === "TrailerNumber"|| valueNumber === ""}
        />
        <TextField
          onClick = {() => {if (valueStock === "Stock delivered") {setValueStock("")}}}
          onChange = {(e) => {setValueStock(e.target.value)}}
          id="Stock - text"
          value= {valueStock}
          label = 'Stock'
          helperText="Enter type of stock delivered"
        />
       
        <TextField
          onClick = {() => {if (comment === "Comment") {setComment("")}}}
          onChange = {(e) => setComment(e.target.value)}
          id="Comment - text"
          label='Comment'
          
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="StandTrailer">Stand Trailer</InputLabel>
          <Select
            labelId="StandTrailer"
            id="Trailer"
            value={empty}
            label="Stand Trailer"
            error = {empty === ""}
            onChange = {(e) => {setEmpty(e.target.value)}}
          >
            <MenuItem value={"Full"}>Full Trailer</MenuItem>
            <MenuItem value={"Empty"}>Empty Trailer</MenuItem>
            
          </Select>
        </FormControl>
        <FormControlLabel control={<Switch checked={checked} defaultChecked />} label="Empty bay"></FormControlLabel>
        <FormControlLabel control={<Switch defaultChecked color = 'warning'/>} label="Broken Bay" sx = {{m:"auto"}} />
        <Button type = "submit" onSubmit = {handleSubmit} variant="contained" endIcon={<SendIcon />}  sx={{ml:8,mt:1,height:50, width:100}}>
         
        </Button>
        <Box
          sx = {{width: 300, mb:"5px", ml:140}}>
          Updated at {updated}
        </Box>
        
      </div>
    </Box>
  );
} 
