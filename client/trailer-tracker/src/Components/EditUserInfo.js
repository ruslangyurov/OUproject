import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    TextField,
    Button,
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

    const USER_URL = '/user'
    const {username} = useAuth()

    const handleUserUpdate = (e) => {
     e.preventDefault();
     axiosInstance.patch(USER_URL, {userName:username}).then((response) => {
      setNewUsername(response.data.userName)
      setNewAddress(response.data.address)
      setNewPhoneNumber(response.data.phoneNumber)
     }).catch((error) => {
      setErrMsg(error.response.data.message)
     })
    };
      

  
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography><strong>Edit</strong> </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Edit name"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
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
  
