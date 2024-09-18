import React, { useState, useRef, useEffect } from 'react';
import './Homepage1.css';
import profile from '../Componenets/profile2.jpg';
import advika from '../Componenets/Advika.png'; 
import { useNavigate } from 'react-router-dom';
import VerticalNav from './VerticalNav.js'; 
import ImageSlider from './ImageSlider.js'; 
import FeatureSection from './FeatureSection.js';
import Info from './Info.js';
import Bottom from './Bottom.js';
import Gallary from './Gallary.js';
import Footer from './Footer.js';

function Homepage1() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
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
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };

    checkAuthStatus();

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

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/homepage'); 
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={`app ${isSidebarVisible ? 'sidebar-open' : ''}`}>
      <header className="app-header">
        <nav className="navbar">
          {!isAuthenticated && (
            <div className="navbar-left">
              <img src={advika} alt="Advika" className="advika-image" /> 
              <a href="#home" onClick={() => window.scrollTo(0, 0)}>Home</a>
              <a onClick={() => navigate('/feature')}>About Us</a>
              <a  onClick={() => navigate('/Bottom')}>Contact Us</a>
              <a onClick={() => navigate('/Gallary')}>Gallery</a>
            </div>
          )}
          {!isAuthenticated && (
            <div className="navbar-right">
              <img
                src={profile}
                alt="Profile"
                className="profile-image"
                onClick={toggleDropdown}
              />
              {isDropdownVisible && (
                <div className="dropdown-menu" ref={dropdownRef}>
                 <div className="dropdown-item" onClick={() => handleMenuItemClick('/login')}>Login</div>
                  {/* <div className="dropdown-item" onClick={() => handleMenuItemClick('/register')}></div> */}
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      <main>
        {isAuthenticated && (
          <>
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
          </>
        )}

        <ImageSlider />
        <FeatureSection />
        <Info />
        <Gallary />
        <Bottom />
        <Footer />
      </main>
    </div>
  );
}

export default Homepage1;
