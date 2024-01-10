// AccountSetting.js
import React from 'react';
import { Button} from '@mui/material';
import './accountsetting.css'

const AccountSetting = () => {
  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="input-group-1">
            <label htmlFor="firstName">First Name</label>
            <input type="text" />
          </div>
          <div className="input-group-2">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" />
          </div>
        </div>
        <div className="col">
          <div className="input-group-3">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="number" id="phoneNumber" />
          </div>
          <div className="input-group-4">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" />
          </div>
        </div>
        <div className="col">
          <div className="input-group-5">
            <label htmlFor="city">City</label>
            <input type="text" id="city" />
          </div>
          <div className="input-group-6">
            <label htmlFor="state">State</label>
            <input type="text" id="state" />
          </div>
        </div>
        <div className="col">
          <div className="input-group-7">
            <label htmlFor="pincode">Pincode</label>
            <input type="number" id="pincode" />
          </div>
          <div className="input-group-8">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" />
          </div>
        </div>
      </div>
      <div className="profile-update-btn">
        <Button>Update</Button>
      </div>
    </div>
  );
};

export default AccountSetting;



