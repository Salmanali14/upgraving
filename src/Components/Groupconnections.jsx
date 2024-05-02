import React, { useState,useEffect,useRef, useContext } from 'react';
import { Modal, Box, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Login.css';
import Footer from './Footer';
import { Link, useParams } from 'react-router-dom';
import { CiGrid41 } from "react-icons/ci";
import { BsListCheck } from "react-icons/bs";
import DeleteUser from './Deleteuser';
import Moredropdwon from './Moredropdwon';
import { IoIosMore } from "react-icons/io";

import GroupdeletePopup from './GroupdeletePopup';
import GroupmoreMenu from './GroupmoreMenu';
import { storage,  } from './firebaseConfig';
import { uploadString , ref as sRef,getDownloadURL} from 'firebase/storage';
import { update , ref,push,onValue,query,orderByChild,equalTo } from 'firebase/database';
import {db} from './firebaseConfig';
import { Groups } from '@mui/icons-material';
import prfl from './images/Group 661.png'
import { GrSubtractCircle } from "react-icons/gr";
import { LuPlusCircle } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cropper from './Cropper';
import Singlegroup from './Singlegroup';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
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
export default function Groupconnections() {
  const [isLinkMediaModalOpenw, setLinkMediaModalOpenw] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');
  const [ourInfo, setOurInfo] = useState({ fullname: '', location: '', jobtitle: '', company: '', bio: '' });
  const [coverImage, setCoverImage] = useState('');
  const [logoImage, setLogoImage] = useState('');
  const [showProfileUpload, setShowProfileUpload] = useState(true);
  const profileInputRef = useRef(null);
  const [groupImage, setProfileImage] = useState('');
  const [group,setGroup] = useState({ fullname: '',groupImage:'',members:""});
const [color,setColor]=useState("")
const [filteredUsers, setFilteredUsers] = useState([]);
const [userid,setUserid] = useState();
const parentidUser = localStorage.getItem("parentid");
const [profile, setProfile] = useState('');
const currentUser = localStorage.getItem("useruid");
const {id} =useParams();
const { t } = useTranslation();
const { language } = useContext(LanguageContext);  
useEffect(() => {
 const starCountRef = query(
   ref(db, "/groups"),
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



  const getSingleChild = () => {
    const starCountRef = ref(db, `user/${currentUser}`)

    onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();
      console.log(data);
      console.log("testing data");
      setOurInfo({fullname:data.fullname,location:data.location,jobtitle:data.jobtitle,company:data.company,bio:data.bio,profileImage:data.profileImage,coverImage:data.coverImage,logoImage:data.logoImage})
      setProfileImage(data?.profileImage)
      setCoverImage(data?.coverImage)
      setLogoImage(data?.logoImage)
      setColor(data?.colors)
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
  const handleDeleteButtonClick = () => {
    setDeleteModalOpen(true);
  };

  const handleLinkMediaModalOpenw = () => {
    setLinkMediaModalOpenw(true);
    setProfileImage("")
  };

  const handleLinkMediaModalClosew = () => {
    setLinkMediaModalOpenw(false);
  };
  const [anchorEl23, setAnchorEl] = useState(null);

  const handleOpenMenu2 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu2 = () => {
    setAnchorEl(null);
  };
  const filteredConnections = connectionsData.filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase())
);

const handleProfileDelete = () => {
  setProfileImage("");
  setShowProfileUpload(true);
  setShowProfileDelete(false);
};
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
  }
};

const handleProfileLuPlusCircleClick = () => {
  profileInputRef.current.click();
};
const returnIfHttps = (string) => {
  if (string != "") {
    if (string.slice(0, 4) === "http") {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setGroup(prevState => ({
      ...prevState,
      [name]: value
  }));
};
const handleSubmit = async () => {
  setLinkMediaModalOpenw(false);
  try {
    let downloadURL = '';

    // Check if groupImage is not an HTTPS URL
    if (!returnIfHttps(groupImage)) {
      let uniqueNum = Date.now();
      let name = 'groupimage' + uniqueNum;

      // Upload group image to Firebase Storage
      const storageRef = sRef(storage, name);
      await uploadString(storageRef, groupImage.slice(23), "base64", {
        contentType: "image/png",
      });

      // Get download URL of the uploaded image
      downloadURL = await getDownloadURL(storageRef);
    } else {
      // Use existing group image URL
      downloadURL = groupImage;
    }

    // Save group data in the Firebase Realtime Database
    const groupsRef = ref(db, 'groups');
    const newGroupRef = push(groupsRef);
    const pushKey = newGroupRef.key;

    // Ensure 'members' property is defined
    const groupData = {
      userId: currentUser,
      id: pushKey,
      fullname: group.fullname,
      groupImage: downloadURL,
      members: group.members || {}, // Ensure 'members' is not undefined
      // Add other group information as needed
    };

    // Update group information
    update(newGroupRef, groupData);

    // Success message
    toast.success(t("Group added successfully!"));

    // Clear group data after adding
    setGroup({ fullname: '', groupImage: "" });
  
  } catch (error) {
    // Error handling
    console.error("Error adding group:", error);
    toast.error("Add group name for creating group.");
  }
};








let [cropModal, setcropModal] = useState(false);


let [myprflimg, setmyprflimg] = useState(null);
let [cropPrfl, setCropPrfl] = useState({
unit: "%",
x: 50,
y: 50,
width: 25,
height: 25,
});
const handleclosecropper =()=>{
setcropModal(false)

}
const [searchResults, setSearchResults] = useState([]);

useEffect(() => {
  if (searchQuery.trim() === '') {
      // If searchQuery is empty, show all filteredUsers
      setSearchResults(filteredUsers);
  } else {
      // If searchQuery is not empty, filter filteredUsers based on searchQuery
      const filteredResults = filteredUsers.filter(user => {
          // Customize this condition according to your user structure and search requirements
          return user.fullname.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setSearchResults(filteredResults);
  }
}, [searchQuery, filteredUsers]);
function truncateText(text, maxLength) {
  if (text?.length <= maxLength) {
    return text;
  } else {
    return text?.slice(0, maxLength) + '...';
  }
}
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
    setReduxState={setProfileImage}
    isCircle={true}
  />
    <div className='Connections' style={{backgroundColor:color}}>
    <h1 id='con-hed-main'>{t("Connections")}</h1>
    <div className='search-con'>
    <img width="20" height="20" src="https://img.icons8.com/ios/96/search.png" alt="search"/>
    <input
    type='text'
    name='Search'
    placeholder={t("Search")}
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
/>
    </div>
    <div className='connection-btn'>
    <Link to='/connections'>
    <button id='group-btn1'><p style={{marginRight:"29px"}}>{t("People")}</p></button></Link>
    <Link to='/groupconnections'>
    <button id='peo-btn1'>{t("Groups")}</button>
    </Link>
    </div>
    <div className='connection-hed'>
    <h1> {t("Add Connections")}</h1>
    <p>{t("Develop your network by meeting new individuals and having them click the exchange contact button on your profile.")}</p>
    </div>
    <div className="heading-container" id='hedding-line-width'>
    <div className="line"></div>
    <h1 className="centered-heading" id='line-hed'>{t("All Groups")}</h1>
    <div className="line"></div>
    </div>
    <div className='create-group' onClick={handleLinkMediaModalOpenw} >
    <img  src="https://img.icons8.com/android/96/plus.png" alt="plus"/>
    <h1>{t("Create Group")}</h1>
    </div>
    <div className='grid' style={{marginTop:'10px'}}>
    <div className='connection-btn44'>
     <Link to='/groupconnections'>
     <button id='peo-btn51'><CiGrid41 /> {'\u00A0'}{t("Grid")}</button></Link>
     <Link to='/grouplist'>
     <button id='group-btn51'>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}<BsListCheck />{'\u00A0'}{t("List")}</button>
     </Link>
     </div>
    </div>
    <div className='people-connection'>
    {searchResults.length === 0 ? (
      <p style={{display:"flex",justifyContent:"center",width:"100%"}}>{t("No results found")}</p>
  ) : (
    searchResults
    .slice() // Create a copy of searchResults array
    .sort((a, b) => a.fullname.localeCompare(b.fullname)) // Sort alphabetically by fullname
    .map((connection, index) => (
        <div key={index} className='single-con'>
          <Link to={`/singlegroup/${connection.id}`}>
            <div className='group-color'>
              <img src={connection.groupImage ? connection.groupImage : prfl} alt={`Group ${index + 1}`} />
            </div>
          </Link>
  
          <div className='single-con-about'>
            <Link to={`/singlegroup/${connection.id}`}>
              <h2 id='icon-group-2'>{truncateText(connection.fullname,10)}</h2>
            </Link>
            <div className='single-con-btn'>
              <Link to={`/singlegroup/${connection.id}`}>
                <button id='more-con-btns-0'>{t("Open")}</button>
              </Link>
              <div onClick={()=>setUserid(connection?.id)}>
              <div className='more-btn more-con-btns-1' onClick={handleOpenMenu2}>
                <p id='more-con-txt-1' style={{ margin: '0px' }} onClick={()=>setUserid(connection?.id)}>{t("More")}<IoIosMore   style={{ fontSize: '7px', marginLeft:"2px" }} /></p>
              </div></div>
              <GroupmoreMenu anchorEl23={anchorEl23} handleCloseMenu={handleCloseMenu2} userid={userid} filteredUsers={filteredUsers} setFilteredUsers={setFilteredUsers}  />
              </div>
              </div>
          </div>
      ))
  )}
    
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
            <h1>{t("Create Group")}</h1>
            <div className='profileDiv25'>
      
          <div className='profileEdit25' position absoulte>
          <img src={groupImage ? groupImage : prfl } alt="Profile" />
            {showProfileUpload && (
              <label htmlFor="profileUploadInput" className='profileEdit' style={{ position: 'absolute' }}>
                <input key={key} id="profileUploadInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePrflImageChange} ref={profileInputRef} />
               
              </label>
            )}
            
            {groupImage ? (
              <GrSubtractCircle
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
                onClick={handleProfileDelete}
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
        </div>
        <input type='text' name='fullname' placeholder={t("Full Name")} value={group.fullname} onChange={handleInputChange} />
        <Button onClick={handleSubmit}>{t("Create Group")}</Button>
          </div>
          <br></br>
        </Box>
      </Modal>
      {isDeleteModalOpen && (
        <GroupdeletePopup isOpen={isDeleteModalOpen} handleClose={() => setDeleteModalOpen(false)} userid={userid} />
      )}
   
  <Footer/>
      </div>
      <ToastContainer
      position="top-center"
      reverseOrder={false}
    />
      </>
  )
}
