import React, { useState } from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';

const DeleteUser = ({ isOpen, handleClose }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(isOpen);

  const handleDeleteConfirm = () => {
    // Perform the delete operation here
    setDeleteDialogOpen(false);
    handleClose(); // Call the handleClose prop to close the dialog in the parent component
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    handleClose(); // Call the handleClose prop to close the dialog in the parent component
  };

  return (
    <Modal open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
      <Box
        sx={{
          position: 'absolute',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontFamily: 'Inter' }}>
          Delete User
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'Inter' }}>
          Are you sure you want to delete this user?
        </Typography>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleDeleteCancel} color="primary" sx={{ fontFamily: 'Inter' }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" sx={{ fontFamily: 'Inter' }}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteUser;
