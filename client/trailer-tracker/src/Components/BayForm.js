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
import { useAuth } from '../Config/AuthContext';
import {useSocketContext} from '../Config/SocketContext';
import { Typography } from '@mui/material';





export default function BayForm(props) {

  const {socket, bayData, updatedAt} = useSocketContext()

  const [formData, setFormData] = useState({
    bayNumber: props.child,
    trailerNumber: "Trailer Number",
    stockDelivered: "Stock Delivered",
    fullTrailer: '',
    comment: '',
  });

  const {username} = useAuth();
  const [msg, setErrMsg] = useState("");
  const [updated, setUpdated] = useState("");
  const [emptyBay, setEmptyBay] = useState(true);

  

  useEffect(() => {
    // Load data from local storage when the component mounts
    const localStorageData = {

      trailerNumber: localStorage.getItem('trailerNumber' + props.child) || "Trailer Number",
      stockDelivered: localStorage.getItem('stockDelivered' + props.child) || "Stock Delivered",
      comment: localStorage.getItem('comment' + props.child) || "",
      fullTrailer: localStorage.getItem('fullTrailer' + props.child) || '',
    };
    setFormData(prev => ({...formData, ...localStorageData}));
    setEmptyBay(localStorage.getItem("emptyBay" + props.child) === "true");
  }, [props.child]); // Runs once when `props.child` changes
  
  
  useEffect(() => {
    if (bayData) {
      // Update the form with the received socket data
      setUpdated(updatedAt)
      const newData = {
        bayNumber: props.child,
        trailerNumber: bayData.trailerNumber || "",
        stockDelivered: bayData.stockDelivered || "",
        fullTrailer: bayData.fullTrailer || "",
        comment: bayData.comment || "",
      };
  
      setFormData(newData);
  
      // Save to local storage to make it persistent
     
      localStorage.setItem("trailerNumber" + props.child, newData.trailerNumber);
      localStorage.setItem("stockDelivered" + props.child, newData.stockDelivered);
      localStorage.setItem("fullTrailer" + props.child, newData.fullTrailer);
      localStorage.setItem("comment" + props.child, newData.comment);
    }
  }, [bayData,updatedAt, props.child]); // Runs whenever `bayUpdated` changes
  


  // const handleClick = () => {
  //   props.onClick(props.index)
  // }



  const updateStorage = (field, value) => {
    setFormData(prevState => ({...prevState, [field]:value}))
    localStorage.setItem(field + props.child, value);
    
  }

  //Function to create a new entry for a particular bay in the database

  const YARD_URL = "/yard"
  const handleSubmit = (e) => {
      e.preventDefault()
      if (socket) {
      socket.emit("bayUpdate", formData, (response) => {
       setErrMsg(response.message)
      })
        }
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

    const newFormData = {trailerNumber:"", stockDelivered: "", fullTrailer:"", comment:""}
    
    // This will act as a delete operation on the app

    
    await axiosInstance.patch(YARD_URL,bayDelete).then((res) => setUpdated(res.data)).then(() => {
      setFormData(prevData => ({...formData, ...newFormData}));
      localStorage.removeItem("emptyBay" + props.child);
      localStorage.removeItem("trailerNumber" + props.child);
      localStorage.removeItem("stockDelivered" + props.child);
      localStorage.removeItem("fullTrailer" + props.child);
      localStorage.removeItem("comment" + props.child);
    }).catch((err) => {
      setErrMsg(err.request ? err.request.data : err.message);
    
  });
}
    
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
          if (formData.trailerNumber === "Trailer Number")
            setFormData({ ...formData, trailerNumber: "" });
        }}
        onChange={(e) => updateStorage("trailerNumber", e.target.value)}
        id="outlined-required"
        label="Trailer Number"
        value={formData.trailerNumber}
        helperText="Please enter trailer number"
        error={
          formData.trailerNumber === "Trailer Number" ||
          formData.trailerNumber === ""
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
          if (formData.stockDelivered === "Stock Delivered")
            setFormData({ ...formData, stockDelivered: "" });
        }}
        onChange={(e) => updateStorage("stockDelivered", e.target.value)}
        id="Stock - text"
        label="Stock"
        value={formData.stockDelivered}
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
        onClick={() => {if (formData.comment === "Comment")
            setFormData({ ...formData, comment: "" });
        }}
        onChange={(e) =>updateStorage("comment", e.target.value)}
        id="Comment - text"
        label="Comment"
        value={formData.comment}
    
      />

      <FormControl >
        <InputLabel id="StandTrailer">Stand Trailer</InputLabel>
        <Select
          labelId="StandTrailer"
          id="Trailer"
          value={formData.fullTrailer}
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

     
    </Box>

    <Typography
      variant="caption"
      sx={{ mt: 1, alignSelf: "flex-end", color: 'gray' }}
    >
      Updated at {updatedAt}
    </Typography>
  </Box>
);

} 
