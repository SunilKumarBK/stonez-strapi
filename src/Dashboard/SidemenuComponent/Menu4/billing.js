import React, { useState } from 'react';
import './billing.css';
import axios from 'axios';
import apiUrl from '../../../Api/ApiUrl';

const Billing = () => {
  // State to store input values
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    country: '',
    address: '',
    cardNumber: '',
    cvc: '',
    expiryDate: '',

  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target; 

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  console.log(formData,'formData');

  // Function to handle form submission
  const handleFormSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify({
       email: formData.email,
       name: formData.name,
       country: formData.country,
       address: formData.address,
       cardNumber: formData.cardNumber,
       cvc: formData.cvc,
       expiryDate: formData.expiryDate,


    }))
    console.log(formDataToSend,'formdatatosend')
    try {
     
      // Make a POST request to your Strapi API endpoint
      const response = await axios.post(`${apiUrl}/api/billings`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Content-Type': 'application/json',

        },
      });

      // Handle success
      console.log('Data submitted successfully', response.data);

      // Clear the form after successful submission if needed
      setFormData({
        email: '',
        name: '',
        country: '',
        address: '',
        cardNumber: '',
        cvc: '',
        expiryDate: '',

      });
    } catch (error) {
      // Handle error
      console.error('Failed to submit data to Strapi', error.message);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Email</h2>
      <label htmlFor="email"></label>
      <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />

      <h3>Billing Address</h3>
      <div className="grouped-fields">
        <div>
          <label htmlFor="name"></label>
          <input type="text" id="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="country"></label>
          <select id="country" value={formData.country} onChange={handleInputChange}>
            <option value="" disabled selected placeholder='Country'></option>
            <option value="usa">USA</option>
            <option value="canada">Canada</option>
            <option value="india">India</option>
            {/* Add more countries as needed */}
          </select>
        </div>
      </div>

      <label htmlFor="address"></label>
      <input type="text" id="address" placeholder="Address" value={formData.address} onChange={handleInputChange} />

      <h3>Card Information</h3>
      <label htmlFor="cardNumber"></label>
      <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleInputChange} />

      <label htmlFor="expiry"></label>
      <input type="text" id="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleInputChange} />

      <label htmlFor="cvc"></label>
      <input type="text" id="cvc" placeholder="CVC" value={formData.cvc} onChange={handleInputChange} />

      <button onClick={handleFormSubmit}>Pay</button>
    </div>
  );
};

export default Billing;
