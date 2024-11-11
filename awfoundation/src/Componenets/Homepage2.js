import React, { useState, useRef, useEffect } from 'react';
import './Homepage2.css';
import profile from '../Componenets/44.jpg';
import backgroundImage from '../Componenets/image.jpg';
import advika from '../Componenets/Advika.png'; 
import humbel from '../Componenets/humbel.png'; // Import the humbel image
import { useNavigate } from 'react-router-dom';
import VerticalNav from './VerticalNav'; 

function Homepage2() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Initially sidebar is hidden
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev); // Toggle the sidebar visibility
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setIsDropdownVisible(false);
    setIsSidebarVisible(false); // Close sidebar after navigation
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
        setIsSidebarVisible(false); // Close the sidebar when clicked outside
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
            <a onClick={() => navigate('/feature2')}>About Us</a>
            <a onClick={() => navigate('/bottom2')}>Contact Us</a>
            <a onClick={() => navigate('/gallary2')}>Gallery</a>
          </div>
          <div className="navbar-right">
            <img
              src={profile}
              alt="Profile"
              className="profile-image"
              title="Sign Out"
              onClick={toggleDropdown}
            />
            <div className="username">Sakib@2004</div>
            {isDropdownVisible && (
              <div className="dropdown-menu" ref={dropdownRef}>
                <div className="dropdown-item" onClick={() => handleMenuItemClick('/sign-out')}>Sign Out</div>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main>
        {/* Humbel image that toggles the vertical sidebar */}
        <img 
          src={humbel} 
          alt="Humbel" 
          title='Menu'
          className="humbel-image" 
          onClick={toggleSidebar} 
          style={{
            position: 'fixed', 
            top: '10px', 
            left: '10px', 
            cursor: 'pointer', 
            zIndex: 1001
          }}
        />
        
        {/* Vertical Navigation */}
        {isSidebarVisible && (
          <VerticalNav 
            isSidebarVisible={isSidebarVisible}
            handleMenuItemClick={handleMenuItemClick}
            sidebarRef={sidebarRef}
          />
        )}
      </main>
    </div>
  );
}

export default Homepage2;
