import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicSelect from '../Components/BasicSelect'


export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Trailer Number"
          helperText="Please enter trailer number"
        />
        <TextField
          id="Stock - text"
          defaultValue="Stock delivered"
          label = 'Stock'
          helperText="Enter type of stock delivered"
        />
        <TextField
          id="Comment - text"
          label='Comment'
          defaultValue= ""
        />
       
        <BasicSelect sx = {{float:'right', m:'auto', minWidth: 120}}/>
    
       </div>
    </Box>
  );
}
