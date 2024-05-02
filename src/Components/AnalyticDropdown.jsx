import React, { useContext } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
const AnalyticDropdown = ({ anchorEl2, handleCloseMenu, handleSelectOption }) => {
    const { t } = useTranslation();
    const { language } = useContext(LanguageContext);   
    const menuStyle = {
        borderRadius: '8px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    };
    
    const menuItemStyle = {
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
            <MenuItem onClick={() => handleSelectOption('Daily')} style={menuItemStyle}>{t("Daily")}</MenuItem>
            <MenuItem onClick={() => handleSelectOption('Weekly')} style={menuItemStyle}>{t("Weekly")}</MenuItem>
            <MenuItem onClick={() => handleSelectOption('Monthly')} style={menuItemStyle}>{t("Monthly")}</MenuItem>
        </Menu>
    );
};

export default AnalyticDropdown;
