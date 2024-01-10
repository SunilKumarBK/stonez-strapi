import React from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './NavbarDashboard.css'

const NavbarDashboard = () => {
    return (
        <div>
            <nav className='dashbarnav' >
                <div className='navcontent'>
                    {/* <FontAwesomeIcon  className='menuicon' icon={faBars} /> */}
                    <img src={require('../../navbar/logo.png')} style={{color:'black'}} width='120px' alt="Logo" />
                </div>
                <div className="navrightcontent">
                <img
        src='http://fc05.deviantart.net/fs70/i/2013/088/1/2/construction_worker_by_vishalpandya1991-d5znhol.png'
        alt="Profile"
        className="profile-image"
      />
                    <div className='navrightcontent-div' > <button style={{border:'none',background:'none',display:'flex',gap:'5px'}}> <i class="fa-solid fa-user" ></i><h4>Profile</h4></button></div>
                    <div className='navrightcontent-div' > <button style={{border:'none',background:'none',display:'flex',gap:'5px'}}> <i class="fa fa-sign-out" ></i>  <h4>Logout </h4>  </button></div>
                    
                </div>

            </nav>
        </div>
    )
}

export default NavbarDashboard