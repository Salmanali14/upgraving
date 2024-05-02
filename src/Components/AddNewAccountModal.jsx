import React, { useContext, useState } from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';
import { db } from './firebaseConfig';
import { ref, update,push } from 'firebase/database';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNewAccountModal = ({ isOpen, handleClose }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);  
  const handleYes = async () => {
     
    const currentUserUid = localStorage.getItem("useruid");
    const parentId = localStorage.getItem("parentid");
    try {
      const newUserRef = push(ref(db, 'user')); 
      const newUserKey = newUserRef.key; 
      
      await update(ref(db, `user/${newUserKey}`), { 
        fullname: '',
        userName: "",
        id: newUserKey,
        parentId: parentId, 
        email: "",
        location: '',
        jobtitle: '',
        company: '',
        bio: '',
        profileImage: '',
        logoImage: '',
        coverImage: '',
        colors: '',
        links: '',
        leadmode:'',
        directmode:'',
        language:'',
        phone:'',
        darkmode:'',
        profilelockmode:'',
        theme:'',
      });

      toast.success(t("User created successfully"));
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  
    handleClose();
    setModalOpen(false);
  };


  const handleNo = () => {
    handleClose();
    setModalOpen(false);
  };
  var widthiner= window.innerWidth
  return (
    <>
    <Modal open={isModalOpen} onClose={handleNo}>
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
        outline:'none'
      }}
    >
    <p style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
    <img width="60" height="60" src="https://img.icons8.com/bubbles/100/test-account.png" alt="test-account"/></p>
      
      <Typography variant="body2" sx={{ fontFamily: 'Inter',margin:'10px',textAlign:'center',width:'270px' }}>
      {t("Are you sure want create new account?")}
      </Typography>
      <Box mt={2} display="flex" justifyContent="center">
      <Button onClick={handleNo}  sx={{ fontFamily: 'Inter',color:'black',background: "#77cbd2",borderRadius:'20px',width:'100px',height:'35px', "&:hover": {
        background: "#0079bf", // Change color on hover
      }, }}>
      {t("No")}
      </Button>{'\u00A0'}
        <Button onClick={handleYes}  sx={{ fontFamily: 'Inter',color:'black',background: "#f9dbd2",borderRadius:'20px',width:'100px',height:'35px', "&:hover": {
          background: "#0079bf", // Change color on hover
        }, }}>
        {t("Yes")}
        </Button>
       
      </Box>
    </Box>
  </Modal>

  </>
  );
};

export default AddNewAccountModal;
