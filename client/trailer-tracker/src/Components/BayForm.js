import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosInstance from '../apiAxios/axios';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {format} from 'date-fns';





export default function BayForm(props) {
  const [formData, setFormData] = useState({
    trailerNumber: "Trailer Number",
    stockDelivered: "Stock Delivered",
    fullTrailer: '',
    comment: '',
  });
  const [msg, setErrMsg] = useState("");
  const [updated, setUpdated] = useState("");
  const [emptyBay, setEmptyBay] = useState(true);

  // Sync localStorage values with state when the component loads
  useEffect(() => {
    const localStorageData = {
      trailerNumber: localStorage.getItem('trailerNumber' + props.child) || "Trailer Number",
      stockDelivered: localStorage.getItem('stock' + props.child) || "Stock Delivered",
      comment: localStorage.getItem('comment' + props.child) || "",
      fullTrailer: localStorage.getItem('empty' + props.child) || '',
    };
    setFormData(localStorageData);
    setEmptyBay(localStorage.getItem("emptyBay" + props.child) === "true");
  }, [props.child]);


  // const handleClick = () => {
  //   props.onClick(props.index)
  // }

  const updateStorage = (field, value) => {
    localStorage.setItem(field + props.child, value);
    setFormData(prevState => ({...prevState, [field]:value}))
  }

  //Function to create a new entry for a particular bay in the database

  const bay = {
    bayNumber: props.child,
    trailerNumber:formData.trailerNumber, 
    stockDelivered:formData.stock,
    fullTrailer: formData.empty,
    comment: formData.comment,
    trestleOn: false
  }

  

  

  const YARD_URL = "/yard"
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.trailerNumber === "Trailer number" || formData.trailerNumber === "") {
      setErrMsg("Please fill in all the required fields")
    }
    await axiosInstance.patch(YARD_URL,bay).then((res) => {
      setUpdated(format(new Date(res.data), 'ppPP'))}).then(() => {
      setEmptyBay(false)
      localStorage.setItem("emptyBay" + props.child, false)}).catch(err => {
            if (err.request) {
              setErrMsg(err.request.data)
            } else {setErrMsg(err.message)}
          })
        }
    
  // Bay is empty. Data is reset
   
  const handleDelete = async (e) => {
    e.preventDefault();
    const bayDelete = {
      bayNumber: props.child,
      trailerNumber: "0", 
      stockDelivered: "",
      fullTrailer: "full",
      comment: ""
    }

    const newFormData = {trailerNumber:"", stock: "", empty:"full", comment:""}
    
    // This will act as a delete operation on the app

    
    await axiosInstance.patch(YARD_URL,bayDelete).then((res) => setUpdated(res.data)).then(() => {
      setFormData(newFormData);
      localStorage.removeItem("emptyBay" + props.child);
      localStorage.removeItem("trailerNumber" + props.child);
      localStorage.removeItem("stock" + props.child);
      localStorage.removeItem("empty" + props.child);
      localStorage.removeItem("comment" + props.child);
    }).catch((err) => {
      setErrMsg(err.request ? err.request.data : err.message);
    
  });
}
    
return (
    
  <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        maxWidth: 500,
        width: "100%",
        mx: "auto",
        p: 2,
        boxSizing: "border-box",
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
          onClick = {() => {if (formData.trailerNumber === "Trailer Number") {setFormData({...formData, trailerNumber:""})}}}
          onChange = {(e) => {updateStorage("trailerNumber" + props.child, e.target.value)
          }}
         
          id="outlined-required"
          label="Required"
          value = {formData.trailerNumber}
          helperText = "Please enter trailer number"
          error = {formData.trailerNumber === "TrailerNumber"||formData.trailerNumber === ""}
        />
        <TextField
          onClick = {() => {if (formData.stock === "Stock Delivered") {setFormData({...formData, stock:""})}}}
          onChange = {(e) => {updateStorage("stock" + props.child, e.target.value)}}
          id="Stock - text"
          value= {FormData.stock}
          label = 'Stock'
          helperText="Enter type of stock delivered"
        />
       
        <TextField
          onClick = {() => {if (formData.comment === "Comment") {setFormData({...formData, comment:""})}}}
          onChange = {(e) => {updateStorage("comment" + props.child, e.target.value)}}
          id="Comment - text"
          label='Comment'
          
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="StandTrailer">Stand Trailer</InputLabel>
          <Select
            labelId="StandTrailer"
            id="Trailer"
            value={formData.empty}
            label="Stand Trailer"
            error = {formData.empty === ""}
            onChange = {(e) => {updateStorage("empty" + props.child, e.target.value)}}
             >
            <MenuItem value={"Full"}>Full Trailer</MenuItem>
            <MenuItem value={"Empty"}>Empty Trailer</MenuItem>
            
          </Select>
        </FormControl>
        <FormControlLabel control={<Switch checked={emptyBay} onChange = {handleDelete} />} label="Empty bay"></FormControlLabel>
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
