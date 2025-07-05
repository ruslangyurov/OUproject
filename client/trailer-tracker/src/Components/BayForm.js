import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {format} from 'date-fns';
import { useAuth } from '../Config/AuthContext';
import {useSocketContext} from '../Config/SocketContext';
import { Typography } from '@mui/material';





export default function BayForm(props) {

  const {socket, bayData, updatedAt, updater} = useSocketContext()

 
  
  const {username} = useAuth();
  const [msg, setErrMsg] = useState("");
  const [updated, setUpdated] = useState("");
  const [emptyBay, setEmptyBay] = useState(true);
  const [trestleSwitch, setTrestleSwitch] = useState(props.trestleOn)
 
  
  
  
  
 useEffect(() => {
  if (bayData && bayData.bayNumber === props.number) {
    props.setFormData({
      bayNumber: props.number,
      trailerNumber: bayData.trailerNumber || "Trailer Number",
      stockDelivered: bayData.stockDelivered || "Stock Delivered",
      fullTrailer: bayData.fullTrailer || "",
      comment: bayData.comment || "Comment",
      trestle: bayData.trestleOn
    });
    

    if (updatedAt) {
      setUpdated(updatedAt);
      
    }
  }
}, [bayData, updatedAt, props.number]);



  // const handleClick = () => {
  //   props.onClick(props.index)
  // }



  const updateStorage = (field, value) => {
    props.setFormData(prevState => ({...prevState, [field]:value}))

    
  }

  //Function to create a new entry for a particular bay in the database

 
  const handleSubmit = (e) => {
      e.preventDefault()
      if (socket) {
      socket.emit("bayUpdate", {formData:props.formData,username}, (response) => {
       setErrMsg(response.message)
      })
        }
      }
    
  // Bay is empty. Data is reset
   
  const handleDelete = (e) => {
    e.preventDefault();
    const bayDelete = {
      bayNumber: props.number,
      trailerNumber: "Trailer Number", 
      stockDelivered: "Stock Delivered",
      fullTrailer: "Empty",
      comment: ""
    }
    if (socket) {
      socket.emit("bayDelete", {data:bayDelete})
    }
  }
  
  const handleTrestle = (e) => {
    e.preventDefault()
    setTrestleSwitch(e.target.trestleSwitch)
    if (socket) {
      socket.emit("updateTrestle", ({bayNumber:props.number, trestleOn:trestleSwitch}))
    }
  }
    
    
    // This will act as a delete operation on the app

    
   
    
// Inside BayForm.jsx
return (
  <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
     boxSizing:"border-box", 
     padding: "25px",
    }}
    noValidate
    autoComplete="off"
  >
    <Typography sx={{ color: 'green', fontSize: '0.9rem' }}>{msg}</Typography>

    <Box
      sx={{
        display: "flex",
        flexDirection: {sx:"column", sm:"row"},
        gap: 3,
        width: "100%",
        flexWrap: "wrap",
        alignItems:"flex-start",
        justifyContent:"flex-start",
        width:"100%"
      }}
    >
      <TextField
        required
        sx={{width: {
         xs: '100%',  // full width on extra-small screens
         sm: '80%',   // 80% on small screens
         md: '60%',   // 60% on medium screens
         lg: '50%',   // 50% on large screens
          },
          minWidth: 100,
          maxWidth: 400,
        }}
        onClick={() => {
          if (props.formData.trailerNumber === "Trailer Number")
            props.setFormData({ ...props.formData, trailerNumber: "" });
        }}
        onChange={(e) => updateStorage("trailerNumber", e.target.value)}
        id="outlined-required"
        label="Trailer Number"
        value={props.formData.trailerNumber}
        helperText="Please enter trailer number"
        error={
          props.formData.trailerNumber === "Trailer Number" ||
          props.formData.trailerNumber === ""
        }
       
      />

      <TextField
       sx={{width: {
         xs: '100%',  // full width on extra-small screens
         sm: '80%',   // 80% on small screens
         md: '60%',   // 60% on medium screens
         lg: '50%',   // 50% on large screens
          },
          minWidth: 200,
          maxWidth: 400,
        }}
        onClick={() => {
          if (props.formData.stockDelivered === "Stock Delivered")
            props.setFormData({ ...props.formData, stockDelivered: "" });
        }}
        onChange={(e) => updateStorage("stockDelivered", e.target.value)}
        id="Stock - text"
        label="Stock"
        value={props.formData.stockDelivered}
        helperText="Enter type of stock delivered"
      
      />

      <TextField
        required
        sx={{width: {
         xs: '100%',  // full width on extra-small screens
         sm: '80%',   // 80% on small screens
         md: '60%',   // 60% on medium screens
         lg: '50%',   // 50% on large screens
          },
          minWidth: 200,
          maxWidth: 400,
        }}
        onClick={() => {if (props.formData.comment === "Comment")
            props.setFormData({ ...props.formData, comment: "" });
        }}
        onChange={(e) =>updateStorage("comment", e.target.value)}
        id="Comment - text"
        label="Comment"
        value={props.formData.comment}
    
      />

      <FormControl >
        <InputLabel id="StandTrailer">Stand Trailer</InputLabel>
        <Select
          labelId="StandTrailer"
          id="Trailer"
          value={props.formData.fullTrailer}
          label="Stand Trailer"
          onChange={(e) => updateStorage("fullTrailer", e.target.value)}
           sx={{width: {
           xs: '100%',  // full width on extra-small screens
           sm: '80%',   // 80% on small screens
           md: '60%',   // 60% on medium screens
          lg: '50%',   // 50% on large screens
          },
          minWidth: 200,
          maxWidth: 400,
          }}
        >
          <MenuItem value={"Full"}>Full Trailer</MenuItem>
          <MenuItem value={"Empty"}>Empty Trailer</MenuItem>
        </Select>
      </FormControl>
       <Button
        type="submit"
        variant="contained"
        endIcon={<SendIcon />}
        sx={{ height: 50, width: 120 }}
      >
        Submit
      </Button>  

    </Box>

    <Box 
     sx={{
        display: "flex",
        mt:"15px",
        gap: 3,
        flexWrap: "wrap",
        alignSelf:"flex-start",
        width:"100%"
      }}>
      <FormControlLabel
        control={<Switch checked={emptyBay} onChange={handleDelete} />}
        label="Empty bay"
      />

      <FormControlLabel
        control={<Switch defaultChecked={false} color="warning" />}
        label="Broken Bay"
      />

       <FormControlLabel
        control={<Switch checked={props.trestleOn} onChange={handleTrestle} />}
        label="Trestle on"
      />

     
  </Box>

    <Typography
      variant="caption"
      sx={{ mt: 1, alignSelf: "flex-end", color: 'gray' }}
    >
       {updated && `Updated at ${format(new Date(updated), 'PPpp')} by ${updater}`}
    </Typography>
  </Box>
);

} 
