import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import BayForm from '../Components/BayForm'
import { useState } from 'react';
import { Typography } from '@mui/material';


export default function Bay(props) {

    

    return (
    <Typography component="div">
      <Box
        sx={{
          width: 25,
          height: 25,
          borderRadius: 1,
          variant:"h6",
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none'}}>
          {props.child}
        </Box>
        <BayForm child = {props.child}/>
      </Typography>
        
           
       
        
    )

}