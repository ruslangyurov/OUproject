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





export default function BayForm({formData, setFormData, trestle, setTrestle}) {

  const {socket} = useSocketContext()

 
  const [localForm, setLocalForm] = useState(formData)
  const {username} = useAuth();
  const [msg, setErrMsg] = useState("");
  const [emptyBay, setEmptyBay] = useState(true);


  
  
  
  

  useEffect(() => {
    setLocalForm(formData);
  }, [formData]);

//   useEffect(() => {
//   // Detect if bay is filled
//   if (props.formData.bayNumber === props.number && props.formData.trailerNumber?.trim() && props.formData.trailerNumber != "Trailer Number") {
//     setEmptyBay(false);
//   } else {
//     setEmptyBay(true)
//   }
// }, [props.formData, props.number]);

// // useEffect(() => {
// //   console.log("BayForm: props.trestleOn changed for bay", props.number, "to", props.trestleOn);
// //   setTrestle(props.trestleOn)
// // },[props.trestleOn])



//   useEffect(() => {
//     if (!trestleUpdatedOnBay) return;
//     if (trestleUpdatedOnBay?.bayNumber === props.number) {
//       const trestleUpdate = {
//         trestleOn: trestleUpdatedOnBay.trestleOn,
//         updatedBy: trestleUpdatedOnBay.updatedBy,
//         updatedAt: trestleUpdatedOnBay.updatedAt
//       }
//       props.setFormData(prev => ({...prev, ...trestleUpdate}))
//     }
//   }, [trestleUpdatedOnBay, props.number]);

    
  
  
      
    


//   useEffect(() => {
//     if (msg) {
//       setErrMsg("");
//     }
//   }, [
//     props.formData.trailerNumber,
//     props.formData.stockDelivered,
//     props.formData.fullTrailer,
//     props.formData.comment
//   ]);


  const updateStorage = (field, value) => {
     setLocalForm(prevState => ({...prevState, [field]:value}))

    
  }

  //Function to create a new entry for a particular bay in the database

 
  const handleSubmit = (e) => {
      e.preventDefault()
      if (socket) {
       socket.emit("bayUpdate", {formData:localForm, user:username}, (response) => {
       console.log("SERVER RESPONSE:", response)
       setErrMsg(response.message)
      })
        }
      }
    
  // Bay is empty. Data is reset
   
  const handleDelete = (e) => {

   
   
    const resetBay = {
      bayNumber: localForm.bayNumber,
      trailerNumber: LocalForm.trailerNumber
    }
    if (socket) {
      socket.emit("bayDelete", {...resetBay, user:username}, (response) => {
        setErrMsg(response.message)
      })
    }
  }
  
  // const handleBrokenBay = (e) => {
  //   const newStatus = e.target.checked;

  //    if (socket) {
  //     socket.emit("brokenBay", ({bayNumber:props.number, user:username, brokenBay:newStatus}))
  //   }
  // }

  const handleTrestle = (e) => {
    const newStatus = e.target.checked;
    
    
    if (socket) {
      socket.emit("updateTrestle", ({bayNumber:localForm.bayNumber, trestleOn:newStatus, user:username}))
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
          if (localForm.trailerNumber === "Trailer Number")
            setLocalForm({ ...localForm, trailerNumber: "" });
        }}
        onChange={(e) => updateStorage("trailerNumber", e.target.value)}
        id="outlined-required"
        label="Trailer Number"
        value={localForm.trailerNumber}
        helperText="Please enter trailer number"
        error={
          localForm.trailerNumber === "Trailer Number" ||
          localForm.trailerNumber === ""
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
          if (localForm.stockDelivered === "Stock Delivered")
            setLocalForm({ ...localForm, stockDelivered: "" });
        }}
        onChange={(e) => updateStorage("stockDelivered", e.target.value)}
        id="Stock - text"
        label="Stock"
        value={localForm.stockDelivered}
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
        onClick={() => {if (localForm.comment === "Comment")
            setLocalForm({ ...localForm, comment: "" });
        }}
        onChange={(e) =>updateStorage("comment", e.target.value)}
        id="Comment - text"
        label="Comment"
        value={localForm.comment}
    
      />

      <FormControl >
        <InputLabel id="StandTrailer">Stand Trailer</InputLabel>
        <Select
          labelId="StandTrailer"
          id="Trailer"
          value={localForm.fullTrailer ? "Full":"Empty"}
          label="Stand Trailer"
          onChange={(e) => updateStorage("fullTrailer", e.target.value === "Full")}
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
          <MenuItem value="Full">Full Trailer</MenuItem>
          <MenuItem value="Empty">Empty Trailer</MenuItem>
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
        control={<Switch checked={emptyBay} />}
        label="Empty bay"
      />

      <FormControlLabel
        control={<Switch checked={localForm.broken}  />}
        label="Broken Bay"
      />

       <FormControlLabel
        control={<Switch checked={localForm.trestleOn} onChange={handleTrestle}  />}
        label="Trestle on"
      />

     
    </Box>
    <Box sx={{ mt: 1, display:"flex", flexDirection:"column", alignSelf: "flex-end", color: 'gray' }}>
      <Typography
        variant="caption"
        sx={{ mt: 1, alignSelf: "flex-end", color: 'gray' }}
      >
        {localForm.bayUpdatedAt && `Updated ${format(new Date(localForm.bayUpdatedAt), 'PPpp')} by ${localForm.bayUpdatedBy}`}
      </Typography>
      <Typography
        variant="caption"
        sx={{ mt: 1, alignSelf: "flex-end", color: 'gray' }}
      >
        {localForm.trestleUpdatedAt && `Trestle status updated ${format(localForm.trestleUpdatedAt, 'PPpp')} by ${localForm.trestleUpdatedBy}`}
      </Typography>
    </Box>
  </Box>
 
);

} 