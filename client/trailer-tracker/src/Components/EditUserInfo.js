import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    TextField,
    Button,
    Box,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import { useState, useEffect } from "react";
  import axiosInstance from "../apiAxios/axios";
  import { useAuth } from "../Config/AuthContext";
  
  export default function EditUserInfo() {
    const [newName, setNewName] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState(""); 
    const [errMsg, setErrMsg] = useState("")
    const [updatedUser, setUpdatedUser] = useState(null)

    const USER_URL = '/user/profile/edit'
    
    useEffect(() => {
      if (updatedUser) {
        console.log(updatedUser)
        const {name, address, phoneNumber} = updatedUser
        setNewName(name)
        setNewAddress(address)
        setNewPhoneNumber(phoneNumber)
      }
    }, [updatedUser])

    const handleUserUpdate = (e) => {
     e.preventDefault();
     axiosInstance.patch(USER_URL, {newName, newAddress, newPhoneNumber}).
     then((res) => {setUpdatedUser(res.data)}).catch((error) => {
      if (error?.response?.data?.message?.trim().toLowerCase() != "jwt expired".toLowerCase()) {
        setErrMsg(error.response.data.message)
      }
      
     })
    };
      

  
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography><strong>Edit</strong> </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{mb:"20px"}}>
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>{errMsg}</Typography>
          </Box>
          <TextField
            label="Edit name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Edit address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            fullWidth
          />
          <TextField
            label="Edit phone number"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
            fullWidth
          />
          
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleUserUpdate}
          >
            Save
          </Button>
          
        </AccordionDetails>
      </Accordion>
    );
  }
  
