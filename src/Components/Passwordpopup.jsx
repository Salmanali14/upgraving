import React, { useContext, useState } from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
const Passwordpopup = ({ isOpen, handleClose }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(isOpen);
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);  
  const handleDeleteConfirm = () => {
    // Perform the delete operation here
    setDeleteDialogOpen(false);
    handleClose(); // Call the handleClose prop to close the dialog in the parent component
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    handleClose(); // Call the handleClose prop to close the dialog in the parent component
  };
 var widthiner= window.innerWidth
  return (
    <Modal open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
      <Box
        sx={{
          position: 'absolute',
          width:  widthiner>=450? '380' : '70%',
          bgcolor: 'background.paper',
          borderRadius:'50px',
          boxShadow: 24,
          p: 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
      <p style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <img src="images/Password.png" style={{height:'60px',width:'60px'}} /></p>
        
        <Typography variant="body2" sx={{ fontFamily: 'Inter',margin:'10px',textAlign:'center' }}>
        {t("Password Changed Successfully!")}
        </Typography>
        <Box mt={2} display="flex" justifyContent="center">
          <Button onClick={handleDeleteCancel}  sx={{ fontFamily: 'Inter',color:'white',background: 'linear-gradient(to bottom, rgba(244, 221, 69, 1), rgba(236, 195, 46, 1))',borderRadius:'20px',width:'120px',height:'42px' }}>
            {t("Ok")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Passwordpopup;
