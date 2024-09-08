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
import { useState, useRef } from 'react';
import { Typography } from '@mui/material';


export default function Bay(props) {
    const[checked, setChecked] = useState(false)

    const onClick = () => {
        // the function that we passed for changing the trestle state
        props.onClick(props.index)
    }
    // bay has trestle, so we don't need to see it
    if (props.state === true && props.filter === true) { 
        return ""

    } else {
        return (
            <Accordion>
            <AccordionSummary
                disableGutters
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx = {{m:'auto', bgcolor:'#e3f2fd', height:'15%'}}>
                    {props.child}
                    <BayForm child = {props.child} state = {props.state} filter = {props.filter}/>
            </AccordionSummary>
            <AccordionActions>
                <FormGroup>
                    <FormControlLabel control={<Switch checked = {props.state}  onChange ={onClick}/>} label="TrestleOn"  />
                </FormGroup>
            </AccordionActions>
        </Accordion>
            
        )
    }
    

}