import React, { useState,useEffect, useContext, useRef } from 'react';
import './Login.css';
import { Link, useParams} from 'react-router-dom';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Defaultallprofile from './Defaultallprofile';
import { AiOutlineEdit } from "react-icons/ai";
import { equalTo, get, onValue, orderByChild, query, ref, set } from 'firebase/database';
import { db } from './firebaseConfig';
import EditGroupModal from './EditGroupModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddedgroupUser from './AddedgroupUser';
import prfl from './images/Group 661.png'
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
import { GrSubtractCircle } from "react-icons/gr";
import { LuPlusCircle } from "react-icons/lu";
import Cropper from './Cropper';
export default function Singlegroup1() {
  const [openModal, setOpenModal] = useState(false);
  const [openModall, setOpenModall] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { id } = useParams();
  const [members,setMembers] =useState();
  const[singlegroup,setsinglegroup]=useState([])
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [addUsers, setaddUsers] = useState([]);
  const parentidUser = localStorage.getItem("parentid");
  let [cropModal, setcropModal] = useState(false);
  const profileInputRef = useRef(null);
  const currentUser = localStorage.getItem("useruid");
  let [myprflimg, setmyprflimg] = useState(null);
  const [showProfileUpload, setShowProfileUpload] = useState(true);
  let [cropPrfl, setCropPrfl] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });
  //cover img
  let [cropModal1, setcropModal1] = useState(false);
  let [myprflimg1, setmyprflimg1] = useState(null);
  let [cropPrfl1, setCropPrfl1] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });
  //logo
  let [cropModal12, setcropModal12] = useState(false);
  let [myprflimg12, setmyprflimg12] = useState(null);
  let [cropPrfl12, setCropPrfl12] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });
  const { t } = useTranslation();
const { language } = useContext(LanguageContext); 
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
  useEffect(() => {
   const starCountRef = query(
     ref(db, "/contacts"),
     orderByChild("userId"),
     equalTo(currentUser)
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
let[groupimage,setgroupimage]= useState("")
  useEffect(() => {
    let getdata = async () => {
    const starCountRef = ref(db,`groups/${id}`);
    onValue(starCountRef, async (snapshot) => {
    let fetchdata = await snapshot.val();
    console.log(fetchdata)
    setsinglegroup(fetchdata);
    setgroupimage(fetchdata.groupImage);
    });
    };
    getdata();
  },[])

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
  const handleOpenEdit = () => {
    setIsEditModalOpen(true);
  };
  const handleLinkMediaModalopen = (linkData, id, currentMembers) => {
    const newMember = { name: linkData.name, linkId: linkData.linkId, profile: linkData.profile,jobtitle:linkData.jobtitle,company:linkData.company,date:linkData.date,userId:linkData.userId,phone:linkData.phone,email:linkData.email,bio:linkData.bio };
  
    // Check if the member already exists locally
    const isMemberAlreadyAdded = currentMembers && currentMembers.some(member => member.linkId === linkData.linkId);
  
    if (isMemberAlreadyAdded) {
      toast.warning(t("This member is already added."));
      return;
    }
  
    // Check if the member ID already exists in the Firebase database
    const groupMembersRef = ref(db, `groups/${id}/members/${linkData.linkId}`);
    get(groupMembersRef)
      .then((snapshot) => {
        const firebaseMember = snapshot.val();
        if (firebaseMember) {
          // Member already exists in the database, show an alert
          toast.warning(t("This member is already added."));
        } else {
          // Member doesn't exist in the database, add it
          const updatedMembers = currentMembers ? [...currentMembers, newMember] : [newMember];
          set(ref(db, `groups/${id}/members/${linkData.linkId}`), newMember)
            .then(() => {
              // Update local state only after the Firebase update operation succeeds
              setMembers(updatedMembers);
             
              toast.success(t("Add Member Successfully!"));
            })
            .catch((error) => {
              console.error('Error adding member: ', error);
              toast.error("Failed to add member");
            });
        }
      })
      .catch((error) => {
        console.error('Error checking member in database: ', error);
        toast.error("Failed to check member in database");
      });
  };
  const getSingleChild = () => {
    const starCountRef = ref(db, `groups/${id}/members`)
    onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();
      console.log(data);
      console.log("testing data");
      setMembers(data?.members)
    
      // setmylist(Object.values(data));
      // setfiltered(Object.values(data));
      // updateStarCount(postElement, data);
    });
  };
  console.log(members)
  useEffect(() => {
    getSingleChild()
   
  }, []);
  function truncateText(text, maxLength) {
    if (text?.length <= maxLength) {
      return text;
    } else {
      return text?.slice(0, maxLength) + '...';
    }
  }
  const isUserAdded = (userId) => {
    return addUsers && addUsers.some(user => user.linkId=== userId);
  };
  const [profile, setProfile] = useState('');
  const [key, setKey] = useState('');
  let handlePrflImageChange = (event) => {
    // profileImage
    setProfile("");
    const { files } = event.target;
  
    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setProfile(reader.result);
        setKey(key+1)
        // dispatch(setProfileImg(reader.result))
        setcropModal(true);
      });
    } else {
      // If no file selected (e.g., user canceled cropping), clear the input field
      event.target.value = null;
    }
  };
  const handleclosecropper =()=>{

    setcropModal(false)
    setcropModal1(false)
    setcropModal12(false)
   }
   const handleProfileLuPlusCircleClick = () => {
    profileInputRef.current.click();
  };
  
  const handleProfileDelete = () => {
    setgroupimage("");
    setShowProfileUpload(true);
    setShowProfileDelete(false);
  };

  return (
    <> 
    <Cropper
        cropModal={cropModal}
        handleclosecropper={handleclosecropper}
        theimg={profile}
        myimg={myprflimg}
        setmyimg={setmyprflimg}
        setcrop={setCropPrfl}
        crop={cropPrfl}
        aspect={1 / 1}
        setReduxState={setgroupimage}
        isCircle={true}
        isgroup={true}
      />
     <div className='single-group-js'>
    <div className='main-grp-page'>
    <Link to="/grouplist">
    <div className="back-Div">
      <img
       id='back-div-icon'
        src="https://img.icons8.com/ios-glyphs/96/back.png"
        alt="back"
      />
    </div>
    </Link>
    <div className='web-icon-page'>
   <p id='group-44q'>{t("Group")}</p>
    </div>
    <div></div>
    </div>
    <div className='' style={{ position: 'relative' }}>
      <img  width={130} style={{borderRadius:"50%"}} src={groupimage ? groupimage : prfl } alt="Profile" />
            {showProfileUpload && (
              <label htmlFor="profileUploadInput" className='profileEdit' style={{ position: 'absolute' }}>
                <input key={key} id="profileUploadInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePrflImageChange} ref={profileInputRef} />
               
              </label>
            )}
            
            {groupimage ? (
              <AiOutlineEdit
                style={{
                  position: 'absolute',
                  left: '96px',
                  top: '10px',
                  fontSize: '20px',
                  color: 'red',
                  cursor: 'pointer',
                  background: 'white',
                  borderRadius: '50%'
                }}
                onClick={handleProfileLuPlusCircleClick}
              />
            ) : (
              <LuPlusCircle
                style={{
                  position: 'absolute',
                  left: '96px',
                  top: '10px',
                  fontSize: '20px',
                  color: '#726f6f',
                  cursor: 'pointer',
                  background: 'white',
                  borderRadius: '50%'
                }}
                onClick={handleProfileLuPlusCircleClick}
              />
            )}
          </div>
    <h1 style={{display:'flex',alignItems:'center',wordBreak:"break-word"}}>{truncateText(singlegroup.fullname,15)}{'\u00A0'}<AiOutlineEdit style={{fontSize:'25px'}} onClick={handleOpenEdit} /></h1>
    <EditGroupModal
    isEditModalOpen={isEditModalOpen}
    setIsEditModalOpen={setIsEditModalOpen}
  />
    <div className="heading-container" id='hedding-line-width'>
    <div className="line"></div>
    <h1 className="centered-heading" id='line-hed'>{t("All Members")}</h1>
    <div className="line"></div>
    </div>
    <div className='create-group' onClick={handleOpenModal}>
    <img  src="https://img.icons8.com/android/96/plus.png" alt="plus"/>
    <h1>{t("Add Members")}</h1>
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
      <h1 className='select-profile-text' id='add-mem'>{t("Choose Member")}</h1>
        {filteredUsers.map((profile) => (
          <div key={profile.id} className='default-profile'>
            <img style={{borderRadius:'50%'}} src={profile.userprofileImageURL?profile.userprofileImageURL:prfl} alt={`profile-${profile.id}`} />
            <div className='default-profile-hedding'>
              <h1>{truncateText(profile.fullname,10)}</h1>
              <h3 id='icon-heds-3'>{truncateText(profile.jobtitle,20)}</h3>
            </div>
            <div className='more-btn23' onClick={() => handleLinkMediaModalopen({ name: profile.fullname, linkId: profile.id,profile:profile.userprofileImageURL,bio:profile.bio,company:profile.company,date:profile.date,email:profile.email,jobtitle:profile.jobtitle,location:profile.location,phone:profile.phone,userId:profile.userId }, id,members)}>
              <p id='more-vv'>{isUserAdded(profile.id) ? t("Added") : t("Add")}</p>
              {isUserAdded(profile.id) ? "":
              <img id='add-img5' src="https://img.icons8.com/android/96/FFFFFF/plus.png" alt="plus"/>}
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
      <img width="50" height="50" src="https://img.icons8.com/ios-glyphs/96/checked--v1.png" alt="checked--v1"/>
            <h1>{t("Add Member Successfully!")}</h1>
            <div className="select-btn">
              <button onClick={handleCloseModall}>{t("OK")}</button>
            </div>
          </div>
    </Box>
  </Modal>
  
  <AddedgroupUser/>

  <br></br>
    </div>

    <ToastContainer
    position="top-center"
    reverseOrder={false}
  />
    </>
  )
}
