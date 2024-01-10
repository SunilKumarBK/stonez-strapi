import React, { useState } from 'react';
import './CompanySettings.css'; // Import your CSS file

const CompanySettings = () => {
  const [companyName, setCompanyName] = useState('paperz');
  const [companyAddress, setCompanyAddress] = useState('ooty');
  const [phone, setPhone] = useState('6659665463');
  const [email, setEmail] = useState('paperz@gmail.com');

  const handleSave = () => {
    // Add logic to save/update company settings
    console.log('Save/Update clicked!');
  };

  return (
    <div className="company-settings-container">
      <h2>Company Settings</h2>

      <div className="company-setting-field">
        <label>Company Name:</label>
        <span>{companyName}</span>
      </div>

      <div className="company-setting-field">
        <label>Company Address:</label>
        <span>{companyAddress}</span>
      </div>

      <div className="company-setting-field">
        <label>Contact Information:</label>
        <span>{phone} | {email}</span>
      </div>

      <button onClick={handleSave}>Save/Update</button>
    </div>
  );
};

export default CompanySettings;
