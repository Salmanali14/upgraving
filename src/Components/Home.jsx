import React, { useState } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import './Login.css';
import Footer from './Footer';
import DeleteUser from './DeleteUser';


const Home = () => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isCopyLinkModalOpen, setCopyLinkModalOpen] = useState(false);
  const [isSwitchModalOpen, setSwitchModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); 

  const handleDeleteButtonClick = () => {
    setDeleteModalOpen(true);
  };
  const handleShareButtonClick = () => {
    setShareModalOpen(true);
  };

  const handleCopyLinkButtonClick = () => {
    setShareModalOpen(false);
    setCopyLinkModalOpen(true);
  };

  const handleSwitchButtonClick = () => {
    setSwitchModalOpen(true);
  };

  const handleModalsClose = () => {
    setShareModalOpen(false);
    setCopyLinkModalOpen(false);
    setSwitchModalOpen(false);
  };

  const profiles = [
    {
      name: 'Drake Adwin',
      role: 'Project Manager',
      description: 'Lorem ipsum dolor sit amet consectetur. Aliquet nunc augue praesent lectus sodales.',
    },
  ];

  const links = [
    { imgSrc: 'https://img.icons8.com/fluency-systems-filled/96/FFFFFF/phone-disconnected.png', altText: 'phone-disconnected', text: 'Call' },
    { imgSrc: 'https://img.icons8.com/material-rounded/96/FFFFFF/user.png', altText: 'user', text: 'Contact' },
    { imgSrc: 'https://img.icons8.com/material-rounded/96/FFFFFF/facebook-f--v1.png', altText: 'facebook-f', text: 'Facebook' },
    { imgSrc: 'https://img.icons8.com/windows/96/FFFFFF/telegram-app.png', altText: 'telegram-app', text: 'Telegram' },
    { imgSrc: 'https://img.icons8.com/material-rounded/96/FFFFFF/new-post.png', altText: 'new-post', text: 'Email' },
    { imgSrc: 'https://img.icons8.com/sf-regular/96/FFFFFF/messaging-.png', altText: 'messaging-', text: 'Chat' },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/FFFFFF/facebook-messenger.png', altText: 'facebook-messenger', text: 'Messenger' },
    { imgSrc: 'https://img.icons8.com/ios/96/FFFFFF/dining-room.png', altText: 'dining-room', text: 'Menu' },
    { imgSrc: 'https://img.icons8.com/ios-filled/98/FFFFFF/whatsapp--v1.png', altText: 'whatsapp--v1', text: 'WhatsApp' },
    { imgSrc: 'https://img.icons8.com/ios-glyphs/96/FFFFFF/discord-logo.png', altText: 'discord-logo', text: 'Discord' },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/FFFFFF/gmail-new.png', altText: 'gmail-new', text: 'Gmail' },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/FFFFFF/cash-app.png', altText: 'cash-app', text: 'Cash App' },
  ];
  const defaultpro = [
    {
      id: 1,
      name: 'Drake Adwin',
            imgSrc: 'images/Ellipse 97.png',
      username: 'drake123',
    },
    {
      id: 2,
      name: 'Monica Jhon',
      imgSrc: 'images/Ellipse 97 (1).png',
      username: 'monicajhon123',
    },
    {
      id: 3,
      name: 'Abhamco Muut',
      imgSrc: 'images/Ellipse 97 (2).png',
      username: 'drake123',
    },
    {
      id: 4,
      name: 'Alisha Albirth',
      imgSrc: 'images/Ellipse 97 (3).png',
      username: 'drake123',
    },
    {
      id: 5,
      name: 'Mike Jackson',
      imgSrc: 'images/Ellipse 97 (4).png',
      username: 'drake123',
    },
  ];

  return (
    <>
      <div className='home'>
        <h1 id='home-maid-hed'>Home</h1>
        <div className='coverimg'>
          <img className='cover' src='images/Rectangle 1.png' alt='coverimg' />
          <img className='profile13' src='images/Ellipse 1.png' alt='proffileimg' />
          <img className='icon' src='images/Ellipse 2.png' alt='iconimg' /><img className='icon4' src='images/Photo camera.png' alt='coverimg' />
        </div>
        <div className='profiletext'>
          {profiles.map((profile, index) => (
            <div key={`profile-${index}`} className='username'>
              <h2>{profile.name}</h2>
              <h4>{profile.role}</h4>
              <p>{profile.description}</p>
            </div>
          ))}
        </div>
        <div className='profileedit'>
          <div className='prev'>
            <Link id='editmain-o' to="/prevprofile">
              <img src="https://img.icons8.com/pulsar-line/96/vision.png" alt="vision" />
              <p>Preview</p>
            </Link>
          </div>
          <div className='edit'>
            <Link id='editmain-1' to="/editprofile">
              <img src="https://img.icons8.com/sf-regular/96/create-new.png" alt="create-new" />
              <p>Edit Profile</p>
            </Link>
          </div>
          <div className='prev'>
          <img onClick={handleShareButtonClick} src="https://img.icons8.com/fluency-systems-regular/96/share--v1.png" alt="share--v1"/>
            <p>Share</p>
          </div>
          <div className='edit' onClick={handleSwitchButtonClick}>
          
            <img className='editimg' src="https://img.icons8.com/windows/96/business.png" alt="business" />
            <p id='editp' onClick={handleSwitchButtonClick}>Switch to Personal</p>
            
          </div>
        </div>

        <div className="heading-container">
          <div className="line"></div>
          <h1 className="centered-heading">Link</h1>
          <div className="line"></div>
        </div>

        <div className='mode'>
          <span> <img width="24" height="24" src="https://img.icons8.com/material-outlined/96/info--v1.png" alt="info--v1" /><span id='lead-mod'>Lead Mode</span></span>
          <label className="toggle">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
          <span> <img width="24" height="24" src="https://img.icons8.com/material-outlined/96/info--v1.png" alt="info--v1" /><span id='lead-mod'>Direct Mode</span></span>
          <label className="toggle">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
        <div className='addlink'>
          {links.map((link, index) => (
            <div key={`link-${index}`} className='textlink'>
              <div className='link'>
                <img src={link.imgSrc} alt={link.altText} />
              </div>
              <p>{link.text}</p>
            </div>
          ))}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>

      {/* Share Modal */}
      <Modal
        open={isShareModalOpen}
        onClose={handleModalsClose}
        aria-labelledby="share-modal-title"
        aria-describedby="share-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 340,
            bgcolor: 'white',
            borderRadius: '37px',
            background: '#FFF',
            outline: 'none',
            boxShadow: 24,
            Height: 'max-content',
            overflowY: 'auto',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleModalsClose}
            sx={{
              position: 'absolute',
              top: '17px',
              left: '18px',
              width: '24px',
           height: '24px',
          background: '#ECECEC',
            }}
          >
            <CloseIcon />
          </IconButton>
          <div className='share-profile'>
            <h1>Share Profile</h1>
            <p>Scan this code with any camera to share your profile.</p>
            <div className='share-profile-border'>
              <img src='images/Group 73.png' alt='share-profile-img' />
            </div>
            <div className='copy-link-icon'>
              <button onClick={handleCopyLinkButtonClick}>Copy Link</button> <img width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/96/FFFFFF/copy--v1.png" alt="copy--v1" />
            </div>
          </div>
        </Box>
      </Modal>

      {/* Copy Link Modal */}
      <Modal
        open={isCopyLinkModalOpen}
        onClose={handleModalsClose}
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
          <IconButton
            aria-label="close"
            onClick={handleModalsClose}
            sx={{
              position: 'absolute',
              top: 20,
              left: 8,
              width: '24px',
           height: '24px',
          background: '#ECECEC',
            }}
          >
            <CloseIcon />
          </IconButton>
          <div className='copy-link-content'>
           <img src='images/Paste.png'/>
           <p>Link Copied!</p>
           <img width="48" height="48" src="https://img.icons8.com/color/96/double-tick.png" alt="double-tick"/>
          </div>
        </Box>
      </Modal>

      {/* Switch Modal */}
      <Modal
        open={isSwitchModalOpen}
        onClose={handleModalsClose}
        aria-labelledby="switch-modal-title"
        aria-describedby="switch-modal-description"
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
            onClick={handleModalsClose}
            sx={{
              position: 'absolute',
              top: 13,
              left: 15,
              width: '24px',
           height: '24px',
          background: '#ECECEC',
         
            }}
          >
            <CloseIcon />
            
          </IconButton>
          <div className='switch-modal-content'>
          <h1 className='select-profile-text'>Select Profile</h1>
          <div className='exist-profile'>
            <img src='images/Ellipse 97.png'/>
            <div className='exsit-profile-data'>
            <p id='you-exsit-profile'>You</p>
            <h1>Drake Adwin</h1>
            <p>Username: frank98022</p>
            </div>
            </div>
            <div className='addnew-profile-account'>
            <img width="30" height="30" src="https://img.icons8.com/ios/96/plus-math--v1.png" alt="plus-math--v1"/>
            <p>Create new account</p>
            </div>
            {defaultpro.map((profile) => (
              <div key={profile.id} className='default-profile'>
                <img src={profile.imgSrc} alt={`profile-${profile.id}`} />
                <div className='default-profile-hedding'>
                  <h1>{profile.name}</h1>
                  <p>Username: {profile.username}</p>
                </div>
                <div className='more-btn' onClick={handleDeleteButtonClick} >
                <p style={{ margin: '0px' }} >
                Delete
              </p>
                </div>
              </div>
              
            ))}
          </div>
          

            <br></br>
        </Box>
      </Modal>
      {isDeleteModalOpen && (
        <DeleteUser isOpen={isDeleteModalOpen} handleClose={() => setDeleteModalOpen(false)} />
      )}
      
      <Footer />
    </>
  );
};

export default Home;
