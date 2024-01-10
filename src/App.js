import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Gallery from "./components/Gallery";
import Login from './components/Login';
import Apphome from './Apphome';
import Navbar  from './navbar/Navbar';

import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';
import Dashboard from './Dashboard/DashboardComponent/Dashboard';
import Menu2 from './Dashboard/SidemenuComponent/Menu2/Menu2';
import ImageGallery from './Dashboard/SidemenuComponent/Menu3/ImageGallery';
import Profile from './Dashboard/SidemenuComponent/Menu4/profile';

function App  (){

  return (
    <div>
     
    <BrowserRouter>
      
      <Routes>
        <Route path="/" exact element={<Apphome/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/menu2" element={<Menu2/>} />
        <Route path="/menu3" element={<ImageGallery/>} />
        <Route path="/menu4" element={<Profile/>} />
        
        

      </Routes>
    </BrowserRouter>

    </div>
  );
};

export default App;
