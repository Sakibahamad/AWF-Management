import React, { useState, useRef, useEffect } from 'react';
import './Homepage2.css';
import profile from '../Componenets/44.jpg';
// import backgroundImage from '../Componenets/image.jpg';
import advika from '../Componenets/Advika.png'; 
import { useNavigate } from 'react-router-dom';
import VerticalNav from './VerticalNav'; 

function Homepage2() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  const handleMenuItemClick = (path) => {
    navigate(path);
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="app"
      // style={{
      //   backgroundImage: `url(${backgroundImage})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      // }}
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
              onClick={() => setIsDropdownVisible((prev) => !prev)}
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
        {/* Always Visible Vertical Navigation */}
        <VerticalNav 
          isSidebarVisible={true} // Sidebar is always visible
          handleMenuItemClick={handleMenuItemClick}
          sidebarRef={sidebarRef}
        />
      </main>
    </div>
  );
}

export default Homepage2;
