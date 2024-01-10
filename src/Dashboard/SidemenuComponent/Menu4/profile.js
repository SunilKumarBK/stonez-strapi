// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import yellowBackground from '../../../images/yellow-background.jpg';
import { Button, Dialog } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CompanySetting from './companysetting';
import AccountSetting from './accountsetting';
import Document from './document';
import { Divider } from '@mui/material';
import './profile.css';
import Billing from './billing';
import axios from 'axios';
import apiUrl from '../../../Api/ApiUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaCross, FaPen, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState({ companyLogo: null, companyName: '' });
  const [selectedSection, setSelectedSection] = useState('account');
  const [accountData, setAccountData] = useState();
  const [companyData, setCompanyData] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [companyDialog, setCompanyDialog] = useState(false);
  const [accountDialog, setAccountDialog] = useState(false);
  const [newCompanyname, setNewCompanyname] = useState();
  const [newaccountname, setNewAccountname] = useState({ firstName: '', lastName: '' });


  useEffect(() => {
    axios.get(`${apiUrl}/api/account-Settings?populate=*`).then((res) => { setAccountData(res.data.data) });
    axios.get(`${apiUrl}/api/company-settings?populate=*`).then((res) => { setCompanyData(res.data.data) });


  }, [companyDialog,accountDialog])
  console.log(accountData, 'accountdata');
  console.log(companyData, 'companydata');
  console.log(newCompanyname, 'newcompanyname');
  console.log(newaccountname, 'newaccname');




  const firstName = accountData && accountData.length > 0 ? accountData[1]?.attributes?.firstName || '' : '';
  const lastName = accountData && accountData.length > 0 ? accountData[1]?.attributes?.lastName || '' : '';

  const companyName = companyData && companyData.length > 0 ? companyData[1]?.attributes?.companyName || '' : '';
  const companyLogo = companyData && companyData.length > 0 ? `${apiUrl}${companyData[1]?.attributes?.companyLogo.data.attributes.url}` || '' : '';

  console.log('Company Logo URL:', companyLogo);



  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage({ companyLogo: file });
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleimg = () => {
    // if (!selectedImage || !selectedImage.companyLogo) {
    //   console.error('No image selected for update.');
    //   return;
    // }

    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify({
      companyName: newCompanyname ? newCompanyname : companyData[1].attributes.companyName,
      companyAddress: companyData[1].attributes.companyAddress,
      email: companyData[1].attributes.email,
      companyDescription: companyData[1].attributes.companyDescription,
      phoneNumber: companyData[1].attributes.phoneNumber,


    }));

    if (selectedImage.companyLogo) {
      formDataToSend.append('files.companyLogo', selectedImage.companyLogo);
    } else if (companyData && companyData.attributes && companyData.attributes.image && companyData.attributes.image.data && companyData.attributes.image.data.attributes && companyData.attributes.image.data.attributes.url) {
      // If there is no new image, use the existing image URL
      const existingImageURL = companyData.attributes.image.data.attributes.url;
      formDataToSend.append('files.image', existingImageURL);
    }
    console.log('formdata', formDataToSend)

    axios.put(`${apiUrl}/api/company-settings/2`, formDataToSend)
      .then((res) => {
        console.log('Data posted successfully:', res.data);
        setCompanyDialog(false)

      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  }


  const handleaccname = () => {
    // if (!selectedImage || !selectedImage.companyLogo) {
    //   console.error('No image selected for update.');
    //   return;
    // }

    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify({
      firstName: newaccountname.firstName ? newaccountname.firstName : accountData[1].attributes.firstName,
      lastName: newaccountname.lastName ? newaccountname.lastName : accountData[1].attributes.lastName,
      phoneNumber: accountData[1].attributes.phoneNumber,
      emailAddress: accountData[1].attributes.emailAddress,
      city: accountData[1].attributes.city,
      state: accountData[1].attributes.state,
      pincode: accountData[1].attributes.pincode,
      country: accountData[1].attributes.country,


    }));


    console.log('formdata', formDataToSend)

    axios.put(`${apiUrl}/api/account-settings/2`, formDataToSend)
      .then((res) => {
        console.log('Data posted successfully:', res.data);
        setAccountDialog(false)

      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  }




  const renderSelectedComponent = () => {
    switch (selectedSection) {
      case 'account':
        return <AccountSetting />;
      case 'company':
        return <CompanySetting />;
      case 'document':
        return <Document />;
      case 'billing':
        return <Billing />;
      default:
        return null;
    }
  };

  const openFileInput = () => {
    // document.getElementById('fileInput').click();
    setDialogOpen(true)
  };

  return (
    <div className="profile-card">
      <div className='profile-yellow-background-img'>
        <img src={yellowBackground} alt="Yellow Background" />
      </div>
      <Card className="left-card">
        <Card.Body>
          <img
            // src={selectedImage ? URL.createObjectURL(selectedImage) : 'http://fc05.deviantart.net/fs70/i/2013/088/1/2/construction_worker_by_vishalpandya1991-d5znhol.png'}
            src={companyLogo}
            alt="Profile"
            className="profile-image"
          />



          <div className="image-placeholder">
            <button onClick={openFileInput} >
              <CameraAltIcon fontSize="small" style={{ fontSize: '20px', color: '#fff', marginRight: '-100%' }} />
            </button>
            <Dialog open={dialogOpen}>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                // style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
              <Button onClick={handleimg}>Confirm</Button>

            </Dialog>
            
            <Dialog open={companyDialog} className='companyDialog'>
            <form style={{padding:'15px',gap:'10px',display:'flex',flexDirection:'column',width:'350px'}}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Update Details</p><FaTimes onClick={()=>setCompanyDialog(false)}/></div>
              <input type='text' placeholder='Company Name' className='companyDialoginput'onChange={(e) => setNewCompanyname(e.target.value)} />
              <Button onClick={handleimg}>submit</Button>
              </form>
            </Dialog>

            <Dialog open={accountDialog} className='accountDialog' >
              <form style={{padding:'15px',gap:'10px',display:'flex',flexDirection:'column',width:'350px'}}>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Update Details</p><FaTimes onClick={()=>setAccountDialog(false)}/></div>
              <input type='text' placeholder='FirstName'  className='accountDialoginput' onChange={(e) => setNewAccountname({ firstName: e.target.value, lastName: newaccountname.lastName })} />
              <input type='text' placeholder='LastName' className='accountDialoginput' onChange={(e) => setNewAccountname({ firstName: newaccountname.firstName, lastName: e.target.value })} />
              <Button onClick={handleaccname}>submit</Button>
              </form>
            </Dialog>

          </div>
          <div className='person-name'>
            <div style={{ display: "flex", justifyContent: "center" }}><p id='username' style={{ fontWeight: 'bold', fontSize: '16px', marginTop: '5%', display: "flex", gap: '10px' }}>
              {`${firstName}${lastName}`}<FaPen  onClick={() => setAccountDialog(true)} /></p></div>
            <div style={{ display: "flex", justifyContent: "center" }}><p style={{ fontSize: '12px', marginTop: '-2%', marginBottom: '9%', display: "flex", gap: '10px' }}>{companyName}<FaPen onClick={() => setCompanyDialog(true)} /></p></div>
            <Divider style={{ marginTop: '2%' }} />
            <p style={{ fontSize: '14px' }} className='profile-ptag-content'>
              oppertunities applied
              <span style={{ color: 'orange', fontWeight: 'bold', marginLeft: '15%' }}>30</span>
            </p>
            <Divider style={{ color: 'rgb(241, 241, 241)' }} />
            <p className='profile-ptag-content'>
              oppertunities applied
              <span style={{ color: 'green', fontWeight: 'bold', marginLeft: '15%' }}>12</span>
            </p>
            <Divider />
            <p className='profile-ptag-content'>
              oppertunities applied
              <span style={{ fontWeight: 'bold', marginLeft: '15%' }}>16</span>
            </p>
            <Divider style={{ marginTop: '-1%' }} />
            <div className='profile-left-card-btn'>
              <Button style={{ marginTop: '6%' }}>
                View Public Profile
              </Button>
            </div>
            <div className='profile-left-card-btn'>
              <Button style={{ color: 'blue', textTransform: 'lowercase' }}>
                https://www.google
                <Divider orientation="vertical" flexItem style={{ margin: '5px 10px' }} />

                <FileCopyIcon style={{ marginLeft: '85%', color: 'grey', fontSize: '22px', position: 'absolute' }} />
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
            {/* <Divider style={{ marginTop: '3%', width: '11%', marginLeft: '-1%', height: '1px', boxShadow: '2px -1px 1px 2px #ffc107' }} /> */}
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
