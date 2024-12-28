import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerticalNav.css';

function VerticalNav({ isSidebarVisible, handleMenuItemClick, sidebarRef }) {
  const navigate = useNavigate();

  // Define the navigation order
  const navSequence = [
    { path: '/student', item: 'student' },
    { path: '/monthly', item: 'monthly' },
    { path: '/event-yearly', item: 'event' },
    { path: '/in-kind', item: 'in-kind' },
    { path: '/inventory', item: 'inventory' },
    { path: '/expenses', item: 'expenses' },
    { path: '/employee', item: 'employee' },
  ];

  const [activeIndex, setActiveIndex] = useState(0); // Track the active index
  const [hoveredItem, setHoveredItem] = useState(null); // Track the hovered item

  // Handle navigation based on the index
  const handleNavigation = (index) => {
    const { path, item } = navSequence[index];
    setActiveIndex(index); // Update active index
    handleMenuItemClick(); // Close sidebar
    navigate(path); // Navigate to the corresponding path
  };

  const handleNextPage = () => {
    // Move to the next item, or loop back to the first
    const nextIndex = (activeIndex + 1) % navSequence.length;
    handleNavigation(nextIndex);
  };

  const handleBackPage = () => {
    // Move to the previous item, or loop to the last
    const prevIndex = (activeIndex - 1 + navSequence.length) % navSequence.length;
    handleNavigation(prevIndex);
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
      {/* Sidebar Items */}
      {navSequence.map(({ item, path }, index) => (
        <div
          key={item}
          className={`sidebar-item ${activeIndex === index ? 'active' : ''}`}
          onClick={() => handleNavigation(index)}
          onMouseEnter={() => handleMouseEnter(item)}
          onMouseLeave={handleMouseLeave}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)} {/* Capitalize the first letter */}
        </div>
      ))}

      {/* Footer Section */}
      <div className="sidebar-footer">
        <button className="footer-btn back-btn" onClick={handleBackPage}>
          Back
        </button>
        <button className="footer-btn next-btn" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </nav>
  );
}

export default VerticalNav;
