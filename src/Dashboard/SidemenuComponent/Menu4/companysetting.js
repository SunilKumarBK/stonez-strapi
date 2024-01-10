import React, { useState } from 'react';
import axios from 'axios';
import './CompanySettings.css';
import apiUrl from '../../../Api/ApiUrl';

const CompanySettings = () => {
  // State to store input values
  const [formData, setFormData] = useState({
    companyName: '',
    companyLogo: null,
    companyAddress: '',
    email: '',
    companyDescription: '',
    phoneNumber: '',

  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { id, value, type, files } = e.target;

    // For file input, use the selected file
    const inputValue = type === 'file' ? files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [id]: inputValue,
    }));
  };
  console.log('formData',formData);

  // Function to handle form submission
  const handleFormSubmit = () => {
    console.log('Posting data:', formData);

    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify({
      companyName: formData.companyName,
      companyAddress: formData.companyAddress,
      email:formData.email,
      companyDescription:formData.companyDescription,
      phoneNumber: formData.phoneNumber,

      
    }));

    if (formData.companyLogo) {
      formDataToSend.append('files.companyLogo', formData.companyLogo);
    }
    console.log('formdata', formDataToSend)


    axios.post(`${apiUrl}/api/company-settings`, formDataToSend, {

      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  return (
    <div className='company-setting'>
      <label htmlFor="companyName">Company Name:</label>
      <input type="text" id="companyName" value={formData.companyName} onChange={handleInputChange} />

      <label htmlFor="companyLogo">Company Logo:</label>
      <input type="file" id="companyLogo" onChange={handleInputChange} />

      <label htmlFor="companyAddress">Company Address:</label>
      <input type="text" id="companyAddress" value={formData.companyAddress} onChange={handleInputChange} />

      <label htmlFor="phoneNumber">Phone Number:</label>
      <input type="tel" id="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={formData.email} onChange={handleInputChange} />

      <label htmlFor="companyDescription">Company Description:</label>
      <textarea id="companyDescription" style={{ padding: '10px' }} value={formData.companyDescription} onChange={handleInputChange}></textarea>

      <div className='company-setting-btn'>
        <button onClick={handleFormSubmit} style={{ marginLeft: '-18%' }}>Save</button>
        <button style={{ marginRight: '32%' }}>Update</button>
      </div>
    </div>
  );
};

export default CompanySettings;
