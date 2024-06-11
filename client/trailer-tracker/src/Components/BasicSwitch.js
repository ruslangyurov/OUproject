import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function BasicSwitch(props) {
    return (
      <FormGroup>
         <FormControlLabel control={<Switch defaultChecked color = 'warning' style = {props.style} />} label="TrestleOn"  />
      </FormGroup>
        
        )
}