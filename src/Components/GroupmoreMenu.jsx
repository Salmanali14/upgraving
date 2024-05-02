import React, { useContext, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import GroupdeletePopup from './GroupdeletePopup';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';

const GroupmoreMenu = ({ anchorEl23, handleCloseMenu,userid,filteredUsers,setFilteredUsers }) => {
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
        anchorEl={anchorEl23}
        open={Boolean(anchorEl23)}
        onClose={handleCloseMenu}
        style={menuStyle}
      >
        <MenuItem onClick={handleDeleteMenuItemClick} style={menuItemStyle}>{t("Remove")}</MenuItem>
        <MenuItem onClick={handleCloseMenu} style={menuItemStyle}>{t("Report")}</MenuItem>
      </Menu>
      {isDeletePopupOpen && (
      <GroupdeletePopup isOpen={isDeletePopupOpen} handleClose={() => setIsDeletePopupOpen(false)} userid={userid} filteredUsers={filteredUsers} setFilteredUsers={setFilteredUsers}  /> 
      )}
    </>
  );
};

export default GroupmoreMenu;
