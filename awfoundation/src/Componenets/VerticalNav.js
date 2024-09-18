import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerticalNav.css'; // Updated CSS import

function VerticalNav({ isSidebarVisible, handleMenuItemClick, sidebarRef }) {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null); // Track the hovered item

  const handleNavigation = (path) => {
    handleMenuItemClick(); // Close sidebar
    navigate(path); // Navigate to the path
  };

  const handleMouseEnter = (item) => {
    setHoveredItem(item); // Set hovered item
  };

  const handleMouseLeave = () => {
    setHoveredItem(null); // Clear hovered item
  };

  return (
    <nav
      className={`sidebar ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}
      ref={sidebarRef}
      aria-hidden={!isSidebarVisible}
    >
      <div className="sidebar-item" onClick={() => handleNavigation('/student')}>
        Students
      </div>

      <div
        className="sidebar-item"
        onMouseEnter={() => handleMouseEnter('donation')}
        onMouseLeave={handleMouseLeave}
      >
        Donations
        {hoveredItem === 'donation' && (
          <div className="dropdown">
            <div className="dropdown-item" onClick={() => handleNavigation('/monthly')}>
              Monthly
            </div>
            <div className="dropdown-item" onClick={() => handleNavigation('/event-yearly')}>
              Event/Yearly
            </div>
            <div className="dropdown-item" onClick={() => handleNavigation('/in-kind')}>
            in-kind
            </div>
          </div>
        )}
      </div>

      <div className="sidebar-item" onClick={() => handleNavigation('/inventory')}>
        Inventory
      </div>
      <div className="sidebar-item" onClick={() => handleNavigation('/expenses')}>
        Expenses
      </div>
      <div className="sidebar-item" onClick={() => handleNavigation('/employee')}>
        Employees
      </div>
    </nav>
  );
}

export default VerticalNav;
