import React, { useContext, useState } from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';
import { deleteUser } from 'firebase/auth';
import { auth } from './firebaseConfig';
import {useNavigate } from 'react-router-dom';

import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
const DeleteUser = ({ isOpen, handleClose }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(isOpen);
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);   
  const currentUser = localStorage.getItem("useruid");
  const history = useNavigate();
  const handleDeleteConfirm = () => {
    // Perform the delete operation here
    setDeleteDialogOpen(false);
    handleClose(); // Call the handleClose prop to close the dialog in the parent component
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    handleClose();
     // Call the handleClose prop to close the dialog in the parent component
  };
  const handleDeleteAccount = () => {
   
    deleteUser(auth.currentUser)
      .then(() => {
        // Account deleted successfully
        // You may redirect the user to a different page or perform any other action
        toast.success("Account deleted successfully");
        setTimeout(() => {
          history("/login2");
        }, 2000);
      })
      .catch((error) => {
        // An error occurred while deleting the account
        console.error("Error deleting account:", error);
      });
      
  };
 var widthiner= window.innerWidth
  return (
  <>
    <Modal open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
      <Box
        sx={{
          position: 'absolute',
          width:  widthiner>=450? '300px' : '70%',
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
      <img src="images/Delete.png" style={{height:'60px',width:'60px'}} /></p>
        
        <Typography variant="body2" sx={{ fontFamily: 'Inter',margin:'10px',textAlign:'center', }}>
        {t("Are you sure you want to delete your account permanently?")}
        </Typography>
        <Box mt={2} display="flex" justifyContent="center">
          <Button onClick={handleDeleteCancel}  sx={{ fontFamily: 'Inter',color:'white',background: 'linear-gradient(to bottom, rgba(255, 67, 91, 1), rgba(255, 123, 74, 1), rgba(255, 123, 74, 1))',borderRadius:'20px',width:'120px',height:'42px' }}>
            {t("Cancel")}
          </Button>{'\u00A0'}
          <Button onClick={handleDeleteAccount}  sx={{ fontFamily: 'Inter',color:'black',background: 'rgba(221, 221, 221, 1)',borderRadius:'20px',width:'120px',height:'42px', '&:hover': {
            background: 'rgba(221, 221, 221, 1)',
          }, }}>
            {t("Confirm")}
          </Button>
        </Box>
      </Box>
    </Modal>
   
    </>
  );
};

export default DeleteUser;
