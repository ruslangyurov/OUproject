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
  import {useState} from 'react';
  

  
  export default function EditUserInfo({handleUserUpdate}) { 
  
    const [newName, setNewName] = useState("")
    const [newAddress, setNewAddress] = useState("")
    const [newNumber, setNewNumber] = useState("")

   
  
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography><strong>Edit</strong> </Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          <TextField
            label="Edit name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Edit address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
          <TextField
            label="Edit phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            fullWidth
          />
          
          <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={(e) => handleUserUpdate(e, newName, newAddress, newNumber)}>
              Save
          </Button>
          
        </AccordionDetails>
      </Accordion>
    );
  }
  
