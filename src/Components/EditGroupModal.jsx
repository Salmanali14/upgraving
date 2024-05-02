import React, { useState,useEffect, useContext } from 'react';
import { Modal, Box, IconButton, TextField, Button } from '@mui/material';
import { onValue, ref, update } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { db } from './firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
const EditGroupModal = ({ isEditModalOpen, handleCloseEdit,setIsEditModalOpen }) => {
    const screenWidth = window.innerWidth;
    const currentUser = localStorage.getItem("useruid");
    const {id} = useParams();
    const { t } = useTranslation();
const { language } = useContext(LanguageContext);    
    
    const [ourInfo,setOurInfo] =useState({fullname: ''});
    const getSingleChild = () => {
      const starCountRef = ref(db, `groups/${id}`)
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        console.log(data);
        console.log("testing data");
        setOurInfo({fullname:data.fullname})
      
        // setmylist(Object.values(data));
        // setfiltered(Object.values(data));
        // updateStarCount(postElement, data);
      });
    };
    useEffect(() => {
      getSingleChild()
     
    }, []);
    const handleClose =()=>{
      setIsEditModalOpen(false);
    }
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      setIsEditModalOpen(false);
      try {
        update(ref(db, `groups/${id}`), {
          ...ourInfo,
        }).then(() => {
          // Handle success
          toast.success('Change Group Name successfully!');
        }).catch((error) => {
          console.error('Error updating user data:', error);
          toast.error('Failed to update data!');
        });
      } catch (error) {
        console.error('Error handling form submission:', error);
        toast.error('Failed to handle form submission!');
      }
    };
    
    return (
      <>
    <Modal
      open={isEditModalOpen}
      onClose={handleCloseEdit}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: screenWidth >= 450 ? '340px' : '80%',
          bgcolor: 'white',
          borderRadius: '21px',
          background: '#FFF',
          outline: 'none',
          boxShadow: 24,
          padding: '20px',
       
        }}
      >
     
      <label htmlFor="singlegroup" style={{ marginBottom: '0.5rem', display: 'block', fontFamily:'inter',fontWeight:'600' }}>{t("Change Group Name")}</label>
      <input
      type="text"
      value={ourInfo.fullname}
      onChange={(e) => setOurInfo({ ...ourInfo, fullname: e.target.value })}
      style={{ marginBottom: '1rem', width: '90%', padding: '8px', border: '1px solid ', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
    />
    <Button  onClick={handleClose} sx={{ background:'black',color:'white',borderRadius:'10px',fontSize:'12px',fontFamily:'inter',height:'30px',width:'80px', '&:hover': {
      backgroundColor: 'black', 
      color: 'white', 
    }, }}>{t("Cancel")}</Button>{'\u00A0'}
        <Button  onClick={handleFormSubmit} sx={{ background:'black',color:'white',borderRadius:'10px',fontSize:'12px',fontFamily:'inter',height:'30px',width:'80px', '&:hover': {
            backgroundColor: 'black', 
            color: 'white', 
          }, }}>{t("Save")}</Button>
      
      </Box>
    </Modal>
 
    </>
  );
};

export default EditGroupModal;
