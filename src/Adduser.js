import React, { useState } from 'react';
import { Dialog, Button, Card, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TypeText from './inputfield/TypeText';
import './Adduser.css'

const Adduser = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const customstyle = {
    width: '100%',    
  }

  return (
    <>
      <button className="adduserbtn" onClick={handleOpenDialog}>
        Add User
      </button>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        // maxWidth="md"
        fullWidth
      >
        <Card className='cardd'>
          <div className="dialog-header">
            <h2>Add User</h2>
            <CloseIcon onClick={handleCloseDialog} />
          </div>
          <div style={{width:'90%',height:'2px',backgroundColor:'grey',marginLeft:'5%'}}></div>
          <div className="dialog-content">
    
            {/* <div style={{border:'2px solid grey',padding:'30px',width:"500px",borderRadius:'5px'}}> */}
            <div className='TypetextName'>
                <TypeText  label="First Name"  type="text" />
                <TypeText  label="Last Name" type="text" />
            </div>
            <div className='Typetext'>
                <TypeText className='TypeText' style={customstyle} label="Email"  type="email" />
            </div>
            
    <div className='Typetext'>
    <TypeText  label="Phone Number" style={customstyle}  type="number" />
    </div>
            <div className='Typetext'>
                <TypeText  label="Address" style={customstyle}  type="text" />
            </div>
            <div className='TypetextName'>
                <TypeText  label="City"  type="text" />
            <TypeText  label="State"  type="text" />
            </div>
            <div className='TypetextPincode'>
                <TypeText  label="Pincode"  type="number" />
                </div>
            
           
          </div>
          <div className="dialog-footer">
              <Button onClick={handleCloseDialog} color="error">
                Cancel
              </Button>
              <Button onClick={handleCloseDialog} color="success">
                Save
              </Button>
            </div>
        </Card>
      </Dialog>
    </>
  );
};

export default Adduser;