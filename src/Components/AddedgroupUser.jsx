import React, {useState,useEffect, useContext}from 'react'
import { Link } from 'react-router-dom';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Moredropdwon from './Moredropdwon';
import { IoIosMore } from "react-icons/io";
import { storage,  } from './firebaseConfig';
import prfl from './images/Group 661.png'
import { uploadString , ref as sRef,getDownloadURL} from 'firebase/storage';
import { update , ref,push,onValue,query,orderByChild,equalTo, child } from 'firebase/database';
import {db} from './firebaseConfig';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Groupmorebtn from './Groupmorebtn';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
export default function AddedgroupUser({ filterConnections }) {

         const [isModalOpen, setModalOpen] = useState(false);
         const [clickedLink, setClickedLink] = useState(null);
         const [filteredUsers, setFilteredUsers] = useState([]);
         const [copyLinkModalOpen, setCopyLinkModalOpen] = useState(false);
         const [addUsers, setaddUsers] = useState([]);
         const [userid,setUserid] = useState();
         const { t } = useTranslation();
         const { language } = useContext(LanguageContext);  
   const {id}=useParams();
         useEffect(() => {
            let getdata = async () => {
            const starCountRef = ref(db,`groups/${id}/members/`);
            onValue(starCountRef, async (snapshot) => {
            let fetchdata = await snapshot.val();
            console.log(fetchdata)
            setaddUsers(Object.values(fetchdata));
            });
            };
            getdata();
          },[])
          console.log(addUsers)
         const handleCopyLinkModalOpen = async (detail) => {
          try {
            await navigator.clipboard.writeText(clickedLink[detail]);
            setCopyLinkModalOpen(true);
            toast.success("Copied");
          } catch (error) {
            console.error('Failed to copy: ', error);
          }
        };
      
        const handleCopyLinkModalClose = () => {
          setCopyLinkModalOpen(false);
        };
         const parentidUser = localStorage.getItem("parentid");
         useEffect(() => {
          const starCountRef = query(
            ref(db, "/contacts"),
            orderByChild("userId"),
            equalTo(parentidUser)
          );
         
          onValue(starCountRef, async (snapshot) => {
            const data = await snapshot.val();
            setFilteredUsers(Object.values(data));
            console.log(data);
            // console.log("testing data");
            // setmylist(Object.values(data));
        
            // setfiltered(Object.values(data));
        
            // updateStarCount(postElement, data);
          });
        }, []); 
console.log(filteredUsers)
         const handleLinkMediaModalOpen2 = (link) => {
          setClickedLink(link);
          setModalOpen(true);
        };
      
console.log(clickedLink);
         const handleOpenModal = () => {
           setModalOpen(true);
         };
       
         const handleCloseModal = () => {
           setModalOpen(false);
         };
         const [anchorEl2, setAnchorEl] = useState(null);

         const handleOpenMenu2 = (event) => {
           setAnchorEl(event.currentTarget);
         };
       
         const handleCloseMenu2 = () => {
           setAnchorEl(null);
         };
    let handleDropDown=(id)=>{
      handleOpenMenu2()
      setUserid(id)
    }  
    let updateLinks = () => {
      if (addUsers?.length === 1) {
        setaddUsers([]);
      }
    }; 
    function formatDate(dateString) {
      if (!dateString) {
        return "";
      }
    
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
      const parts = formattedDate.split(' ');
      return `${parts[1]} ${parts[0]}, ${parts[2]}`;
    }
    function truncateText(text, maxLength) {
      if (text?.length <= maxLength) {
        return text;
      } else {
        return text?.slice(0, maxLength) + '...';
      }
    }
  return (
    <>
    <div className='people-connection'>
 

    {addUsers.map((link, index) => (
      <div key={`link-${index}`} className='single-con'>
        <img src={link.profile ? link.profile:prfl} alt={`Profile of ${link.name}`} onClick={() => handleLinkMediaModalOpen2(link)} />
        <div className='single-con-about'>
          <h1 id='icon-heds-1'>{formatDate(link.date)}</h1>
          <h2 id='icon-heds-2'>{truncateText(link.name,15)} </h2>
          <h3 id='icon-heds-3'>{truncateText(link.jobtitle,20)}</h3>
          <div className='single-con-btn'>
            <button id='more-con-btns-0' onClick={() => handleLinkMediaModalOpen2(link)}>{t("Open")}</button>
            <div onClick={()=>setUserid(link?.linkId)}>
            <div className='more-btn more-con-btns-1'  onClick={handleOpenMenu2}>
              <p id='more-con-txt-1' style={{ margin: '0px' }} onClick={()=>setUserid(link?.linkId)}>{t("More")}<IoIosMore               style={{ fontSize: '7px', marginLeft:"2px" }} /></p>
            </div></div>
            <Groupmorebtn anchorEl2={anchorEl2} handleCloseMenu={handleCloseMenu2} filteredUsers={filteredUsers} setFilteredUser={setFilteredUsers}  userid={userid} updateLinks={updateLinks} />
          </div>
        </div>
      </div>
    ))


}
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
    {clickedLink && (
    <div className='open-profile-people'>
     <h1>{t("Contact Details")}</h1>
     <img src={clickedLink.profile?clickedLink.profile:prfl} id='peo-profl'/>
     <div className='open-profile-people-name'>
     <h2>{truncateText(clickedLink.name,15)}</h2>
     <img width="18" height="18" src="https://img.icons8.com/fluency-systems-regular/96/copy--v1.png" alt="copy--v1" onClick={() => handleCopyLinkModalOpen('fullname')} />
     </div>
     <h3>{formatDate(clickedLink.date)}</h3>
     <div className='open-profile-people-Details'>
     {clickedLink.jobtitle !== "" && (
     <div className='single-pro-details'>
     <img width="15" height="15" src="https://img.icons8.com/fluency-systems-regular/96/business--v1.png" alt="business--v1"/>
     <h4>{truncateText(clickedLink.jobtitle,20)}</h4>
     <img width="15" height="15" src="https://img.icons8.com/fluency-systems-regular/96/copy--v1.png" alt="copy--v1" onClick={() => handleCopyLinkModalOpen('jobtitle')}/>
     </div> )}
     {clickedLink.company !== "" && (
     <div className='single-pro-details'>
     <img width="15" height="15" src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/96/external-builing-modern-business-and-business-essentials-flatart-icons-outline-flatarticons.png" alt="external-builing-modern-business-and-business-essentials-flatart-icons-outline-flatarticons"/>
     <h4>{truncateText(clickedLink.company,15)}</h4>
     <img width="15" height="15" src="https://img.icons8.com/fluency-systems-regular/96/copy--v1.png" alt="copy--v1" onClick={() => handleCopyLinkModalOpen('company')}/>
     </div> )}
     <div className='single-pro-details'>
     <img width="15" height="15" src="https://img.icons8.com/ios/96/phone--v1.png" alt="phone--v1"/>
    <h4>{truncateText(clickedLink.phone,12)}</h4>
     <img width="15" height="15" src="https://img.icons8.com/fluency-systems-regular/96/copy--v1.png" alt="copy--v1" onClick={() => handleCopyLinkModalOpen('phone')} />
     </div>
     <div className='single-pro-details'>
     <img width="15" height="15" src="https://img.icons8.com/ios/96/mail.png" alt="mail"/>
     <h4>{truncateText(clickedLink.email,15)}</h4>
     <img width="15" height="15" src="https://img.icons8.com/fluency-systems-regular/96/copy--v1.png" alt="copy--v1" onClick={() => handleCopyLinkModalOpen('email')} />
     </div>
     </div>
     {clickedLink.bio !== "" && (
     <div className='person-des'>
     <img width="15" height="15" src="https://img.icons8.com/material-outlined/96/info--v1.png" alt="info--v1" />
     <h5>{truncateText(clickedLink.bio,37)}</h5>
     <img width="15" height="15" src="https://img.icons8.com/fluency-systems-regular/96/copy--v1.png" alt="copy--v1" onClick={() => handleCopyLinkModalOpen('bio')} />
     </div> )}
     <div className='Profilebutton124'>
    <button>{t("Download VCF")}<img src='/images/Vector 1.png'></img></button> 
    </div>
    </div>
    )}
    <br></br>
  </Box>
</Modal>


  <br></br>

    </>
  )
}
