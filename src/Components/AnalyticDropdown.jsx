import React from 'react';
import { Menu, MenuItem } from '@mui/material';

const AnalyticDropdown = ({ anchorEl2, handleCloseMenu }) => {
    const menuStyle = {
        // Custom styles for the menu
        marginLeft:'15px',
        borderRadius: '8px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
      };
    
      const menuItemStyle = {
        // Custom styles for each menu item
        fontSize: '14px',
        color: '#333',
        padding: '8px 16px',
      };
  return (
    <Menu
      anchorEl={anchorEl2}
      open={Boolean(anchorEl2)}
      onClose={handleCloseMenu}
      style={menuStyle}
    >
      <MenuItem onClick={handleCloseMenu} style={menuItemStyle}>Weekly</MenuItem>
      <MenuItem onClick={handleCloseMenu} style={menuItemStyle}>Monthly</MenuItem>
      <MenuItem onClick={handleCloseMenu} style={menuItemStyle}>Yearly</MenuItem>
    </Menu>
  );
};

export default AnalyticDropdown;
