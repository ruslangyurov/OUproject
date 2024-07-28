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

    const onClick = () => {
        onClick(props.bayIndex)
    }

    return (
        <Accordion>
        <AccordionSummary
            disableGutters
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx = {{m:'auto', bgcolor:'#e3f2fd', height:'15%'}}>
                {props.child}
                <BayForm child = {props.child} state = {props.state} onClick = {props.onClick}/>
        </AccordionSummary>
        <AccordionActions>
            <FormGroup>
                <FormControlLabel control={<Switch checked = {props.state} onChange ={props.OnClick}/>} label="TrestleOn"  />
            </FormGroup>
        </AccordionActions>
    </Accordion>
        
    )

}