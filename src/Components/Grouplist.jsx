import React, { useState } from 'react';
import { Modal, Box, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Login.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { CiGrid41 } from "react-icons/ci";
import { BsListCheck } from "react-icons/bs";
import DeleteUser from './DeleteUser';
const connectionsData = [
    { Groupname:'S', date: '31, December, 2023', name: 'Social Media ', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (1).png' },
    { Groupname:'D', date: '31, December, 2023', name: 'Development', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (2).png' },
    { Groupname:'M', date: '31, December, 2023', name: 'Management', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (3).png' },
    { Groupname:'D', date: '31, December, 2023', name: 'Design Team', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (4).png' },
    { Groupname:'D', date: '31, December, 2023', name: 'Design Team', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (1).png' },
    { Groupname:'P', date: '31, December, 2023', name: 'Product Team', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (3).png' },
    { Groupname:'Q', date: '31, December, 2023', name: 'QA Team', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (2).png' },
    { Groupname:'W', date: '31, December, 2023', name: 'Workers', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (1).png' },
     ];
export default function Grouplist() {
  const [isLinkMediaModalOpenw, setLinkMediaModalOpenw] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); 

  const handleDeleteButtonClick = () => {
    setDeleteModalOpen(true);
  };


  const handleLinkMediaModalOpenw = () => {
    setLinkMediaModalOpenw(true);
  };

  const handleLinkMediaModalClosew = () => {
    setLinkMediaModalOpenw(false);
  };
  return (
    
    <div className='Connections'>
    <h1 id='con-hed-main'>Connections</h1>
    <div className='search-con'>
    <img width="20" height="20" src="https://img.icons8.com/ios/96/search.png" alt="search"/>
    <input type='text' name='Search' placeholder='Search'/>
    </div>
    <div className='connection-btn'>
    <Link to='/connections'>
    <button id='group-btn1'>People</button></Link>
    <Link to='/groupconnections'>
    <button id='peo-btn1'>Groups</button>
    </Link>
    </div>
    <div className='connection-hed'>
    <h1> Add Connections</h1>
    <p>Develop your network by meeting new individuals and having them click the "exchange contact" button on your profile.</p>
    </div>
    <div className="heading-container" id='hedding-line-width'>
    <div className="line"></div>
    <h1 className="centered-heading" id='line-hed'>All Groups</h1>
    <div className="line"></div>
    </div>
    <div className='create-group' onClick={handleLinkMediaModalOpenw} >
    <img  src="https://img.icons8.com/android/96/plus.png" alt="plus"/>
    <h1>Create Group</h1>
    </div>
    <div className='grid' style={{marginTop:'10px'}}>
   <div className='connection-btn44'>
    <Link to='/groupconnections'>
    <button id='group-btn512'><CiGrid41 /> {'\u00A0'}Grid{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</button></Link>
    <Link to='/grouplist'>
    <button id='peo-btn512'><BsListCheck />{'\u00A0'}List</button>
    </Link>
    </div>
   </div>
    <div className='people-connection15'>
    {connectionsData.map((connection, index) => (
      <div key={index} className='single-con6'>
          <Link to='/singlegroup'>
              <div className='group-color'>
                  <img src={connection.imageSrc} alt={`Group ${index + 1}`} />
              </div>
          </Link>
          <Link to='/singlegroup'>
          <h2 id='icon-group-2'>{connection.name}</h2></Link>
      <div className='single-con-about6' style={{margin:'0px'}}>
        
          <div className='single-con-btn6'>
          <Link to='/singlegroup1'> <button id='more-con-btns-06'>Open</button></Link>
            <div className='more-btn' id='more-con-btns-16' onClick={handleDeleteButtonClick} >
            
              <p id='more-con-txt-1' style={{margin:'0px'}}>Delete</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <Modal
        open={isLinkMediaModalOpenw}
        onClose={handleLinkMediaModalClosew}
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
            onClick={handleLinkMediaModalClosew}
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
          <div className='Create-group-popup'>
            <h1>Create Group</h1>
            <div className='profileDiv25'>
          <img src='images/Group 657.png' />
          <div className='profileEdit25' position absoulte>
          <img src='images/Photo camera.png' />
            <span>Upload Image</span>
          </div>
        </div>
        <input type='text' placeholder='Enter Name'/>
        <Button>Create Group</Button>
          </div>
          <br></br>
        </Box>
      </Modal>
      {isDeleteModalOpen && (
        <DeleteUser isOpen={isDeleteModalOpen} handleClose={() => setDeleteModalOpen(false)} />
      )}
      
  <Footer/>
      </div>
   
  )
}
