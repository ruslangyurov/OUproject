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
  const [valueNumber, setValueNumber] = useState("Trailer Number")
  const [valueStock, setValueStock] = useState("Stock Delivered")
  const [empty, setEmpty] = useState('');
  const [comment, setComment] = useState("")
  const [msg, setErrMsg] = useState("")
  const [updated, setUpdated] = useState("")
  const [checked, setChecked] = useState(true)

  useEffect(() => {
    setErrMsg("")}, [valueNumber, valueStock, empty, comment])


    useEffect(() => {
      setChecked(localStorage.getItem("checked" + props.child) === "true"?true:false)
      setValueStock(localStorage.getItem("stock" + props.child))
      setValueNumber(localStorage.getItem('trailerNumber' + props.child))
      setComment(localStorage.getItem('comment' + props.child))
      setEmpty(localStorage.getItem('fullTrailer' + props.child));
    }, []);

  const bay = {
    bayNumber: props.child,
    trailerNumber: valueNumber, 
    stockDelivered: valueStock,
    fullTrailer: empty,
    comment: comment,
    trestleOn: false
  }

  const handleClick = () => {
    props.onClick(props.index)
  }

  const YARD_URL = "/yard"
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (valueNumber === "Trailer number" || props.empty === "None") {
      setErrMsg("Please fill in all the required fields")
    }

    
    await axios.patch(YARD_URL,bay).then((res) => setUpdated(res.data)).then(() => setChecked(false)).catch(err => {
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
   
  const handleDelete = async (e) => {
    e.preventDefault();
    const bayDelete = {
      bayNumber: props.child,
      trailerNumber: "0", 
      stockDelivered: "",
      fullTrailer: "full",
      comment: ""
    }
    
    await axios.patch(YARD_URL,bayDelete).then((res) => setUpdated(res.data)).then(() => 
      setChecked(true),
      setValueNumber(""),
      setValueStock(""),
      setEmpty(""),
      setComment(""),
      localStorage.setItem("checked" + props.child, "true"),
      localStorage.setItem("trailerNumber" + props.child, ""),
      localStorage.setItem("stock" + props.child, ""),
      localStorage.setItem("fullTrailer" + props.child, ""),
      localStorage.setItem("comment" + props.child, "")).catch(err => {
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
          required
          onClick = {() => {if (valueNumber === "Trailer Number") {setValueNumber("")}}}
          onChange = {(e) => {
            setValueNumber(e.target.value)
            localStorage.setItem('trailerNumber'+ props.child, e.target.value)
          }}
         
          id="outlined-required"
          label="Required"
          value = {valueNumber}
          helperText = "Please enter trailer number"
          error = {valueNumber === "TrailerNumber"|| valueNumber === ""}
        />
        <TextField
          onClick = {() => {if (valueStock === "Stock Delivered") {setValueStock("")}}}
          onChange = {(e) => {
            setValueStock(e.target.value)
            localStorage.setItem('stock' + props.child, e.target.value)}}
          id="Stock - text"
          value= {valueStock}
          label = 'Stock'
          helperText="Enter type of stock delivered"
        />
       
        <TextField
          onClick = {() => {if (comment === "Comment") {setComment("")}}}
          onChange = {(e) => {
            setComment(e.target.value)
            localStorage.setItem('comment' + props.child, e.target.value)
          }}
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
            onChange = {(e) => {
              setEmpty(e.target.value)
              localStorage.setItem('fullTrailer' + props.child, e.target.value)
            }}
          >
            <MenuItem value={"Full"}>Full Trailer</MenuItem>
            <MenuItem value={"Empty"}>Empty Trailer</MenuItem>
            
          </Select>
        </FormControl>
        <FormControlLabel control={<Switch checked={checked} onChange = {handleDelete} />} label="Empty bay"></FormControlLabel>
        <FormControlLabel control={<Switch defaultChecked = {false} color = 'warning'/>} label="Broken Bay" sx = {{m:"auto"}} />
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
