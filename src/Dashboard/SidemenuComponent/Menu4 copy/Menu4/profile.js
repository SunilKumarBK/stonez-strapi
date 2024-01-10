// src/components/Profile.js
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import yellowBackground from '../../../images/yellow-background.jpg';
import { Button} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy'; 
import CompanySetting from './companysetting';
import AccountSetting from './accountsetting';
import Document from './document';
import { Divider } from '@mui/material';
import './profile.css';
import Billing from './billing';

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSection, setSelectedSection] = useState('account');

  const handleCameraIconClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const renderSelectedComponent = () => {
    switch (selectedSection) {
      case 'account':
        return <AccountSetting />;
      case 'company':
        return <CompanySetting />;
      case 'document':
        return <Document/>;
      case 'billing':
        return <Billing/>;
      default:
        return null;
    }
  };


    return (
        <div className="profile-card">
            <div className='profile-yellow-background-img'>
                <img src={yellowBackground} alt="Yellow Background" />
            </div>
            <Card className="left-card">
                <Card.Body>
                    <img
                        src={selectedImage ? URL.createObjectURL(selectedImage) : 'http://fc05.deviantart.net/fs70/i/2013/088/1/2/construction_worker_by_vishalpandya1991-d5znhol.png'}
                        alt="Profile"
                        className="profile-image"
                    />
                    <div className="image-placeholder"  >
                        <button onClick={handleCameraIconClick}  >
                            <CameraAltIcon fontSize="small" style={{ fontSize: '20px', color: '#fff', alignItems: 'center', marginTop: '13.2%' }}  />
                        </button>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                    </div>
                    <div className='person-name'>
            <p style={{fontWeight: 'bold',fontSize: '16px' , marginTop: '5%'}}>Takemichi Hanagaki</p>
            <p style={{ fontSize: '12px' , marginTop: '-2%' , marginBottom: '9%' }}>Microsoft Inc.</p>
            <Divider style={{ marginTop: '2%' }} />
            <p style={{fontSize: '14px'}} className='profile-ptag-content'>
              oppertunities applied
              <span style={{color: 'orange' ,fontWeight: 'bold' ,marginLeft: '15%'}}>30</span>
            </p>
            <Divider style={{ color: 'rgb(241, 241, 241)'}} />
            <p className='profile-ptag-content'>
              oppertunities applied
              <span style={{color: 'green' , fontWeight: 'bold', marginLeft: '15%'}}>12</span>
            </p>
            <Divider  />
            <p className='profile-ptag-content'>
              oppertunities applied
              <span style={{ fontWeight: 'bold', marginLeft: '15%'}}>16</span>
            </p>
            <Divider style={{ marginTop: '-1%'}} />
            <div className='profile-left-card-btn'>
  <Button style={{ marginTop: '6%' }}>
    View Public Profile
  </Button>
</div>
<div className='profile-left-card-btn'>
  <Button style={{ color: 'blue', textTransform:'lowercase' }}>
  https://www.google
  <Divider orientation="vertical" flexItem style={{ margin: '5px 10px' }} />

    <FileCopyIcon style={{ marginLeft: '85%', color: 'grey', fontSize:'22px', position:'absolute' }} />
  </Button>
</div>
        

      </div>
    
  </Card.Body>
</Card>

<Card className="right-card">
  <div className="card-body">
    <Card.Body>
    <div className='profile-list'>
              <ul>
                <li className={selectedSection === 'account' ? 'selected' : ''} onClick={() => handleSectionClick('account')}>
                  Account setting
                </li>
              </ul>
              <ul>
                <li className={selectedSection === 'company' ? 'selected' : ''} onClick={() => handleSectionClick('company')}>
                  Company setting
                </li>
              </ul>
              <ul>
                <li className={selectedSection === 'document' ? 'selected' : ''} onClick={() => handleSectionClick('document')}>
                Document
                </li>
              </ul>
              <ul>
                <li className={selectedSection === 'billing' ? 'selected' : ''} onClick={() => handleSectionClick('billing')}>
                Billing
                </li>
              </ul>
              {/* Add other sections as needed */}
            </div>
            <Divider style={{ marginTop: '3%', width: '11%', marginLeft: '-1%', height: '1px', boxShadow: '2px -1px 1px 2px #ffc107' }} />
            <Divider style={{ marginTop: '-0.1%', width: '58.6vw', marginLeft: '-3.9%', borderColor: 'rgba(106, 106, 106, 0.2)' }} />
            {/* Render the selected component */}
            {renderSelectedComponent()}
      
    </Card.Body>
    
  </div>
  
</Card>
    </div>
  );
};

export default Profile;
