import React, { useContext, useState } from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
const Logoutpopup = ({ isOpen, handleClose }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(isOpen);
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);  
  const changeScreenColor = (className, color) => {
    const element = document.querySelector(`.${className}`);
    if (element) {
      element.style.backgroundColor = color;
    }
  };

  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    localStorage.removeItem("useruid");
    localStorage.removeItem("parentid");
    handleClose();
    changeScreenColor('screen', 'white'); // Change screen color to white
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    handleClose();
  };

  var widthiner = window.innerWidth;

  return (
    <Modal open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
      <Box
        sx={{
          position: 'absolute',
          width: widthiner >= 450 ? '380' : '70%',
          bgcolor: 'background.paper',
          borderRadius: '50px',
          boxShadow: 24,
          p: 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="images/Power button.png" style={{ height: '60px', width: '60px' }} />
        </p>

        <Typography variant="body2" sx={{ fontFamily: 'Inter', margin: '10px', textAlign: 'center' }}>
          {t("Are you sure you want to Logout?")}
        </Typography>
        <Box mt={2} display="flex" justifyContent="center">
          <Button onClick={handleDeleteCancel} sx={{ fontFamily: 'Inter', color: 'white', background: 'linear-gradient(to bottom, rgba(255, 67, 91, 1), rgba(255, 123, 74, 1), rgba(255, 123, 74, 1))', borderRadius: '20px', width: '120px', height: '42px' }}>
            {t("Cancel")}
          </Button>{'\u00A0'}
          <Link to='/login2'>
            <Button onClick={handleDeleteConfirm} sx={{ fontFamily: 'Inter', color: 'black', background: 'rgba(221, 221, 221, 1)', borderRadius: '20px', width: '120px', height: '42px', '&:hover': { background: 'rgba(221, 221, 221, 1)', }, }}>
              {t("Confirm")}
            </Button>
          </Link>
        </Box>
      </Box>
    </Modal>
  );
};

export default Logoutpopup;
