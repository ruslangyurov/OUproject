import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [empty, setEmpty] = React.useState('');

  const handleChange = (event) => {
    setEmpty(event.target.value);
  };

  return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="StandTrailer">Stand Trailer</InputLabel>
        <Select
          labelId="StandTrailer"
          id="Trailer"
          value={empty}
          label="Stand Trailer"
          onChange={handleChange}
        >
          <MenuItem value={"Full"}>Full Trailer</MenuItem>
          <MenuItem value={"Empty"}>Empty Trailer</MenuItem>
          <MenuItem value={'None'}>None</MenuItem>
        </Select>
      </FormControl>
  );
}
