// SelectInput.js
import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { FormGroup } from '@mui/material'; 

function SelectInput({ label, value,title, options, onChange }) {
  return (
    <>
    <FormGroup label={title} labelfor='select'>{title}</FormGroup>

    <TextField
      select
      label={label}
      // value={value}
      // onChange={onChange}
      // variant="standard"
      fullWidth
      size='small'
     
>
      {options.map((option,index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
    </>
  );
}

export default SelectInput;