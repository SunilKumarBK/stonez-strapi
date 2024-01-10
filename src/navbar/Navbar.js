import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "font-awesome/css/font-awesome.min.css";
import "./Navbar.css";
import Adduser from '../Adduser';


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [colorChange, setColorChange] = useState(false);

  const changeNavbarColor = () => {
    if (window.scrollY >= 100) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };

  window.addEventListener("scroll", changeNavbarColor);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav id="nav" className={`navbar ${isMobileMenuOpen ? "mobile" : ""} ${colorChange ? 'colorChange' : 'navbar'}`}>

        <div className="logo">
          <img src={require('./logo.png')} width='220px' alt="Logo" />
        </div>
        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
        <li>
  <NavLink
    to="/"
    className="home"
    exact={true}
  >
    Home
  </NavLink>
</li>
<li>
  <NavLink
    to="/gallery"
    className="gallery"
  >
    Gallery
  </NavLink>
</li>
<li>
  <NavLink
    to="/project"
    className="project"
  >
    Projects
  </NavLink>
</li>
<li>
  <NavLink
    to="/contact"
    className="contact"
  >
    Contact Us
  </NavLink>
</li>
<li>
  <Adduser/>
</li>
<li>
  <a href="/Login">
    <button className="login">Login</button>
  </a>
</li>


        </ul>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <i className="fa-solid fa-xmark" id="xmarkicon"></i>
          ) : (
            <i className="fa fa-bars" id="baricon"></i>
          )}
        </div>
      </nav>

      <div className={`background-image ${showBackground ? "show" : ""}`}>
        <div className="heading1">
          <h1>Interiors</h1>
          <span className="subheading">
            <a href="#">Home</a> <span style={{ color: 'grey' }}>/</span> <span>Interiors</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
