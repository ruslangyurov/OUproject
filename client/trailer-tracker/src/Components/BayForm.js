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

  const {socket, bayData, updatedAt, bayDeleted, trestleUpdated, bayUpdater, trestleUpdater} = useSocketContext()

 
  
  const {username} = useAuth();
  const [msg, setErrMsg] = useState("");
  const [emptyBay, setEmptyBay] = useState(true);
  const [bayUpdaterLocal, setBayUpdaterLocal] = useState(null)
  const [trestleUpdaterLocal,  setTrestleUpdaterLocal] = useState(null)
  const [bayUpdatedAt, setBayUpdatedAt] = useState(null)
  const [trestle, setTrestle] = useState(null)
  const [trestleUpdatedAt, setTrestleUpdatedAt] = useState(null)
  
  

  const bayDelete = {
      bayNumber: props.number,
      trailerNumber: "Trailer Number", 
      stockDelivered: "",
      fullTrailer: "",
      comment: ""
    }
  
useEffect(() => {
  // Reset form if bay was deleted
  if (bayDeleted?.status && bayDeleted.bayNumber === props.number) {
    setEmptyBay(true);
    props.setFormData(bayDelete);
  }
}, [bayDeleted, props.number, props.setFormData]);

useEffect(() => {
  // Detect if bay is filled
  if (props.formData.bayNumber === props.number && props.formData.trailerNumber?.trim() && props.formData.trailerNumber != "Trailer Number") {
    setEmptyBay(false);
  } else {
    setEmptyBay(true)
  }
}, [props.formData, props.number]);

useEffect(() => {
  setTrestle(props.trestleOn)
},[props.trestleOn])

useEffect(() => {
  if (trestleUpdated?.bayNumber === props.number) {
    setTrestleUpdaterLocal(trestleUpdater);
    setTrestleUpdatedAt(trestleUpdated.time);
  }
}, [trestleUpdated, trestleUpdater, props.number]);

    
  
useEffect(() => {
  if (bayData && bayData.bayNumber === props.number) {
    props.setFormData({
      bayNumber: props.number,
      trailerNumber: bayData.trailerNumber || "Trailer Number",
      stockDelivered: bayData.stockDelivered || "Stock Delivered",
      fullTrailer: bayData.fullTrailer || "",
      comment: bayData.comment || "Comment",
      
    });
    setEmptyBay(false)
    setBayUpdatedAt(updatedAt)
    setBayUpdaterLocal(bayUpdater);
    
 
  
  } 
}, [bayData, updatedAt, props.number]);

useEffect(() => {
  if (msg) {
    setErrMsg("");
  }
}, [
  props.formData.trailerNumber,
  props.formData.stockDelivered,
  props.formData.fullTrailer,
  props.formData.comment
]);


  const updateStorage = (field, value) => {
    props.setFormData(prevState => ({...prevState, [field]:value}))

    
  }

  //Function to create a new entry for a particular bay in the database

 
  const handleSubmit = (e) => {
      e.preventDefault()
      if (socket) {
       socket.emit("bayUpdate", {formData:props.formData, user:username}, (response) => {
       console.log("SERVER RESPONSE:", response)
       setErrMsg(response.message)
      })
        }
      }
    
  // Bay is empty. Data is reset
   
  const handleDelete = (e) => {

    setEmptyBay(true)
   
    const resetBay = {
      bayNumber: props.number,
      trailerNumber: props.formData.trailerNumber
    }
    if (socket) {
      socket.emit("bayDelete", {...resetBay, user:username}, (response) => {
        setErrMsg(response.message)
      })
    }
  }
  
  const handleTrestle = (e) => {
    const newStatus = e.target.checked;
    setTrestle(newStatus)
    setTrestleUpdatedAt(trestleUpdated.time)
    if (socket) {
      socket.emit("updateTrestle", ({bayNumber:props.number, trestleOn:newStatus, user:username}))
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
        control={<Switch checked={trestle} onChange={handleTrestle} />}
        label="Trestle on"
      />

     
    </Box>
    <Box sx={{ mt: 1, display:"flex", flexDirection:"column", alignSelf: "flex-end", color: 'gray' }}>
      <Typography
        variant="caption"
        sx={{ mt: 1, alignSelf: "flex-end", color: 'gray' }}
      >
        {bayUpdatedAt && `Updated at ${format(new Date(bayUpdatedAt), 'PPpp')} by ${bayUpdaterLocal}`}
      </Typography>
      <Typography
        variant="caption"
        sx={{ mt: 1, alignSelf: "flex-end", color: 'gray' }}
      >
        {trestleUpdatedAt && `Trestle status updated at ${format(new Date(trestleUpdatedAt), 'PPpp')} by ${trestleUpdaterLocal}`}
      </Typography>
    </Box>
  </Box>
 
);

} 
