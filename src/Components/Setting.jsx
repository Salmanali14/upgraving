import React, { useState } from 'react';
import { Modal, Box, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Login.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
const Setting = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUsernameModalOpen, setUsernameModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

    const handleDropdownToggle = () => {
    // Delay opening the dropdown by 0.9 seconds
    setTimeout(() => {
      setIsDropdownOpen(!isDropdownOpen);
    }, 50);
  };
  const handleUsernameModalOpen = () => {
    setUsernameModalOpen(true);
  };

  const handleUsernameModalClose = () => {
    setUsernameModalOpen(false);
  };

  const handlePasswordModalOpen = () => {
    setPasswordModalOpen(true);
  };

  const handlePasswordModalClose = () => {
    setPasswordModalOpen(false);
  };

  return (
    <div className='setting-main'>
    <h1>Settings</h1>
      <div className="dropdown" onClick={handleDropdownToggle}>
      <div className='setting-f-fiv'>
      <img width="25" height="25" src="https://img.icons8.com/fluency-systems-regular/96/gear--v1.png" alt="gear--v1"/>
      <h4>Account & Security Settings</h4>
      <img width="15" height="15" src="https://img.icons8.com/ios-glyphs/96/expand-arrow.png" alt="expand-arrow"/></div>
        {isDropdownOpen && (
          <div className="dropdown-content">
           <div className='account-mail'>
           <div className='account-in'>
           <div className='img-bg-set'>
           <img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/96/mail-account--v1.png" alt="mail-account--v1"/>
           </div>
           <h6>Account Email</h6>
           </div>
           <h5>a@bc.com</h5>
           </div>
           <div className='account-mail'>
           <div className='account-in'>
           <div className='img-bg-set'>
           <img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/96/user-tag.png" alt="user-tag"/>
           </div>
           <h6>Profile Link</h6>
           </div>
           <h5 id='link-set'>https://ptofileupcard..</h5><span><img width="20" height="20" id='img-copy-set'  src='images/Copy.png'></img></span>
           </div>
           <div className='account-mail'  onClick={handleUsernameModalOpen}>
           <div className='account-in'>
           <div className='img-bg-set'>
           <img width="20" height="20" src="https://img.icons8.com/windows/96/user-male-circle.png" alt="user-male-circle"/>
           </div>
           <h6>Change Username</h6>
           </div>
           <img width="20" height="20" id='next-set' src="https://img.icons8.com/ios-glyphs/96/forward.png" alt="forward"/>
           </div>
           <div className='account-mail' onClick={handlePasswordModalOpen}>
           <div className='account-in'>
           <div className='img-bg-set'>
           <img width="20" height="20" src="https://img.icons8.com/windows/96/change-user-male--v1.png" alt="change-user-male--v1"/>
           </div>
           <h6>Change Password</h6>
           </div>
           <img width="20" height="20" id='next-set' src="https://img.icons8.com/ios-glyphs/96/forward.png" alt="forward"/>
           </div>
           <div className='account-mail'>
           <div className='account-in'>
           <div className='img-bg-set'>
           <img width="15" height="15" src="https://img.icons8.com/fluency-systems-regular/96/language-skill.png" alt="language-skill"/>
           </div>
           <h6>Change Language</h6>
           </div>
           <img width="20" height="20" id='next-set' src="https://img.icons8.com/ios-glyphs/96/forward.png" alt="forward"/>
           </div>
           <div className='account-mail'>
           <div className='account-in'>
           <div className='img-bg-set'>
           <img width="20" height="20" src="https://img.icons8.com/dotty/96/filled-trash.png" alt="filled-trash"/>
           </div>
           <h6>Delete Account</h6>
           </div>
           <img width="20" height="20" id='next-set' src="https://img.icons8.com/ios-glyphs/96/forward.png" alt="forward"/>
           </div>
          </div>
        )}
      </div>
      <div className={`other-div ${isDropdownOpen ? 'expanded' : ''}`}>
      <div className='setting-f-fiv'>
      <img width="20" height="20" src="https://img.icons8.com/ios/96/laptop-play-video--v1.png" alt="laptop-play-video--v1"/>
      <h4>How to activate your profile</h4>
      <img width="15" height="15" id='next-set' style={{marginRight:'0px'}} src="https://img.icons8.com/ios-glyphs/96/forward.png" alt="forward"/>
      </div>
      </div>
      <div className={`other-div ${isDropdownOpen ? 'expanded' : ''}`}>
      <div className='setting-f-fiv'>
      <img width="20" height="20" src="https://img.icons8.com/ios/96/shopping-cart--v1.png" alt="shopping-cart--v1"/>
      <h4 id='shopsign'>Shop Now</h4>
      <img width="15" height="15" id='next-set' style={{marginRight:'0px'}} src="https://img.icons8.com/ios-glyphs/96/forward.png" alt="forward"/>
      </div>
      </div>
      <div className={`other-div ${isDropdownOpen ? 'expanded' : ''}`}>
      <Link to='/'><div className='setting-f-fiv'>
      <img width="20" height="20" src="https://img.icons8.com/metro/96/exit.png" alt="exit"/>
      <h4 id='shopsign1'>Sign Out</h4>
      <img width="15" height="15" id='next-set' style={{marginRight:'0px'}} src="https://img.icons8.com/ios-glyphs/96/forward.png" alt="forward"/>
      </div></Link>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
      {/* Modal for Change Username */}
      <Modal
        open={isUsernameModalOpen}
        onClose={handleUsernameModalClose}
        aria-labelledby="change-username-modal-title"
        aria-describedby="change-username-modal-description"
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
            maxHeight: "90vh",
            overflowY: "auto",
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleUsernameModalClose}
            sx={{
              position: 'absolute',
              top: 10,
              left: 24,
              width: '24px',
              height: '24px',
              background: '#ECECEC',
            }}
          >
            <CloseIcon />
          </IconButton>
         <div className='change-username-popup'>
         <h2>Change Username</h2>
         <div className='current-username'>
         <h3>Current Username</h3>
         <p>Arminerenmikasa@</p>
         </div>
         <div className='new-username'>
         <h4>New Username</h4>
         <input type='text' name='Username' placeholder='Enter New Username'/>
         </div>
         <Button>Update</Button>
         </div>
          <br></br>
        </Box>
      </Modal>
        {/* Modal for Change Password */}
        <Modal
        open={isPasswordModalOpen}
        onClose={handlePasswordModalClose}
        aria-labelledby="change-password-modal-title"
        aria-describedby="change-password-modal-description"
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
            maxHeight: "90vh",
            overflowY: "auto",
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handlePasswordModalClose}
            sx={{
              position: 'absolute',
              top: 10,
              left: 24,
              width: '24px',
              height: '24px',
              background: '#ECECEC',
            }}
          >
            <CloseIcon />
          </IconButton>
          <div className='change-username-popup'>
          <h2>Change Password</h2>
          <div className='new-username'>
          <h4 id='curent-pass'>Current Password</h4>
          <input type='text' name='Username' placeholder='Enter New Username'/>
          </div>
          <div className='new-username'>
          <h4>New Password</h4>
          <input type='text' name='Username' placeholder='Enter New Username'/>
          </div>
          <Button>Update</Button>
          </div>
          <br></br>
        </Box>
      </Modal>
      <Footer/>
    </div>
  );
};

export default Setting;
