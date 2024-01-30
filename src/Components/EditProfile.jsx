import React, { useState } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import './Login.css';
import Footer from './Footer';
import DarkModeToggle from './Darkmodetoggle';


export default function EditProfile() {
  const [isAddLinkModalOpen, setAddLinkModalOpen] = useState(false);
  const [isLinkMediaModalOpen, setLinkMediaModalOpen] = useState(false);

  const handleAddLinkButtonClick = () => {
    setAddLinkModalOpen(true);
  };

  const handleAddLinkModalClose = () => {
    setAddLinkModalOpen(false);
  };
  const handleLinkMediaModalOpen = () => {
    setLinkMediaModalOpen(true);
    setAddLinkModalOpen(false); 
  };

  const handleLinkMediaModalClose = () => {
    setLinkMediaModalOpen(false);
  };
 
  const links = [
    { imgSrc: 'https://img.icons8.com/fluency-systems-filled/96/FFFFFF/phone-disconnected.png', altText: 'phone-disconnected', text: 'Call' },
    { imgSrc: 'https://img.icons8.com/material-rounded/96/FFFFFF/user.png', altText: 'user', text: 'Contact' },
    { imgSrc: 'https://img.icons8.com/material-rounded/96/FFFFFF/facebook-f--v1.png', altText: 'facebook-f', text: 'Facebook' },
    { imgSrc: 'https://img.icons8.com/windows/96/FFFFFF/telegram-app.png', altText: 'telegram-app', text: 'Telegram' },
    { imgSrc: 'https://img.icons8.com/material-rounded/96/FFFFFF/new-post.png', altText: 'new-post', text: 'Email' },
    { imgSrc: 'https://img.icons8.com/sf-regular/96/FFFFFF/messaging-.png', altText: 'messaging-', text: 'Chat' },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/FFFFFF/facebook-messenger.png', altText: 'facebook-messenger', text: 'Messenger' },
    { imgSrc: 'https://img.icons8.com/ios/96/FFFFFF/dining-room.png', altText: 'dining-room', text: 'Menu' },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/FFFFFF/whatsapp--v1.png', altText: 'whatsapp--v1', text: 'WhatsApp' },
    { imgSrc: 'https://img.icons8.com/ios-glyphs/96/FFFFFF/discord-logo.png', altText: 'discord-logo', text: 'Discord' },
    { imgSrc: 'https://img.icons8.com/ios-filled/98/FFFFFF/gmail-new.png', altText: 'gmail-new', text: 'Gmail' },
   
   
  ];
  const links4 = [
    { imgSrc: 'https://img.icons8.com/fluency-systems-filled/96/FFFFFF/phone-disconnected.png', altText: 'phone-disconnected', text: 'Call' },
    { imgSrc: 'https://img.icons8.com/material-rounded/96/FFFFFF/user.png', altText: 'user', text: 'Contact' },
    { imgSrc: 'https://img.icons8.com/material-rounded/96/FFFFFF/facebook-f--v1.png', altText: 'facebook-f', text: 'Facebook' },
    { imgSrc: 'https://img.icons8.com/material-rounded/96/FFFFFF/new-post.png', altText: 'new-post', text: 'Email' },
    { imgSrc: 'https://img.icons8.com/sf-regular/96/FFFFFF/messaging-.png', altText: 'messaging-', text: 'Chat' },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/FFFFFF/facebook-messenger.png', altText: 'facebook-messenger', text: 'Messenger' },
    { imgSrc: 'https://img.icons8.com/ios/96/FFFFFF/dining-room.png', altText: 'dining-room', text: 'Menu' },
   
    { imgSrc: 'https://img.icons8.com/windows/96/FFFFFF/telegram-app.png', altText: 'telegram-app', text: 'Telegram' },
  ];
  const addlink=[
    { imgSrc: 'images/Plus.png', altText: 'Add Link', text: 'Add Link' },
  ];
  return (
    <>
    <div className='home'>
    <div className='main-hed-page'>
    <Link to="/login1">
    <div className="back-Div">
      <img
       id='back-div-icon'
        src="https://img.icons8.com/ios-glyphs/96/back.png"
        alt="back"
      />
    </div>
    </Link>
    <div className='web-icon-page'>
    <img id='web-icon' src='images/upgraving_logo 1 (5).png'/>
    </div>
     <Link to='/setting' ><div className='settingdiv'><img id="settingimg" src='images/Settings.png'></img>
     </div>
     </Link>
    </div>
       

        <div className='imagesArea' >
          
          <div className='coverDiv'>
            <img src='images/cover.png' />
            <div className='coverEdit' position absoulte>
              <img src='images/Photo camera.png' />
              <span>Upload Image</span>
            </div>
          </div>
          <div className='profileDiv'>
          <img src='images/Group 657.png' />
          <div className='profileEdit' position absoulte>
            <img src='images/Group 656 (1).png' />
            <span>Upload Image</span>
          </div>
        </div>
        <div className='iconDiv'>
          <img src='images/icon.png' />
          <div className='iconEdit' position absoulte>
            <img src='images/Photo camera.png' />
            <span>Add Icon</span>
          </div>
        </div>
        </div>


       
        <div className='prolink'>
        <div className='prolink1'>
        <label className="toggle1">
        <input type="checkbox" />
        <span className="slider1"></span>
      </label>      
<span className='linktxt2'>https://profile.up-cards.com/51417 </span>
    
        <div className='prolink2'>
               <img src='images/Copy.png'></img>
               <p>Copy</p>
        </div>
        </div>
        </div>
        <div className='Inputfieldprofile'>
        <h1 id='inputfield-profile'>Personal Detail</h1>
        <div className='inputfield'>
        <input type='text' name='full name' placeholder='Full Name'/>
        <input type='text' name='City name' placeholder='City Name'/>
        <input type='text' name='Job Title' placeholder='Job Title'/>
        <input type='text' name='Company Name' placeholder='Company Name'/>
        <textarea id='biofield' type='Bio' name='full name' placeholder='Bio'></textarea>
        </div>
        </div>
        <div className='addnewlink'>
        <div className="heading-container">
        <div className="line"></div>
        <h1 className="centered-heading">Link</h1>
        <div className="line"></div>
      </div>
      <div className='addlink' style={{ marginTop: '-10px' }}>
      {links.map((link, index) => (
        <div key={`link-${index}`} className='textlink'>
          <div className='link'>
            <img src={link.imgSrc} alt={link.altText} />
          </div>
          <p>{link.text}</p>
        </div>
        
      ))}
      
      <div onClick={handleAddLinkButtonClick} className='mainaddlinknew'>
      <div className='addlinknew'>
       <img src='images/Plus.png'></img>
      </div>
      <p>Add Link</p>
      </div>
    </div>
    <Modal
    open={isAddLinkModalOpen}
    onClose={handleAddLinkModalClose}
    aria-labelledby="add-link-modal-title"
    aria-describedby="add-link-modal-description"
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
        onClick={handleAddLinkModalClose}
        sx={{
          position: 'absolute',
          top: 8,
          left: 18,
          width: '24px',
         height: '24px',
        background: '#ECECEC',
        }}
      >
        <CloseIcon />
      </IconButton>
      <div className='add-link-content2'>
       <h2 id='main-text-addlink'>Add Social Links</h2>
       <h1 id='social-media-hed'>Social Media</h1>
       <div className='social-media'>
       <div className='social-media-icon'>
       {links4.map((link, index) => (
        <div key={`link-${index}`} className='mediaalllink'>
          <div className='link-media' onClick={handleLinkMediaModalOpen}>
            <img src={link.imgSrc} alt={link.altText} />
          </div>
          <p id='soialp'>{link.text}</p>
        </div>
        
      ))}
       </div>
       </div>
       <div className='contact-media'>
       <h1 id='contactmedia'>Contact</h1>
       <div className='social-media'>
       <div className='social-media-icon'>
       {links4.map((link, index) => (
        <div key={`link-${index}`} className='mediaalllink'>
          <div className='link-media' onClick={handleLinkMediaModalOpen}>
            <img src={link.imgSrc} alt={link.altText} />
          </div>
          <p id='soialp'>{link.text}</p>
        </div>
        
      ))}
       </div>
       </div>
       </div>
       <div className='website'>
       <h1 id='contactmedia'>Website</h1>
       <div className='social-media'>
       <div className='social-media-icon'>
       {links4.map((link, index) => (
        <div key={`link-${index}`} className='mediaalllink'>
          <div className='link-media' onClick={handleLinkMediaModalOpen}>
            <img src={link.imgSrc} alt={link.altText} />
          </div>
          <p id='soialp'>{link.text}</p>
        </div>
        
      ))}
       </div>
       </div>
       </div>
      </div>
      <br></br>
    </Box>
  </Modal>
        </div>
        {/* Link Media Modal */}
        <Modal
          open={isLinkMediaModalOpen}
          onClose={handleLinkMediaModalClose}
          aria-labelledby="link-media-modal-title"
          aria-describedby="link-media-modal-description"
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
              maxHeight: '90vh',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleLinkMediaModalClose}
              sx={{
                position: 'absolute',
                top: 18,
                left: 22,
                width: '24px',
                height: '24px',
                background: '#ECECEC',
              }}
            >
              <CloseIcon />
            </IconButton>
           <div className='add-link-media2'>
           <h1>Add</h1>
           <div className='every-link-icon'>
           <img src='https://img.icons8.com/windows/96/FFFFFF/telegram-app.png'/></div>
           <p>Telegram</p>
           <input type='text' name='input url' placeholder='Enter URL'/>
           <div className='twolink-btn'>
           <button onClick={handleLinkMediaModalClose} id='cancel-Btn'>Cancel</button>
           <button  id='save-Btn'>Save</button>
           </div>
           </div>
           <br></br>
          </Box>
        </Modal>

        <div className='colors'>
        <div className='color'>
        <p>Select Colors</p>
        </div>
        <div className='select-color'>
        <div className='chossecolor'>
        <img src='images/Eye drops.png'></img>
        </div>
        <div className='chossecolor1'></div>
        <div className='chossecolor2'></div>
        <div className='chossecolor3'></div>
        <div className='chossecolor4'></div>
        <div className='chossecolor5'></div>
        <div className='chossecolor6'></div>
        <div className='chossecolor7'></div>
        </div>
        </div>
        <div className='theme'>
        <div className='select-theme'>
        <p id='theme-11'>Select Theme</p>
        <p id='theme-22'>Day Mode Is Active</p>
        </div>
        <div className='tdso'></div>
       <DarkModeToggle/>
        </div>
        <div className='save-button'>
        <button>Save</button>
        </div>
       </div>
    </>
  )
}
