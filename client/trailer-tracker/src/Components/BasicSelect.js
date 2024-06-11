import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants(props) {
  const [empty, setEmpty] = React.useState('');

  const handleChange = (event) => {
    setEmpty(event.target.value);
  };

  return (
    <div>
      <FormControl variant="filled" sx={ props.sx }>
        <InputLabel id="demo-simple-select-standard-label">Empty Trailer</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={empty}
          onChange={handleChange}
          label="Empty Trailer"
        >
          
          <MenuItem value={"Yes"}>Yes</MenuItem>
          <MenuItem value={"No"}>No</MenuItem>
        </Select>
      </FormControl>
      
    </div>
  );
}
