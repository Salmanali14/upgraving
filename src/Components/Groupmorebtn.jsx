import React, { useContext, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import MemberdeletePopup from './MemberdeletePopup'; // Import the MemberdeletePopup component
import RemovememberGroup from './RemovememberGroup';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
const Groupmorebtn = ({ anchorEl2, handleCloseMenu,userid ,filteredUsers,setFilteredUsers,updateLinks}) => {
 
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // State to control the visibility of the delete popup
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext); 
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
        anchorEl={anchorEl2}
        open={Boolean(anchorEl2)}
        onClose={handleCloseMenu}
        style={menuStyle}
      >
        <MenuItem onClick={handleDeleteMenuItemClick} style={menuItemStyle}>{t("Remove")}</MenuItem>
        <MenuItem onClick={handleCloseMenu} style={menuItemStyle}>{t("Report")}</MenuItem>
      </Menu>
      {isDeletePopupOpen && (
      <RemovememberGroup isOpen={isDeletePopupOpen} handleClose={() => setIsDeletePopupOpen(false)} userid={userid} filteredUsers={filteredUsers} setFilteredUser={setFilteredUsers} updateLinks={updateLinks}/> 
      )}
    </>
  );
};

export default Groupmorebtn;
