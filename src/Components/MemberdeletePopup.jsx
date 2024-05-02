import React, { useContext, useState } from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';
import { ref, remove } from 'firebase/database'; 
import { db } from './firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
const MemberdeletePopup = ({ isOpen, handleClose,userid,filteredUsers,setFilteredUsers,updateLinks }) => {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);  
  console.log(userid)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(isOpen);
 
  const handleDeleteConfirm = () => {
    if (userid) {
      remove(ref(db, `contacts/${userid}`)) 
        .then(() => {
          toast.success(t("Contact deleted successfully"));
          updateLinks();
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
          toast.warn("Error deleting contact");
        });
    }
    setDeleteDialogOpen(false);
    handleClose(); // Call the handleClose prop to close the dialog in the parent component
  };

  const handleDeleteCancel = () => {
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
      <img src="/images/Remove user.png" style={{height:'60px',width:'60px'}} /></p>
        
        <Typography variant="body2" sx={{ fontFamily: 'Inter',marginTop:'10px',textAlign:'center',width:'270px',display:"flex",alignItems:"center",justifyContent:"center" }}>
        {t("Are you sure you want to delete member?")}
        </Typography>
        <Box mt={2} display="flex" justifyContent="center">
          <Button onClick={handleDeleteCancel}  sx={{ fontFamily: 'Inter',color:'white',background:'linear-gradient(180deg, #00EFFF 0%, #00AEFF 100%)',borderRadius:'20px',width:'120px',height:'42px' }}>
            {t("Cancel")}
          </Button>{'\u00A0'}
          <Button onClick={handleDeleteConfirm}  sx={{ fontFamily: 'Inter',color:'White',background:'rgba(54, 54, 54, 1)',borderRadius:'20px',width:'120px',height:'42px', '&:hover': {
            background: 'rgba(54, 54, 54, 1)'}, }}>
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

export default MemberdeletePopup;
