import React, { useContext, useState } from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';
import { deleteUser } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import {useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { equalTo, orderByChild, query, ref, remove } from 'firebase/database';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';

const DefaultAccountDelete = ({ isOpen, handleClose,deleteId,updateLinks}) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(isOpen);
  const currentUser = localStorage.getItem("useruid");
  const { t } = useTranslation();
const { language } = useContext(LanguageContext);   

  console.log(deleteId)
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

  const parentidUser = localStorage.getItem("parentid");
  const handleDelete = () => {
    if (deleteId) {
      remove(ref(db,`user/${deleteId}` )) 
        .then(() => {
          toast.success(t("Contact deleted successfully"));
          updateLinks();
          if(deleteId===currentUser){
            localStorage.setItem("useruid",parentidUser);
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
          toast.warn("Error deleting contact");
        });
    }
    setDeleteDialogOpen(false);
    handleClose(); // Call the handleClose prop to close the dialog in the parent component
  };

 var widthiner= window.innerWidth
  return (
  <>
    <Modal open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
      <Box
        sx={{
          position: 'absolute',
          width:  widthiner>=430? '300px' : '70%',
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
          <Button onClick={handleDelete}  sx={{ fontFamily: 'Inter',color:'black',background: 'rgba(221, 221, 221, 1)',borderRadius:'20px',width:'120px',height:'42px', '&:hover': {
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

export default DefaultAccountDelete;
