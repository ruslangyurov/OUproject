import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export const BasicLogin = () => {



  return (
   <div>
        <TextField
          required
          type = "String"
          id="Username"
          label="Username"
          defaultValue=""
          helperText="Please enter username"
        />
        <TextField 
          required
          type = "Password"
          id="Password"
          label="Password"
          defaultValue=""
          helperText="Please enter password"
        />

        <Button variant="contained" endIcon={<SendIcon />} sx={{ml:2,height:53, width:100}}>Submit</Button>
        


    </div>
  )

  }

