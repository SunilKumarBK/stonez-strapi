import { InputLabel } from '@mui/material';
import React, { useState } from 'react';
import SelectInput from './selectcomponent';


const Selectfile = ({label,title,optionss,onChange,value}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const options = [
    
    { value: 'Exterior', label: 'Exterior' },
{ value: 'Interior', label: 'Interior' },
    { value: 'Module', label: 'Module' },
  ];
  

  return (
    <div>
      {/* <h2>Your Component</h2> */}
      
      <SelectInput
      title={title}
        label={label}
        value={value}
        options={optionss}
        // onChange={onchange}
        className="custom-select-file"
      />
    </div>
  );
};

export default Selectfile;