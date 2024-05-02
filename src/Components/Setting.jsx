import React, { useState,useEffect, useContext } from 'react';
import { Modal, Box, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Login.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiShareForward2Fill } from "react-icons/ri";
import { auth, storage,} from './firebaseConfig';
import { EmailAuthProvider, deleteUser, getAuth, reauthenticateWithCredential, sendPasswordResetEmail } from 'firebase/auth';
import { uploadString , ref as sRef,getDownloadURL} from 'firebase/storage';
import { update , ref,push,onValue,query,orderByChild,equalTo, get,child } from 'firebase/database';
import {db} from './firebaseConfig';
import { fontSize } from '@mui/system';
import Logoutpopup from './Logoutpopup';
import DeleteUser from './Deleteuser';
import Usernamepopup from './Usernamepopup';
import Passwordpopup from './Passwordpopup';
import { CiEdit } from "react-icons/ci";
import ModalPopup from './Modalpopup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyBeforeUpdateEmail } from 'firebase/auth';
import CopyLinkModal from './CopyLinkModal';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
const Setting = () => {
  // const auth=getAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUsernameModalOpen, setUsernameModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [showpassword, setShowpassword] = useState({input1:true,input2:true});
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); 
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false); 
  const [isChangeusernameModalOpen, setChangeusernameModalOpen] = useState(false);
  const [isChangepasswordModalOpen, setChangepasswordModalOpen] = useState(false);
  const [isLanguageModalOpen, setLanguageModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({flag: 'images/United Kingdom.png'});
  const [open, setOpen] = useState(false);
  const [ourInfo, setOurInfo] = useState({ fullname: '', location: '', jobtitle: '', company: '', bio: '',email:" ",userName:'' });
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [logoImage, setLogoImage] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const { t } = useTranslation();
const { language } = useContext(LanguageContext);   
  const openModal = () => {
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };
const [color,setColor]=useState("")
  const currentUser = localStorage.getItem("useruid");
  const getSingleChild = () => {
    const starCountRef = ref(db, `user/${currentUser}`)

    onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();
      console.log(data);
      console.log("testing data");
      setOurInfo({fullname:data.fullname,location:data.location,jobtitle:data.jobtitle,company:data.company,bio:data.bio,profileImage:data.profileImage,coverImage:data.coverImage,logoImage:data.logoImage,email:data.email,userName:data.userName})
      setProfileImage(data?.profileImage)
      setCoverImage(data?.coverImage)
      setLogoImage(data?.logoImage)
      setColor(data?.colors)
      setEmail(data?.email)
      setUsername(data?.userName)
      // setmylist(Object.values(data));
      // setfiltered(Object.values(data));
      // updateStarCount(postElement, data);
    });
  };
  useEffect(() => {
    getSingleChild()
   
  }, []);
  const[selectlinks,setselectlinks]=useState([])
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
  const handleOpen = () => {
    setOpen(true);
    setIsDropdownOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsDropdownOpen(true);
  };
  useEffect(() => {
    // Retrieve selected language from local storage when component mounts
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      setSelectedLanguage(JSON.parse(storedLanguage));
    }
  }, []);
  const handleLanguageSelect = (language) => {
    console.log(language);
    setSelectedLanguage(language);
    // Store selected language in local storage
    localStorage.setItem('selectedLanguage', JSON.stringify(language));
    // Change language using i18n
    i18next.changeLanguage(language.name.toLowerCase());
    // Update Firebase with selected language
    const currentUser = localStorage.getItem("useruid");
    if (currentUser) {
      update(ref(db, `user/${currentUser}`), {
        language: language.name 
      }).then(() => {
        console.log("Selected language updated in Firebase");
      }).catch((error) => {
        console.error("Error updating selected language in Firebase: ", error);
      });
    }
    // Close the modal after language selection
    handleClose();
  };
  

  // Functions to handle modal open/close
  const handleLanguageModalOpen = () => {
    setLanguageModalOpen(true);
    setIsDropdownOpen(true);
  };

  const handleLanguageModalClose = () => {
    setLanguageModalOpen(false);
    setIsDropdownOpen(true);
  };

  const handleChangepasswordButtonClick = () => {
    setChangepasswordModalOpen(true);
    setPasswordModalOpen(false);
    setIsDropdownOpen(true);
  };
  const handleChangeusernameClick = () => {
    setChangeusernameModalOpen(true);
    setUsernameModalOpen(false);
    setIsDropdownOpen(true);
  }; 
  const handleDeleteButtonClick = () => {
    setDeleteModalOpen(true);
    setIsDropdownOpen(true);
  };
  const handleLogoutButtonClick = () => {
    setLogoutModalOpen(true);
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleUsernameModalOpen = () => {
    setUsernameModalOpen(true);
    setIsDropdownOpen(true);
  };

  const handleUsernameModalClose = () => {
    setUsernameModalOpen(false);
    setIsDropdownOpen(true);
  };

  const handlePasswordModalOpen = () => {
    setPasswordModalOpen(true);
    setIsDropdownOpen(true);
  };

  const handlePasswordModalClose = () => {
    setPasswordModalOpen(false);
    setIsDropdownOpen(true);
  };

  let updateEmail=(inputData)=>{
    verifyBeforeUpdateEmail(auth.currentUser, inputData).then(() => {
      update(ref(db, "user/" + currentUser), {
        email: inputData,
      }).then(() => {
        toast.success(t(
          "An email have been sent to you, please verify to update email"
        ));
      });
      // get(child(ref, `user/${userId}`)).then((response) => {
      
      // });

      // setNewEmail("");
     // setShowChangeEmailSlider(false);
    });
  }
  const handleChangeEmailSubmit = async (inputData) => {
    const emailRegEx =
      /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (emailRegEx.test(newEmail)) {
      let usersArray = [];
      get(child(ref, `user`)).then((response) => {
        const users = response?.val();
        const exists = Object.values(users).some(
          (item) => item.email == inputData
        );
        if (exists) {
          showAlertMessage("emailAlreadyExists");
        } else {
          const userId = auth?.currentUser;

          let provider = localStorage.getItem("provider");
          if (provider == "emailpass") {
            const credential = EmailAuthProvider.credential(
              // auth.currentUser.email,
              localStorage.getItem("email"),
              localStorage.getItem("pass")
            );

            const result = reauthenticateWithCredential(
              auth.currentUser,
              credential
            ).then(() => {
              console.log("abc...");
              verifyBeforeUpdateEmail(auth.currentUser, inputData).then(() => {
                update(ref(db, "user/" + userId), {
                  email: inputData,
                }).then(() => {
                  toast.success(
                    "An email have been sent to you, please verify to update email"
                  );
                });
                get(child(ref, `user/${userId}`)).then((response) => {
                
                });

                // setNewEmail("");
                setShowChangeEmailSlider(false);
              });
            });
          }
        }
      });
    } else {
      showAlertMessage("validEmailError");
    }
  };
  
  

const emailChangetextFieldOnChange = (e) => {
  // console.log(e.target.value, 'onchange text')
  setNewEmail(e.target.value);
};
const updateUsername =()=>{
  update(ref(db, `user/${currentUser}`), {
    ...ourInfo,
  })
  toast.success(t("Username change successfully"))
  handleUsernameModalClose(true)
}
const [profileLink, setProfileLink] = useState('');


useEffect(() => {

    // Ensure profileId exists before setting the profileLink
    if (currentUser) {
        setProfileLink(`http://localhost:5173/${currentUser}`);
    } else {
        // Handle case when profileId is undefined
        setProfileLink(t("Profile ID not found"))
    }
}, [currentUser]);
const [isCopyLinkModalOpen, setCopyLinkModalOpen] = useState(false);
const handleCopyLinkModalOpen = async () => {
  try {
      await navigator.clipboard.writeText(previewURL); // Copy profile link to clipboard
      toast.success(t("Profile link is copied"))  // Open copy link modal
  } catch (error) {
      console.error('Failed to copy: ', error);
  }
};
  
const handleCopyLinkModalClose = () => {
  setCopyLinkModalOpen(false);
};

const updatePassword = (email) => {
  if (!email) {
    // showAlertMessage(true, "alert", t("Alert"), "");
    toast.error(t("Email field is requirde"));
  } else {
    const user = auth.currentUser;
    // user
    //   ?.updatePassword(password?.confirmPassword)
    //   .then(function () {
    //     console.log("passwowrd updated successfuly");
    //   })
    //   .catch((error) => {
    //     toast(error.message);
    //   });

    sendPasswordResetEmail(auth, email).then(() => {
      // Password reset email sent!
      // showAlertMessage(false, "alert", t("Alert"), "Email sent");
      toast.success(t(
        "An email have been sent to you, please verify to change password"
      ));
      // ..
    });
  }
};
 

const baseURL = window.location.origin;
const previewURL = `${baseURL}/prevprofile/${localStorage.getItem('useruid')}`;
console.log(previewURL);



function truncateText(text, maxLength) {
  if (text?.length <= maxLength) {
    return text;
  } else {
    return text?.slice(0, maxLength) + '...';
  }
}
  return (
    <>
    <div className='screen' style={{backgroundColor:color}}>
    <div className='setting-main' >
    <ModalPopup open={open} handleClose={handleClose}  handleLanguageSelect={handleLanguageSelect} />
    <h1>{t("Settings")}</h1>
      <div className="dropdown" >
      <div className='setting-f-fiv' onClick={handleDropdownToggle}>
      <span style={{display:'flex', alignItems:'center', justifyContent:'flex-start',width:'90%'}}><img width="20" height="20" src="https://img.icons8.com/ios/96/settings--v1.png" alt="settings--v1"/>
      {'\u00A0'}<h4>{t("Account & Security Settings")}</h4></span>
      <img width="15" height="15" src="https://img.icons8.com/ios-glyphs/96/expand-arrow.png" alt="expand-arrow"  /></div>
        {isDropdownOpen && (
          <div className="dropdown-content">
         
           <div className='account-mail'>
           <div className='account-in'>
           <div className='img-bg-set'>
           <img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/96/user-tag.png" alt="user-tag"/>
           </div>
           <h6>{t("Profile Link")}</h6>
           </div>
           <h5 id='link-set'>{truncateText(previewURL,30)}</h5><span style={{display:'flex',alignItems:'center',marginRight:'8px'}}><img width="20" height="20" id='img-copy-set'  src='images/Copy.png' onClick={handleCopyLinkModalOpen}></img>{'\u00A0'}</span>
           </div>
           <div className='account-mail'  onClick={handleUsernameModalOpen}>
           <div className='account-in'>
           <div className='img-bg-set'>
           <img width="20" height="20" src="https://img.icons8.com/windows/96/user-male-circle.png" alt="user-male-circle"/>
           </div>
           <h6>{t("Change Username")}</h6>
           </div>
           <img width="20" height="20" id='next-set' src="https://img.icons8.com/ios-glyphs/96/forward.png" alt="forward"/>
           </div>
           <div className='account-mail' onClick={handlePasswordModalOpen}>
           <div className='account-in'>
           <div className='img-bg-set'>
           <img width="20" height="20" src="https://img.icons8.com/windows/96/change-user-male--v1.png" alt="change-user-male--v1"/>
           </div>
           <h6>{t("Change Password")}</h6>
           </div>
           <img width="20" height="20" id='next-set' src="https://img.icons8.com/ios-glyphs/96/forward.png" alt="forward"/>
           </div>
           <div className='account-mail'  onClick={handleOpen}>
           <div className='account-in' >
           <div className='img-bg-set'>
           <img width="15" height="15" src="https://img.icons8.com/fluency-systems-regular/96/language-skill.png" alt="language-skill"/>
           </div>
           <h6>{t("Change Language")}</h6>
           </div>
          <span style={{display:'flex',justifyContent:'center',alignItems:"center"}}> <img src={selectedLanguage.flag} style={{width:'20px',height:'20px'}}/>{'\u00A0'}
           <img width="20" height="20" id='next-set' src="https://img.icons8.com/ios-glyphs/96/forward.png" alt="forward"/></span>

           </div>
           <div className='account-mail' onClick={handleDeleteButtonClick}>
           <div className='account-in'>
           <div className='img-bg-set'>
           <img width="20" height="20" src="https://img.icons8.com/dotty/96/filled-trash.png" alt="filled-trash"/>
           </div>
           <h6>{t("Delete Account")}</h6>
           </div>
           <img width="20" height="20" id='next-set' src="https://img.icons8.com/ios-glyphs/96/forward.png" alt="forward"/>
           </div>
          </div>
        )}
      </div>
      <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
  >
      <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '260',
          bgcolor: 'background.paper',
          borderRadius:'20PX',
          boxShadow: 24,
          p: 4,
      }}>
      <div className='change-username-popup'>
      <h2>{t("Change Email")}</h2>
    
      <div className='new-username'>
      <h4 style={{width:'100%'}}>{t("New Email")}</h4>
      <input  
        value={newEmail} 
        onChange={(e) => emailChangetextFieldOnChange(e)} 
        style={{
          border:'1px solid',
          borderRadius:'10px',
          display:'flex',
          alignItems:'center',
          width:'90%',
          marginTop:'5px',
        }} 
        type='text' 
        name='Username' 
        placeholder={t("Enter New Email")}
      />
    </div>
    <div style={{marginTop:'15px',display:'flex',width:'50%',}}>
      <Button style={{height:'40px'}} onClick={closeModal}>{t("Close")}</Button>{'\u00A0'}
      <Button style={{height:'40px'}} onClick={() => updateEmail(newEmail)}>{t("Update")}</Button>
    </div>
    </div>
      </Box>
  </Modal>
      <div className={`other-div ${isDropdownOpen ? 'expanded' : ''}`}>
      <div className='setting-f-fiv'>
      <span style={{display:'flex', alignItems:'center', justifyContent:'flex-start',width:'90%'}}><img width="20" height="20" src="https://img.icons8.com/ios/96/laptop-play-video--v1.png" alt="laptop-play-video--v1"/>
      {'\u00A0'} <h4>{t("How to activate your profile")}</h4></span>
      <img width="15" height="15" id='next-set' style={{marginRight:'0px'}} src="https://img.icons8.com/ios-glyphs/96/forward.png" alt="forward"/>
      </div>
      </div>
      <div className={`other-div ${isDropdownOpen ? 'expanded' : ''}`}>
      <div className='setting-f-fiv'>
      <span style={{display:'flex', alignItems:'center', justifyContent:'flex-start',width:'90%'}}><img width="20" height="20" src="https://img.icons8.com/ios/96/shopping-cart--v1.png" alt="shopping-cart--v1"/>
      {'\u00A0'}<h4 id='shopsign1'>{t("Shop Now")}</h4></span>
      <img width="15" height="15" id='next-set' style={{marginRight:'0px'}} src="https://img.icons8.com/ios-glyphs/96/forward.png" alt="forward"/>
      </div>
      </div>
      <div className={`other-div ${isDropdownOpen ? 'expanded' : ''}`}>
      <Link to='#'><div className='setting-f-fiv' onClick={handleLogoutButtonClick}>
      <span style={{display:'flex', alignItems:'center', justifyContent:'flex-start',width:'90%'}}>  <img width="20" height="20" src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/96/external-sign-out-video-interface-inkubators-detailed-outline-inkubators.png" alt="external-sign-out-video-interface-inkubators-detailed-outline-inkubators"/>
      {'\u00A0'}<h4 id='shopsign1'>{t("Log Out")}</h4></span>
      <img width="15" height="15" id='next-set' style={{marginRight:'0px'}} src="https://img.icons8.com/ios-glyphs/96/forward.png" alt="forward"/>
      </div></Link>
      {isLogoutModalOpen && (
        <Logoutpopup isOpen={isLogoutModalOpen} handleClose={() => setLogoutModalOpen(false)} />
      )}
       {isDeleteModalOpen && (
        <DeleteUser isOpen={isDeleteModalOpen} handleClose={() => setDeleteModalOpen(false)} />
      )}
      </div>
       <div className={` ${isDropdownOpen ? 'expanded' : ''}`} style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"5px"}}> 
      <div className='setting-f-fiv' style={{width:"100%"}}>
      <span style={{display:'flex', alignItems:'center', justifyContent:'center',width:'100%'}}>
      {'\u00A0'}<h4 id='shopsign'>{t("Version")} : 450.0.0.42.110</h4></span>
      
      </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Modal
      open={isLanguageModalOpen}
      onClose={handleLanguageModalClose}
      aria-labelledby="language-modal-title"
      aria-describedby="language-modal-description"
    >
      {/* Render the ModalPopup component */}
      <ModalPopup
        open={isLanguageModalOpen}
        handleClose={handleLanguageModalClose}
        handleLanguageSelect={(selectedLanguage) => {
          console.log("Selected Language:", selectedLanguage);
          // Implement logic to handle selected language
        }}
      />
    </Modal>
      {isChangepasswordModalOpen && (
        <Passwordpopup isOpen={isChangepasswordModalOpen} handleClose={() => setChangepasswordModalOpen(false)} />
      )}
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
         <h2>{t("Change Username")}</h2>
         <div className='current-username'>
         <h3>{t("Current Username")}</h3>
         <p>{ourInfo.userName}</p>
         </div>
         <div className='new-username'>
         <h4>{t("New Username")}</h4>
         <input  value={ourInfo.userName} onChange={(e)=>setOurInfo({...ourInfo,userName:e.target.value})} style={{border:'1px solid',borderRadius:'10px',display:'flex',alignItems:'center',width:'75%',marginTop:'5px'}} type='text' name='Username' placeholder='Enter New Username'/>
         </div>
         <Button style={{fontSize:'16px'}} onClick={updateUsername} >{t("Update")}</Button>
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
          <h2>{t("Change Password")}</h2>
          <div className='new-username'>
          <h4>{t("Email")}</h4>
          <span style={{border:'1px solid',borderRadius:'10px',display:'flex',alignItems:'center',width:'80%',marginTop:'5px'}}><input style={{outline:'none',border:'none'}} type='text' name='Username' placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
           </span>
          </div>
          <Button style={{fontSize:'16px'}} onClick={() => updatePassword(email)}>{t("Sent on Email")}</Button>
          </div>
          <br></br>
        </Box>
      </Modal>
      {isChangeusernameModalOpen && (
        <Usernamepopup isOpen={isChangeusernameModalOpen} handleClose={() => setChangeusernameModalOpen(false)} />
      )}
      
      <Footer/>
    </div>
    </div>
    <ToastContainer
      position="top-center"
      reverseOrder={false}
    />
    <CopyLinkModal isOpen={isCopyLinkModalOpen} handleClose={handleCopyLinkModalClose} />
    </>
  );
};

export default Setting;
