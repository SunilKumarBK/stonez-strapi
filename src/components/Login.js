import React, { useState } from 'react';
import './Login.scss';
import gifImage from '../images/gifimg.gif';
import TypeText from '../inputfield/TypeText';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validCredentials = {
    'sunil@mail.com': 'sunil123',
    'sri@mail.com': 'sri123'
  };

  const customstyle = {
    
      width: '90%',
      border: '1px solid yellow',
      borderRadius: '6px',
      // backgroundColor: 'white',
      outline: '#c49711',
      
     }
  const handleLogin = () => {
    if (validCredentials[email] && validCredentials[email] === password) {
      // Valid email and password
      // Redirect to the home page or perform your desired action
      window.location.href = '/dashboard'; // Change to the correct path for your home page
    } else {
      // Invalid email or password
      setErrorMessage('Invalid email or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="left-container">
        <div className="left-content">
          <img src={gifImage} alt="GIF" className='gifimg' />
          <h2>Activity Log and Timesheet Management Simplified</h2>
          <p className='time'>© TimeSmartAI</p>
          <p>© Copyright 2023. TimeSmartAI, Inc. All Rights Reserved</p>
        </div>
      </div>
      <div className="right-container">
        <div className="rightcontent-login">
          <div className='logo-img'>
            <img className='round-background' src="https://stonez.co.in/img/stonez.ico" />
          </div>
          <p>Sign-in as a registered user with TimeSmartAI access credentials</p>
          <TypeText  type="email"
            placeholder="Enter your registered email here"
            value={email}
            style={customstyle}
            onChange={(e) => setEmail(e.target.value)} 
            />
          <div className="password-input-container">
        <TypeText
          type={showPassword ? 'text' : 'password'} 
          placeholder="Enter Password here"
          value={password}
          style={customstyle}
          onChange={(e) => setPassword(e.target.value)}
          // className="inputLable"

        />
        <span className="passwod-icon" onClick={togglePasswordVisibility}>
          <i
            className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
            style={{
              fontSize: '1.2em',
              position: 'absolute',
              right: '5%',
              marginTop: '-2.4%',
              // top: '52%',
              cursor: 'pointer',
            }}
          ></i>
        </span>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="button" onClick={handleLogin}>
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;