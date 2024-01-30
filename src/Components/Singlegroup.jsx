import React, { useState } from 'react';
import './Login.css';
import { Link} from 'react-router-dom';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Defaultallprofile from './Defaultallprofile';
 
export default function Singlegroup() {
  const [openModal, setOpenModal] = useState(false);
  const [openModall, setOpenModall] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModall = () => {
   
    setOpenModall(true);
  };

  const handleCloseModall = () => {
    setOpenModall(false);
  };
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
     <div className='single-group-js'>
    <div className='main-grp-page'>
    <Link to="/groupconnections">
    <div className="back-Div">
      <img
       id='back-div-icon'
        src="https://img.icons8.com/ios-glyphs/96/back.png"
        alt="back"
      />
    </div>
    </Link>
    <div className='web-icon-page'>
   <p>Group</p>
    </div>
    <div></div>
    </div>
    <div className='group-pro1'>
    <img className='group-pro1' src='images/Ellipse 97 (1).png'/>
    </div>
    <h1>Social Media</h1>
    <div className="heading-container" id='hedding-line-width'>
    <div className="line"></div>
    <h1 className="centered-heading" id='line-hed'>All Members</h1>
    <div className="line"></div>
    </div>
    <div className='create-group' onClick={handleOpenModal}>
    <img  src="https://img.icons8.com/android/96/plus.png" alt="plus"/>
    <h1>Add Members</h1>
    </div>
    <Modal
    open={openModal}
    onClose={handleCloseModal}
    aria-labelledby="open-modal-title"
    aria-describedby="open-modal-description"
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
        height:'auto',
        overflowY: "auto",
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={handleCloseModal}
        sx={{
          position: 'absolute',
          top: 18,
          left: 14,
          width: '24px',
          height: '24px',
          background: '#ECECEC',
        }}
      >
        <CloseIcon />
      </IconButton>
      <div className='switch-modal-content'>
      <h1 className='select-profile-text' id='add-mem'>Choose Member</h1>
        {defaultpro.map((profile) => (
          <div key={profile.id} className='default-profile'>
            <img src={profile.imgSrc} alt={`profile-${profile.id}`} />
            <div className='default-profile-hedding'>
              <h1>{profile.name}</h1>
              <p>Username: {profile.username}</p>
            </div>
            <div className='more-btn23' onClick={handleOpenModall}>
              <p id='more-vv'>Add</p>
              <img id='add-img5' src="https://img.icons8.com/android/96/FFFFFF/plus.png" alt="plus"/>
            </div>
          </div>
        ))}
        <br></br>
      </div>
    </Box>
  </Modal>
  <Modal
    open={openModall}
    onClose={handleCloseModall}
    aria-labelledby="open-modal-title"
    aria-describedby="open-modal-description"
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
        height:'auto',
        overflowY: "auto",
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
     
      <div className="select-popup">
            <img src="images/Accepted.png" />
            <h1>Add Member Successfully!</h1>
            <div className="select-btn">
              <button onClick={handleCloseModall}>OK</button>
            </div>
          </div>
    </Box>
  </Modal>
  
  <Defaultallprofile/>
  <br></br>
    </div>

 
    </>
  )
}
