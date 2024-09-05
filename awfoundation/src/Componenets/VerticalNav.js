// VerticalNav.js
import React from 'react';
import './VerticalNav.css'; // Import the CSS specific to the vertical nav

function VerticalNav({ isSidebarVisible, handleMenuItemClick, sidebarRef }) {
  return (
    <>
      {isSidebarVisible && (
        <div className="sidebar" ref={sidebarRef}>
          <div className="sidebar-item" onClick={() => handleMenuItemClick('/donation')}>Donation</div>
          <div className="sidebar-item" onClick={() => handleMenuItemClick('/inventory')}>Inventory</div>
          <div className="sidebar-item" onClick={() => handleMenuItemClick('/expense')}>Expense</div>
        </div>
      )}
    </>
  );
}

export default VerticalNav;
