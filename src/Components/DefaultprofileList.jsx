import React, {useState}from 'react'
import { Link } from 'react-router-dom';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteUser from './DeleteUser';
export default function DefaultprofileList() {
    const connectionsData = [
        { date: '31, December, 2023', name: 'Drake Adwin', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (1).png' },
        { date: '31, December, 2023', name: 'Arake Adwin', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (2).png' },
        { date: '31, December, 2023', name: 'Weake Adwin', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (3).png' },
        { date: '31, December, 2023', name: 'Wweke Adwin', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (4).png' },
        { date: '31, December, 2023', name: 'Ioake Adwin', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (1).png' },
        { date: '31, December, 2023', name: 'Opake Adwin', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (3).png' },
        { date: '31, December, 2023', name: 'Qwake Adwin', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (2).png' },
        { date: '31, December, 2023', name: 'Aqake Adwin', role: 'Project Manager', imageSrc: 'images/Ellipse 97 (1).png' },
         ];
         const [isModalOpen, setModalOpen] = useState(false);
         const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); 

         const handleDeleteButtonClick = () => {
           setDeleteModalOpen(true);
         };
         const handleOpenModal = () => {
           setModalOpen(true);
         };
       
         const handleCloseModal = () => {
           setModalOpen(false);
         };
  return (
    <>
    <div className='people-connection15'>
    {connectionsData.map((connection, index) => (
      <div key={index} className='single-con6'>
        <img src={connection.imageSrc} alt={`Profile of ${connection.name}`} onClick={handleOpenModal}/>
        <div className='single-con-about6'>
        <div>
          <h1 id='icon-heds-16'>{connection.date}</h1>
          <h2 id='icon-heds-26'>{connection.name} </h2>
          <h3 id='icon-heds-36'>{connection.role}</h3>
          </div>
          <div className='single-con-btn6'>
            <button id='more-con-btns-06' onClick={handleOpenModal}>Open</button>
            <div className='more-btn' id='more-con-btns-16' onClick={handleDeleteButtonClick}>
              <p id='more-con-txt-1' style={{margin:'0px'}} >Delete</p>
             
            </div>
            
          </div>
        </div>
      </div>
    ))}
  </div>
  <Modal
  open={isModalOpen}
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
    {/* Add your modal content here */}
    <div className='open-profile-people'>
     <h1>Contact Details</h1>
     <img src='images/Ellipse 97 (1).png' id='peo-profl'/>
     <div className='open-profile-people-name'>
     <h2>Drake Adwin</h2>
     <img width="18" height="18" src="https://img.icons8.com/fluency-systems-regular/96/copy--v1.png" alt="copy--v1" />
     </div>
     <h3>31, December, 2023</h3>
     <div className='open-profile-people-Details'>
     <div className='single-pro-details'>
     <img width="15" height="15" src="https://img.icons8.com/fluency-systems-regular/96/business--v1.png" alt="business--v1"/>
     <h4>Project Manager</h4>
     <img width="15" height="15" src="https://img.icons8.com/fluency-systems-regular/96/copy--v1.png" alt="copy--v1" />
     </div>
     <div className='single-pro-details'>
     <img width="15" height="15" src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/96/external-builing-modern-business-and-business-essentials-flatart-icons-outline-flatarticons.png" alt="external-builing-modern-business-and-business-essentials-flatart-icons-outline-flatarticons"/>
     <h4>AE Solutions</h4>
     <img width="15" height="15" src="https://img.icons8.com/fluency-systems-regular/96/copy--v1.png" alt="copy--v1" />
     </div>
     <div className='single-pro-details'>
     <img width="15" height="15" src="https://img.icons8.com/ios/96/phone--v1.png" alt="phone--v1"/>
    <h4>+92 300 0023000</h4>
     <img width="15" height="15" src="https://img.icons8.com/fluency-systems-regular/96/copy--v1.png" alt="copy--v1" />
     </div>
     <div className='single-pro-details'>
     <img width="15" height="15" src="https://img.icons8.com/ios/96/mail.png" alt="mail"/>
     <h4>drake@yahoo.com</h4>
     <img width="15" height="15" src="https://img.icons8.com/fluency-systems-regular/96/copy--v1.png" alt="copy--v1" />
     </div>
     </div>
     <div className='person-des'>
     <img width="15" height="15" src="https://img.icons8.com/material-outlined/96/info--v1.png" alt="info--v1" />
     <h5>I’m A designer........Lorem ipsum dolor sit amet consectetur. Aliquet nunc augue praesent lectus sodales.Lorem ipsum dolor sit amet consectetur. Aliquet nunc augue praesent lectus sodalesLorem ipsum dolor sit amet consectetur. Aliquet nunc augue praesent lectus sodales.Lorem ipsum dolor sit amet consectetur.</h5>
     <img width="15" height="15" src="https://img.icons8.com/fluency-systems-regular/96/copy--v1.png" alt="copy--v1" />
     </div>
     <div className='Profilebutton124'>
    <button>Download VCF<img src='images/Vector 1.png'></img></button> 
    </div>
    </div>
    <br></br>
  </Box>
</Modal>
{isDeleteModalOpen && (
  <DeleteUser isOpen={isDeleteModalOpen} handleClose={() => setDeleteModalOpen(false)} />
)}
  <br></br>

    </>
  )
}
