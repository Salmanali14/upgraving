import React, { useState,useEffect, useContext } from 'react';
import { Modal, Box, IconButton, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import './Login.css';
import Footer from './Footer';
import DeleteUser from './Deleteuser';
import Switchtoggle from './Switchtoggle';
import QrCodeGenerator from './QrCodeGenerator';
import { storage,  } from './firebaseConfig';
import { uploadString , ref as sRef,getDownloadURL} from 'firebase/storage';
import { update , ref,push,onValue,query,orderByChild,equalTo, child } from 'firebase/database';
import {db} from './firebaseConfig';
import prfl from './images/Group 661.png'
import cover from './images/Group 659.png'
import logo from './images/Group 663.png'
import insta from './images/instagram.png'
import AddNewAccountModal from './AddNewAccountModal';
import Leadswitch from './leadswitch';
import Directswitch from './Directswitch';
import DefaultAccountDelete from './defaultAccountDelete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
const Home = () => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isCopyLinkModalOpen, setCopyLinkModalOpen] = useState(false);
  const [isSwitchModalOpen, setSwitchModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); 
  const [ourInfo, setOurInfo] = useState({ fullname: '', location: '', jobtitle: '', company: '', bio: '' });
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [logoImage, setLogoImage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { id, parentId } = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const[selectlinks,setselectlinks]=useState([])
  const [openleadModal, setOpenleadModal] = useState(false);
const [deleteId,setdeleteId] = useState();
const { t } = useTranslation();
const { language } = useContext(LanguageContext);   
  const handleImageClick = () => {
    setOpenleadModal(true);
  };

  const handleCloseleadModal = () => {
    setOpenleadModal(false);
  };
  const [openleadModal1, setOpenleadModal1] = useState(false);

  const handleImageClick1 = () => {
    setOpenleadModal1(true);
  };

  const handleCloseleadModal1 = () => {
    setOpenleadModal1(false);
  };

  const [leadmode, setLeadmod] = useState(false);
  const toggleLeadmodStatus = async () => {
    // Toggle the directmode state first
   
    setLeadmod((prevLeadmod) => !prevLeadmod);
  
    try {
      // Now use the updated directmode state to save to Firebase
      const userRef = ref(db, `user/${currentUser}`);
      await update(userRef, { leadmode: !leadmode }); // Use !directmode here
      console.log("Directmode saved to Firebase");
    } catch (error) {
      console.error("Error saving directmode to Firebase: ", error);
    }
  };
  const [directmode, setDirectmode] = useState(false);
  const toggledirectStatus = async () => {
    // Toggle the directmode state first
   
    setDirectmode((prevDirectmode) => !prevDirectmode);
  
    try {
      // Now use the updated directmode state to save to Firebase
      const userRef = ref(db, `user/${currentUser}`);
      await update(userRef, { directmode: !directmode }); // Use !directmode here
      console.log("Directmode saved to Firebase");
    } catch (error) {
      console.error("Error saving directmode to Firebase: ", error);
    }
  };
  useEffect(() => {
    if (ourInfo.directmode && selectlinks.length > 0) {
      // Fetch the selected link value from Firebase
      const currentUser = localStorage.getItem('useruid');
      const selectedLinkRef = ref(db, `user/${currentUser}/direct/selectedLink`);
      onValue(selectedLinkRef, (snapshot) => {
        const selectedLinkValue = snapshot.val();
        
        // Update the selected property of links based on selectedLinkValue
        const updatedLinks = selectlinks.map((link, index) => ({
          ...link,
          selected: selectedLinkValue ? link.name === selectedLinkValue : index === 0, // Select the first link if selectedLinkValue is null
        }));
        
        setselectlinks(updatedLinks);
      });
    }
  }, [ourInfo.directmode, selectlinks.length]);
  
  const handleLinkClick = async (index, linkValue) => {
    // Update selected state of links
    const updatedLinks = selectlinks.map((link, i) => ({
      ...link,
      selected: i === index,
    }));
    setselectlinks(updatedLinks);
  
    // Save selected link to Realtime Database if directmode is true
    if (ourInfo.directmode) {
      try {
        const selectedLink = selectlinks[index];
        const currentUser = localStorage.getItem('useruid');
        const userRef = ref(db, `user/${currentUser}/direct`);
        await update(userRef, { selectedLink: selectedLink.name, value: selectedLink.value, linkId: selectedLink.linkId });
  
        console.log('Selected link saved to Realtime Database');
      } catch (error) {
        console.error('Error saving selected link to Realtime Database:', error);
      }
    } else {
      // Set elm.value to window.value when directmode is false
      //window.open(linkValue)
   
    }
  };
  
  
  
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
const [color,setColor]=useState("")
  const currentUser = localStorage.getItem("useruid");
  const parentidUser = localStorage.getItem("parentid");

  const getSingleChild = () => {
    const starCountRef = ref(db, `user/${currentUser}`)

    onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();
      console.log(data);
      console.log("testing data");
      setOurInfo({fullname:data.fullname,location:data.location,jobtitle:data.jobtitle,company:data.company,bio:data.bio,profileImage:data.profileImage,coverImage:data.coverImage,logoImage:data.logoImage,leadmode:data.leadmode,directmode:data.directmode})
      setProfileImage(data?.profileImage)
      setCoverImage(data?.coverImage)
      setLogoImage(data?.logoImage)
      setColor(data?.colors)
      setLeadmod(data?.leadmode)
     setDirectmode(data?.directmode) 
      // setmylist(Object.values(data));
      // setfiltered(Object.values(data));
      // updateStarCount(postElement, data);
    });
  };
  useEffect(() => {
    getSingleChild()
   
  }, []);
 
  
  useEffect(() => {
    const starCountRef = query(
      ref(db, "/user"),
      orderByChild("parentId"),
      equalTo(parentidUser)
    );
    console.log(currentUser)
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
  console.log(filteredUsers);

  
  useEffect(() => {
    let getdata = async () => {
    const starCountRef = ref(db,`user/${currentUser}/links/`);
    onValue(starCountRef, async (snapshot) => {
    let fetchdata = await snapshot.val();
    console.log(fetchdata)
    setselectlinks(Object.values(fetchdata));
    });
    };
    getdata();
  },[])
  let returnIcons=(linkId)=>{
    if (linkId===1) {
        return insta
    }else if (linkId===2){
      return 'https://img.icons8.com/ios-filled/96/ffffff/tiktok--v1.png'
    }else if (linkId===3){
      return 'https://img.icons8.com/material-rounded/96/FFFFFF/facebook-f--v1.png'
    }else if (linkId===4){
      return 'https://img.icons8.com/ios-filled/96/ffffff/twitterx--v1.png'
    }else if (linkId===5){
      return 'https://img.icons8.com/ios-filled/96/ffffff/linkedin.png'
        } else if (linkId===6){
          return 'https://img.icons8.com/ios-filled/96/FFFFFF/facebook-messenger.png'
            }else if (linkId===7){
              return 'https://img.icons8.com/ios-glyphs/96/FFFFFF/discord-logo.png'
                }
                else if (linkId===8){
                  return 'https://img.icons8.com/ios-filled/96/ffffff/snapchat--v1.png'
                    }
                    else if (linkId===9){
                      return 'https://img.icons8.com/fluency-systems-filled/96/FFFFFF/phone-disconnected.png'
                        }
                        else if (linkId===10){
                          return 'https://img.icons8.com/material-rounded/96/FFFFFF/user.png'
                            }
                            else if (linkId===11){
                              return 'https://img.icons8.com/ios-filled/96/FFFFFF/whatsapp--v1.png'
                                }
                                else if (linkId===12){
                                  return 'https://img.icons8.com/ios-filled/98/FFFFFF/gmail-new.png'
                                    }
                                    else if (linkId===13){
                                      return 'https://img.icons8.com/material-rounded/96/FFFFFF/new-post.png'
                                        }else if (linkId===14){
                                          return 'https://img.icons8.com/ios-filled/96/ffffff/zoom.png'
                                            }else if (linkId===15){
                                              return 'https://img.icons8.com/windows/96/FFFFFF/telegram-app.png'
                                                }else if (linkId===16){
                                                  return 'https://img.icons8.com/ios-filled/96/ffffff/skype.png'
                                                        }else if (linkId===17){
                                                          return 'https://img.icons8.com/ios-filled/96/ffffff/google-play.png'
                                                            }else if (linkId===18){
                                                              return 'https://img.icons8.com/ios-filled/96/ffffff/apple-app-store--v2.png'
                                                                }else if (linkId===19){
                                                                  return 'https://img.icons8.com/ios-filled/96/ffffff/paypal.png'
                                                                    }else if (linkId===20){
                                                                      return 'https://img.icons8.com/ios-filled/96/ffffff/cash-app.png'
                                                                        }else if (linkId===21){
                                                                          return 'https://img.icons8.com/ios-filled/96/ffffff/google-logo.png'
                                                                            }else if (linkId===22){
                                                                              return 'https://img.icons8.com/ios-filled/96/ffffff/youtube-squared.png'
                                                                                }else if (linkId===23){
                                                                                  return 'https://img.icons8.com/ios-filled/96/ffffff/amazon.png'
                                                                                    }else if (linkId===24){
                                                                                      return 'https://img.icons8.com/ios-filled/96/FFFFFF/facetime.png'
                                                                                        }

      }
  const handleDeleteButtonClick = () => {
    setDeleteModalOpen(true);
  };
  const handleShareButtonClick = () => {
    setShareModalOpen(true);
  };

  const handleCopyLinkButtonClick = () => {
    setShareModalOpen(false);
   
  };

  const handleSwitchButtonClick = () => {
    setSwitchModalOpen(true);
  };

  const handleModalsClose = () => {
    setShareModalOpen(false);
    setCopyLinkModalOpen(false);
    setSwitchModalOpen(false);
  };
  setTimeout(() => {
    setCopyLinkModalOpen(false);
  }, 2000);

  const profiles = [
    {
      name: 'Drake Adwin',
      role: 'Project Manager',
      description: 'Lorem ipsum dolor sit amet consectetur. Aliquet nunc augue praesent lectus sodales.',
    },
  ];

 
  const handleDefaultProfileClick = async (id) => {
    const currentUserUid = localStorage.setItem("useruid",id);
  
    window.location.reload();
  };

  const [parentProfile, setParentProfile] = useState(null);
  const getparent = () => {
    const currentUserUid = localStorage.getItem("parentid");
    const starCountRef = ref(db, `user/${currentUserUid}`)

    onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();
      console.log(data);
      console.log("testing data");
      setParentProfile(data);
      // setmylist(Object.values(data));
      // setfiltered(Object.values(data));
      // updateStarCount(postElement, data);
    });
  };
  useEffect(() => {
    getparent()
  }, []);
  console.log(deleteId)
  let updateLinks = () => {
    if (filteredUsers?.length === 1) {
      setFilteredUsers([]);
    }
  }; 
  const baseURL = window.location.origin;
  const previewURL = `${baseURL}/prevprofile/${localStorage.getItem('useruid')}`;
  console.log(previewURL);
  const handleCopyLink = () => {
    // Copy the previewURL to the clipboard
    navigator.clipboard.writeText(previewURL)
      .then(() => {
  toast.success(t("Link copied!"))
      })
      .catch((error) => {
        console.error('Error copying link to clipboard:', error);
      });
  };
  var widthiner= window.innerWidth
  function truncateText(text, maxLength) {
    if (text?.length <= maxLength) {
      return text;
    } else {
      return text?.slice(0, maxLength) + '...';
    }
  }
  let checkAdded = (linkId) => {
    console.log(linkId)
    if (currentUser===linkId) {
   
      return true;
    
    }else{
      return false;
    }
  };
  const handleopenprofile = () =>{
    // Construct the URL with the current user parameter
    var url = `https://superb-duckanoo-ab202f.netlify.app/${currentUser}`;
    
    // Open the URL in a new window
    window.open(url, '_blank');
}
 
  return (
    <>
   
      <div className='home1' style={{backgroundColor:color}}>
      <div className='middle' style={{backgroundColor:color}}>
      <div className='main-hed-page'>
      <div>
      </div>
      <div className='web-icon-page'>
      <img id='web-icon' src='images/upgraving_logo 1 (5).png'/>
      </div>
      <div></div>
      </div>
        <div className='coverimg'>
          <img className='cover' src={ourInfo.coverImage ? ourInfo.coverImage : cover} alt='coverimg' />
          <img className='profile13' src={ourInfo.profileImage ? ourInfo.profileImage : prfl} alt='proffileimg' />
          <img className='icon' src={ourInfo.logoImage ? ourInfo.logoImage : logo} alt='iconimg' />
        </div>
        <div className='profiletext'>
          {profiles.map((profile, index) => (
            <div key={`profile-${index}`} className='username'>
              <h2>{truncateText(ourInfo.fullname?ourInfo.fullname:t("Add Name"),25)}</h2>
              <h4>{truncateText(ourInfo.jobtitle?ourInfo.jobtitle:t("Add Job Title"),25)}</h4>
              <p>{ourInfo.bio?ourInfo.bio:t("Add Bio")}</p>
            </div>
          ))}
        </div>
       
        <div className='profileedit'>

        <div className='prev' onClick={handleopenprofile}>
          <img src="https://img.icons8.com/pulsar-line/96/vision.png" alt="vision" />
          <p>{t("Preview")}</p>
      </div> 
      <Link  to="/editprofile">
          <div className='edit'>
            
            <div id='editmain-1'>
              <img src="https://img.icons8.com/sf-regular/96/create-new.png" alt="create-new" />
              <p>{t("Edit Profile")}</p>
              </div>
       
          </div>
          </Link>
          <div className='prev' onClick={handleShareButtonClick}>
          <img  src="https://img.icons8.com/fluency-systems-regular/96/share--v1.png" alt="share--v1"/>
            <p>{t("Share")}</p>
          </div>
          <div className='edit' onClick={handleSwitchButtonClick}>
          
          <img style={{marginTop:'5px'}} src="https://img.icons8.com/ios-glyphs/96/replace.png" alt="replace"/>
            <p id='editp' onClick={handleSwitchButtonClick}>{t("Switch")}</p>
            
          </div>
        </div>

        <div className="heading-container">
          <div className="line"></div>
          <h1 className="centered-heading">{t("Link")}</h1>
          <div className="line"></div>
        </div>

        <div className='mode'>
          <span> <img width="24" height="24" src="https://img.icons8.com/material-outlined/96/info--v1.png" alt="info--v1" onClick={handleImageClick} /><span id='lead-mod'>{t("Lead Mode")}</span></span>
          <Leadswitch leadmode={ourInfo?.leadmode} toggleLeadmodStatus={toggleLeadmodStatus}  /> 
          <div style={{width:"5%"}}></div>
          <span> <img width="24" height="24" src="https://img.icons8.com/material-outlined/96/info--v1.png" alt="info--v1" onClick={handleImageClick1}/><span id='lead-mod'>{t("Direct Mode")}</span></span>
          <Directswitch directmode={ourInfo?.directmode} toggledirectStatus={toggledirectStatus} /> 
        </div>
        <Modal open={openleadModal} onClose={handleCloseleadModal}>
        <Box
          sx={{
            position: 'absolute',
            width:  widthiner>=450? '380' : '70%',
            bgcolor: 'background.paper',
            borderRadius:'50px',
            boxShadow: 24,
            p: 2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            outline:'none'
          }}
        >
        <p style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img width="60" height="60" src="https://img.icons8.com/fluency/100/info.png" alt="info"/></p>
          
          <Typography variant="body2" sx={{ fontFamily: 'Inter',margin:'10px',textAlign:'center',width:'270px' }}>
          {t("Lead capture will let you exchange info with viewer..")}
          </Typography>
          <Box mt={2} display="flex" justifyContent="center">
            <Button onClick={handleCloseleadModal}  sx={{ fontFamily: 'Inter',color:'white',background: "#1a9be2",borderRadius:'20px',width:'120px',height:'42px', "&:hover": {
              background: "#0079bf", // Change color on hover
            }, }}>
            {t("Ok")}
            </Button>
           
          </Box>
        </Box>
      </Modal>
      <Modal open={openleadModal1} onClose={handleCloseleadModal1}>
      <Box
        sx={{
          position: 'absolute',
          width:  widthiner>=450? '380' : '70%',
          bgcolor: 'background.paper',
          borderRadius:'50px',
          boxShadow: 24,
          p: 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          outline:'none'
        }}
      >
      <p style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <img width="60" height="60" src="https://img.icons8.com/fluency/100/info.png" alt="info"/></p>
        
        <Typography variant="body2" sx={{ fontFamily: 'Inter',margin:'10px',textAlign:'center',width:'270px' }}>
        {t("Direct on will redirect you on selected link..")}
        </Typography>
        <Box mt={2} display="flex" justifyContent="center">
          <Button onClick={handleCloseleadModal1}  sx={{ fontFamily: 'Inter',color:'white',background: "#1a9be2",borderRadius:'20px',width:'120px',height:'42px', "&:hover": {
            background: "#0079bf", // Change color on hover
          }, }}>
          {t("Ok")}
          </Button>
         
        </Box>
      </Box>
    </Modal>
        <div className='addlink'>
        {selectlinks.length > 0 ? (
          selectlinks.map((elm, i) => (
            <div key={`link-${i}`} className='namelink'>
              <div className='link' onClick={() => handleLinkClick(i, elm.value)}>
                {/* Apply different styles based on directmode and selected state */}
                <img src={returnIcons(elm.linkId)} alt={elm.altname}  style={{ opacity: ourInfo.directmode ? (elm.selected ? 1 : 0.3) : 1 }} />
                {ourInfo.directmode && elm.selected && <img id='tick' src="https://img.icons8.com/fluency/96/checked.png" alt="checked--v1"/>}
              </div>
              <p id='soialp'>{t(elm.name)}</p>
            </div>
          ))
        ) : (
          <p>{t("No link added")}</p>
        )}
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
            <h1>{t("Share Profile")}</h1>
            <p>{t("Scan this code with any camera to share your profile.")}</p>
            <div className='share-profile-border'>
            <QrCodeGenerator />
            </div>
            <div className='copy-link-icon' onClick={handleCopyLink}>
              <button >{t("Copy Link")}</button> <img width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/96/FFFFFF/copy--v1.png" alt="copy--v1" />
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
         
          <div className='copy-link-content'>
           <img src='images/Paste.png'/>
           <p>{t("Link Copied!")}</p>
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
          <h1 className='select-profile-text'>{t("Select Profile")}</h1>
          <div className='exist-profile' onClick={() => handleDefaultProfileClick(parentProfile?.id)} >
            {parentProfile && (
              <>
                <img style={{ borderRadius: '50%' }} src={parentProfile.profileImage ? parentProfile.profileImage : prfl} />
                <div className='exsit-profile-data'>
                  <p id='you-exsit-profile'>{t("You")}</p>
                  <h1>{truncateText(parentProfile.fullname,15)}</h1>
                  <p>{t("Username:")} {parentProfile.userName}</p>
                  {checkAdded(parentProfile.id) && (
                
                    <img id='tick1' src="https://img.icons8.com/fluency/96/checked.png" alt="checked--v1"/>
                  )}
                </div>
              </>
            )}
         
            </div>
            <div className='addnew-profile-account' onClick={handleOpenModal}>
            <img width="30" height="30" src="https://img.icons8.com/ios/96/plus-math--v1.png" alt="plus-math--v1"/>
            <p>{t("Create new account")}</p>
            </div>
            {isOpen && (
            <AddNewAccountModal isOpen={isOpen} handleClose={handleCloseModal} />
            )}
            {filteredUsers.map((profile) => (
              <div key={profile.id} className='default-profile'>
                <img style={{borderRadius:'50%'}} src={profile.profileImage ? profile.profileImage : prfl} alt={`profile-${profile.id}`}  onClick={() => handleDefaultProfileClick(profile.id)} />
                <div className='default-profile-hedding'  onClick={() => handleDefaultProfileClick(profile.id)}>
                  <h1>{truncateText(profile.fullname?profile.fullname:t("Add Name"),15)}</h1>
                  <p>{t("Username:")} {profile.userName?profile.userName:t('Add Username')}</p>
                </div>
                {checkAdded(profile.id) && (
                
                  <img id='tick1' src="https://img.icons8.com/fluency/96/checked.png" alt="checked--v1"/>
                )}
                <div onClick={()=>setdeleteId(profile?.id)}>
                <div className='more-btn' onClick={handleDeleteButtonClick} >
                <p style={{ margin: '0px' }} onClick={()=>setdeleteId(profile?.id)}  >
               {t("Delete")}
              </p>
                </div>
                </div>
              </div>
              
            ))}
          </div>
          

            <br></br>
        </Box>
      </Modal>
      {isDeleteModalOpen && (
        <DefaultAccountDelete isOpen={isDeleteModalOpen} handleClose={() => setDeleteModalOpen(false)} deleteId={deleteId}      updateLinks={updateLinks} />
      )}
     
 <Footer/>
 </div>
 <ToastContainer
 position="top-center"
 reverseOrder={false}
/>
 </>
  );
};

export default Home;
