import React from 'react';
import { TextField } from '@mui/material';
import './TypeText.css'; // Import the CSS file for custom styling

const TypeText = ({ label, id, type, placeholder, value, onChange ,style}) => {
  

  return (
    <div>
      <TextField
       input
       label={label}
       id={id}
       type={type}
       placeholder={placeholder}
       value={value}
       style={style}
       onChange={onChange}
        // className="custom-text-field" 
        size='small'
       InputProps={{disableUnderline:true}}
      />

    </div>
  );
};

export default TypeText;
