import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import MemberdeletePopup from './MemberdeletePopup'; // Import the MemberdeletePopup component

const GroupMoreDropdwon = ({ anchorEl23, handleCloseMenu }) => {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // State to control the visibility of the delete popup

  const handleDeleteMenuItemClick = () => {
    setIsDeletePopupOpen(true); // Open the delete popup when "Remove" menu item is clicked
    handleCloseMenu(); // Close the menu
  };
  const menuStyle = {
    borderRadius: '8px',
   width:'90px',
  
  };

  const menuItemStyle = {
    fontSize: '11px',
    color: '#333',
   
    display:'flex',
    justifyContent:'center',
    alignItem:'center',
  };
  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl23}
        open={Boolean(anchorEl23)}
        onClose={handleCloseMenu}
        style={menuStyle}
      >
        <MenuItem onClick={handleDeleteMenuItemClick} style={menuItemStyle}>Remove</MenuItem>
        <MenuItem onClick={handleCloseMenu} style={menuItemStyle}>Report</MenuItem>
      </Menu>
      {isDeletePopupOpen && (
      <MemberdeletePopup isOpen={isDeletePopupOpen} handleClose={() => setIsDeletePopupOpen(false)} /> 
      )}
    </>
  );
};

export default GroupMoreDropdwon;
