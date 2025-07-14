import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import BayForm from '../Components/BayForm';
import { Typography } from '@mui/material';
import { useSocketContext } from '../Config/SocketContext';
import { useEffect, useState } from 'react';


export default function Bay(props) {

  

  const [formData, setFormData] = useState({
      bayNumber: props.number,
      trailerNumber: props.trailerNumber,
      stockDelivered: props.stockDelivered,
      fullTrailer: props.fullTrailer,
      comment: props.comment,
  
    });

  if (props.state === true && props.filter === true) {
    return "";
  }

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Accordion disableGutters sx={{ width: '100%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            bgcolor: '#e3f2fd',
            alignItems: 'flex-start',
            gap: 1,
            px: 2,
            py: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: '1rem',
                sm: '1.2rem',
                md: '1.4rem',
              },
              fontWeight: 'bold',
            }}
          >
            {props.number.toString()}
          </Typography>

          <BayForm
            number={props.number}
            state={props.state}
            filter={props.filter}
            formData = {formData}
            setFormData = {setFormData}
            trestleOn = {props.trestleOn}

          />
        </AccordionSummary>
      </Accordion>
    </Box>
  );
}
