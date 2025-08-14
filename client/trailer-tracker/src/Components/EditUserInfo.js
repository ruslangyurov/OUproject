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
  

  
  export default function EditUserInfo({editButton}) { 
  

  
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
          
          {editButton}
          
        </AccordionDetails>
      </Accordion>
    );
  }
  
