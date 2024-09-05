import React, { useState, useRef, useEffect } from 'react';
import './Homepage1.css';
import profile from '../Componenets/profile2.jpg';
import backgroundImage from '../Componenets/image.jpg';
import advika from '../Componenets/Advika.png'; 
import { useNavigate } from 'react-router-dom';
import VerticalNav from './VerticalNav'; 
import FeatureSection from './FeatureSection';
import Bottom from './Bottom';
import Gallary from './Gallary';

function Homepage2() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setIsDropdownVisible(false);
    setIsSidebarVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }

      if (
        sidebarRef.current && !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`app ${isSidebarVisible ? 'sidebar-open' : ''}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <header className="app-header">
        <nav className="navbar">
          <div className="navbar-left">
            <img src={advika} alt="Advika" className="advika-image" /> 
            <a href="#home">Home</a>
            <a href="" onClick={() => navigate('/feature')}>About Us</a>
              <a href="" onClick={() => navigate('/Bottom')}>Contact Us</a>
              <a href="" onClick={() => navigate('/Gallary ')}>Gallery</a>
          </div>
          <div className="navbar-right">
            <img
              src={profile}
              alt="Profile"
              className="profile-image"
              onClick={toggleDropdown}
            />
            {isDropdownVisible && (
              <div className="dropdown-menu" ref={dropdownRef}>
                <div className="dropdown-item" onClick={() => handleMenuItemClick('/sign-out')}>Sign Out</div>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main>
        <div className="hamburger-menu" onClick={toggleSidebar}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <VerticalNav 
          isSidebarVisible={isSidebarVisible}
          handleMenuItemClick={handleMenuItemClick}
          sidebarRef={sidebarRef}
        />
      </main>
    </div>
  );
}

export default Homepage2;
