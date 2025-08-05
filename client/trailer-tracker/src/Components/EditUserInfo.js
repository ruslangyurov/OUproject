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
  import { useState } from "react";
  import axiosInstance from "../apiAxios/axios";
  import { useAuth } from "../Config/AuthContext";
  
  export default function EditUserInfo() {
    const [newUsername, setNewUsername] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState(""); 
    const [errMsg, setErrMsg] = useState("")

    const USER_URL = '/user/profile/edit'
    const {username} = useAuth()

    const handleUserUpdate = async (e) => {
     e.preventDefault();
     await axiosInstance.patch(USER_URL, {username:username}).catch((error) => {
      setErrMsg(error.response.data.message)
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
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
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
  
