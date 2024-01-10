import React from 'react'
import NavbarDashboard from './NavbarDashboard'
import Sidemenubar from './Sidemenubar'
import './Dashboard.css'
import Profile from '../SidemenuComponent/Menu4/profile'


const Dashboard = () => {
  return (
    <div className='body'>
        <NavbarDashboard/>
        <Sidemenubar/>
        
        
    </div>
  )
}

export default Dashboard