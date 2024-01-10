// // AccountSetting.js
// import React from 'react';
// import { Button} from '@mui/material';
// import './accountsetting.css'

// const AccountSetting = () => {

//   return (
//     <div>
//       <div className="row">
//         <div className="col">
//           <div className="input-group-1">
//             <label htmlFor="firstName">First Name</label>
//             <input type="text" />
//           </div>
    
//           <div className="input-group-2">
//             <label htmlFor="lastName">Last Name</label>
//             <input type="text" />
//           </div>
//         </div>
//         <div className="col">
//           <div className="input-group-3">
//             <label htmlFor="phoneNumber">Phone Number</label>
//             <input type="number" id="phoneNumber" />
//           </div>
//           <div className="input-group-4">
//             <label htmlFor="email">Email Address</label>
//             <input type="email" id="email" />
//           </div>
//         </div>
//         <div className="col">
//           <div className="input-group-5">
//             <label htmlFor="city">City</label>
//             <input type="text" id="city" />
//           </div>
//           <div className="input-group-6">
//             <label htmlFor="state">State</label>
//             <input type="text" id="state" />
//           </div>
//         </div>
//         <div className="col">
//           <div className="input-group-7">
//             <label htmlFor="pincode">Pincode</label>
//             <input type="number" id="pincode" />
//           </div>
//           <div className="input-group-8">
//             <label htmlFor="country">Country</label>
//             <input type="text" id="country" />
//           </div>
//         </div>
//       </div>
//       <div className="profile-update-btn">
//         <Button>Update</Button>
//       </div>
//     </div>
//   );
// };

// export default AccountSetting;



// accountsetting.css
/* Add your styles here */

// AccountSetting.js
import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios'; // Import Axios
import './accountsetting.css';
import apiUrl from '../../../Api/ApiUrl';

const AccountSetting = () => {
  // State to store input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  console.log('accountformdata',formData);

  // Function to handle form submission
  const handleFormSubmit = async () => {
    console.log('Posting data:', formData);

    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName ,
      phoneNumber: formData.phoneNumber ,
      emailAddress: formData.emailAddress ,
      city: formData.city ,
      state: formData.state,
      pincode:formData.pincode ,
      country: formData.country,
     
    }));
    console.log('formdata', formDataToSend)

    try {
      // Make a POST request to Strapi API using Axios
      const response = await axios.post(`${apiUrl}/api/account-settings`, formDataToSend, {
        headers: {
          // 'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',

          // Add any additional headers if needed (e.g., authorization token)
        },
      });
      setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
    })

      // Handle success
      console.log('Data uploaded successfully', response.data);
    } catch (error) {
      // Handle error
      console.error('Failed to upload data to Strapi', error.message);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="input-group-1">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} />
          </div>
  
          <div className="input-group-2">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} />
          </div>
        </div>
        <div className="col">
          <div className="input-group-3">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="number" id="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
          </div>
          <div className="input-group-4">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="emailAddress" value={formData.email} onChange={handleInputChange} />
          </div>
        </div>
        <div className="col">
          <div className="input-group-5">
            <label htmlFor="city">City</label>
            <input type="text" id="city" value={formData.city} onChange={handleInputChange} />
          </div>
          <div className="input-group-6">
            <label htmlFor="state">State</label>
            <input type="text" id="state" value={formData.state} onChange={handleInputChange} />
          </div>
        </div>
        <div className="col">
          <div className="input-group-7">
            <label htmlFor="pincode">Pincode</label>
            <input type="number" id="pincode" value={formData.pincode} onChange={handleInputChange} />
          </div>
          <div className="input-group-8">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" value={formData.country} onChange={handleInputChange} />
          </div>
        </div>
      </div>
      <div className="profile-update-btn">
        <Button onClick={handleFormSubmit}>Update</Button>
      </div>
    </div>
  );
};

export default AccountSetting;
