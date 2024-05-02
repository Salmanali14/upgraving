import React, { useContext, useState } from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';
import { ref, remove } from 'firebase/database'; 
import { db } from './firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
const GroupdeletePopup = ({ isOpen, handleClose ,userid,filteredUsers,setFilteredUsers}) => {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);  
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(isOpen);
  console.log(filteredUsers)
  let updateLinks = () => {
    if (filteredUsers?.length === 1) {
      setFilteredUsers([]);
    }
  }; 
  const handleDeleteConfirm = () => {
    if (userid) {
      remove(ref(db, `groups/${userid}`)) 
        .then(() => {
          updateLinks();
          toast.success(t("group deleted successfully"))
        
         
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
          toast.warn(t("Error deleting contact"));
        });
    }
    setDeleteDialogOpen(false);
    handleClose(); // Call the handleClose prop to close the dialog in the parent component
  };


  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    handleClose(); 
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
      <img src="images/Folder.png" style={{height:'60px',width:'60px'}} /></p>
        
        <Typography variant="body2" sx={{ fontFamily: 'Inter',margin:'10px',textAlign:'center',}}>
        {t("Are you sure you want to Delete Group?")}
        </Typography>
        <Box mt={2} display="flex" justifyContent="center">
          <Button onClick={handleDeleteCancel}  sx={{ fontFamily: 'Inter',color:'white',background:'linear-gradient(to bottom, rgba(251, 211, 7, 1), rgba(252, 226, 92, 1))',borderRadius:'20px',width:'120px',height:'42px' }}>
            {t("Cancel")}
          </Button>{'\u00A0'}
          <Button onClick={handleDeleteConfirm}  sx={{ fontFamily: 'Inter',color:'Black',background:'rgba(221, 221, 221, 1)',borderRadius:'20px',width:'120px',height:'42px', '&:hover': {
            background: 'rgba(221, 221, 221, 1)'}, }}>
            {t("Confirm")}
          </Button>
        </Box>
      </Box>
    </Modal>
    <ToastContainer
    position="top-center"
    reverseOrder={false}
  />
    </>
  );
};

export default GroupdeletePopup;
