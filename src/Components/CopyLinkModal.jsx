import React, { useEffect } from 'react';
import { Modal, Box } from '@mui/material';

const CopyLinkModal = ({ isOpen, handleClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        handleClose();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, handleClose]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="copy-link-modal-title"
      aria-describedby="copy-link-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 340,
          bgcolor: 'white',
          borderRadius: '21px',
          background: '#FFF',
          outline: 'none',
          boxShadow: 24,
          height: '65px',
          overflowY: 'auto',
        }}
      >
        <div className='copy-link-content'>
          <img src='images/Paste.png' alt="paste" />
          <p>Profile link is copied</p>
          <img width="48" height="48" src="https://img.icons8.com/color/96/double-tick.png" alt="double-tick" />
        </div>
      </Box>
    </Modal>
  );
};

export { CopyLinkModal as default };
