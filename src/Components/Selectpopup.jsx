
import React, { useState } from 'react';
import { Modal, Box,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Login.css'

export default function Modalpopup({open1,handleClose1}) {
  const modalBody = (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 380,
        height:"90%",
        bgcolor: "white",
        borderRadius: "37px",
        background: "#FFF",
        outline: "none",
        // overflow: 'auto',
        // border: '2px solid #000',
        boxShadow: 24,
        maxHeight: '90vh', 
        overflowY: 'auto',
      }}
    >
   <div> hello</div>
      <IconButton
        aria-label="close"
        onClick={handleClose1}
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );

  return (

      
      <Modal1
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalBody}
      </Modal1>

  );
}
