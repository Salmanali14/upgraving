import React, { useState,useRef,useEffect, useContext, useCallback } from 'react';
import { Modal, Box, IconButton, colors, Radio } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Login.css';
import Footer from './Footer';
import DarkModeToggle from './DarkModeToggle';
import CopyLinkModal from './CopyLinkModal';
import Switchtoggle from './Switchtoggle';
import { GrSubtractCircle } from "react-icons/gr";
import { LuPlusCircle } from "react-icons/lu";
import { FaCircleInfo } from "react-icons/fa6";
import { width } from '@mui/system';
import Cropper from './Cropper';
import { storage  } from './firebaseConfig';
import { uploadString , ref as sRef,getDownloadURL} from 'firebase/storage';
import { update , ref,push,onValue,query,orderByChild,equalTo, set,child ,get} from 'firebase/database';
import {db} from './firebaseConfig';
import firebase from 'firebase/compat/app';
import prfl from './images/Group 661.png'
import cover from './images/Group 659.png'
import logo from './images/Group 663.png'
import insta from './images/instagram.png'
import theme1 from './images/theme1.png'
import theme2 from './images/theme2.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
 function EditProfile() {
  const [isAddLinkModalOpen, setAddLinkModalOpen] = useState(false);
  const [isLinkMediaModalOpen, setLinkMediaModalOpen] = useState(false);
  const [isCopyLinkModalOpen, setCopyLinkModalOpen] = useState(false);
  const [clickedLink, setClickedLink] = useState(null);
  const [isLinkInfoVisible, setLinkInfoVisible] = useState(true); 
  const [value, setValue] =useState();
  const [color, setColor] = useState('#ffffff');
  let [cropModal, setcropModal] = useState(false);
  const linkRegex = /^(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$|^(?:\d{10,12})$|^(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-?=%.]+$/;
  const [isValidInput, setIsValidInput] = useState(true); // State to track input validity

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);

    // Check if the input matches the link regex pattern
    const isValid = linkRegex.test(value);
    setIsValidInput(isValid);
  };
  let [myprflimg, setmyprflimg] = useState(null);
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
  //save form
  const currentUser = localStorage.getItem("useruid");
 const handleclosecropper =()=>{

  setcropModal(false)
  setcropModal1(false)
  setcropModal12(false)
 }
  const handleToggleLinkInfo = () => {
    setLinkInfoVisible(!isLinkInfoVisible);
  };

 
  const handleLinkMediaModalOpen2 = (link) => {
    setClickedLink(link);
    setLinkMediaModalOpen(true);
    setLinkInfoVisible(isLinkInfoVisible);
  };
  let addExistingLink=(linkId)=>{
let theLink=selectlinks?.find((elm)=>{
return elm?.linkId===linkId
})
// if(theLink){
//   setValue(theLink?.value)
// }
return theLink
  }
  const handleLinkMediaModalClose2 = () => {
    setClickedLink(null);
    setLinkMediaModalOpen(false); // Close the modal
  };
  const handleCopyLinkModalOpen = async () => {
    try {
        await navigator.clipboard.writeText(previewURL); // Copy profile link to clipboard
        toast.success(t("Profile link is copied") )// Open copy link modal
    } catch (error) {
        console.error('Failed to copy: ', error);
    }
};
  
  const handleCopyLinkModalClose = () => {
    setCopyLinkModalOpen(false);
  };
  
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


  const [coverImage, setCoverImage] = useState('');
  const [showUpload, setShowUpload] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState('');
  
  const [showProfileUpload, setShowProfileUpload] = useState(true);
  const [showProfileDelete, setShowProfileDelete] = useState(false);
  const profileInputRef = useRef(null);
  const [logoImage, setLogoImage] = useState('');
  const [showLogoUpload, setShowLogoUpload] = useState(true);
  const [showLogoDelete, setShowLogoDelete] = useState(false);
  const logoInputRef = useRef(null);
  const [links, setlinks] = useState();
  const [darkmode, setDarkmode] = useState();
  const [ourInfo, setOurInfo] = useState({ fullname: '', location: '', jobtitle: '', company: '', bio: '',phone:'' });
  const history = useNavigate();
  const [profilelockmode, setProfilelockmode] = useState(false);
  const toggleOnlineStatus = useCallback(() => {
    // Toggle the directmode state first
   
    setProfilelockmode(prevProfilelockmode => !prevProfilelockmode);
  
    try {
      // Now use the updated directmode state to save to Firebase
      const userRef = ref(db, `user/${currentUser}`);
       update(userRef, { profilelockmode: !profilelockmode }); // Use !directmode here
       if (!profilelockmode) {
        toast.success(t("Profile locked is enable"));
      } else {
        toast.info(t("Profile locked is disable"));
      }
    } catch (error) {
      console.error("Error saving profilelockmode to Firebase: ", error);
    }
  }, [profilelockmode]);

  
  /////copylink url//////
const [profileLink, setProfileLink] = useState('');

const { t } = useTranslation();
const { language } = useContext(LanguageContext);    

const baseURL = window.location.origin;
const previewURL = `${baseURL}/prevprofile/${localStorage.getItem('useruid')}`;
console.log(previewURL);
const handleCopyLink = () => {
  // Copy the previewURL to the clipboard
  navigator.clipboard.writeText(previewURL)
    .then(() => {

    })
    .catch((error) => {
      console.error('Error copying link to clipboard:', error);
    });
};
useEffect(() => {

    // Ensure profileId exists before setting the profileLink
    if (currentUser) {
        setProfileLink(`http://localhost:5173/${currentUser}`);
    } else {
        // Handle case when profileId is undefined
        setProfileLink('Profile ID not found');
    }
}, [currentUser]);
///////
  /////body color////


  // Function to change body color


  const saveColorToFirebase = async (currentUser, colors) => {
    try {
      if (colors) { 
        const userRef = ref(db, `user/${currentUser}`);
        await update(userRef, { colors: color }); 
        
        console.log("Color saved to Firebase");
      } else {
        console.error("Color is undefined");
      }
    } catch (error) {
      console.error("Error saving color to Firebase: ", error);
    }
  };

  const getColorFromFirebase = async (currentUser) => {
    try {
      const snapshot = await get(ref(db, `user/${currentUser}/colors`));

      if (snapshot.exists()) {
        const colorData = snapshot.val();
        
        // Set the color state with the retrieved color from Firebase
        setColor(colorData);
        // Apply the retrieved color to the body
        changeBodyColor('screen', colorData);
      } else {
        console.log("No color data available");
      }
    } catch (error) {
      console.error("Error getting color from Firebase: ", error);
    }
  };

  useEffect(() => {
   
    getColorFromFirebase(currentUser);
  }, []); 


  const handleColorChange = (color) => {


        changeBodyColor('screen', color);
        setColor(color);
    

};

const changeBodyColor = (className, color) => {
    const element = document.querySelector(`.${className}`);
    if (element) {
        element.style.backgroundColor = color;
    }
};

  ////////
////////icon blue tick////





//////////end/////

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setCoverImage(reader.result);
      setShowUpload(false);
      setShowDelete(true);
    };
  
    if (file) {
      reader.readAsDataURL(file);
      const fileName = file.name; 
      await uploadImageToStorage(file, 'cover_images', fileName); 
    }
  };
  //////////////upload image//////////////////////
  const uploadImageToStorage = async (file, folderName, fileName) => {
    try {
      console.log(fileName); 
      const storageRef = sRef(storage, `${folderName}/${fileName}`); 
      await uploadString(storageRef, file, 'data_url');
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image to storage:', error);
      return null;
    }
  };
  


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setTimeout(() => {
      history("/home");
    }, 2000);
    try {

      const userRef = ref(db, `user/${currentUser}/`);
      await update(userRef, { theme }); 
  
    await saveColorToFirebase(currentUser, colors); 
    changeBodyColor('screen', color); 

    // Additional code for uploading images to Firebase and updating user data
  } catch (error) {
    console.error('Error handling form submission:', error);
  }

    // if (profileImage !== '') {
    //   const profileImage = await uploadImageToStorage(profileImage, 'profile_images');
    //   updatedUserData = {
    //     ...updatedUserData,
    //     profileImage: profileImage,
    //   };
    // }
    // if (coverImage !== '') {
    //   const coverImageURL = await uploadImageToStorage(coverImage, 'cover_images');
    //   updatedUserData = {
    //     ...updatedUserData,
    //     coverImage: coverImageURL,
    //   };
    // }
  
    // Check if logoImage is not empty and add it to the update object
    // if (logoImage !== '') {
    //   const logoImageURL = await uploadImageToStorage(logoImage, 'logo_images');
    //   updatedUserData = {
    //     ...updatedUserData,
    //     logoImage: logoImageURL,
    //   };
    // }

  
    // Upload images to Firebase Storage
    // const profileImageURL = await uploadImageToStorage(profileImage, 'profile_images');
    // const coverImageURL = await uploadImageToStorage(coverImage, 'cover_images');
    // const logoImageURL = await uploadImageToStorage(logoImage, 'logo_images');
  
    // Update user data in Realtime Database with image URLs
    let returnIfHttps = (string) => {
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
  
    update(ref(db, `user/${currentUser}`), {
      ...ourInfo,
      profileImage:profileImage,
      coverImage:coverImage,
      logoImage:logoImage,
    }).then(() => {
      // Handle success
      if (returnIfHttps(profileImage) === false) {
        let name = 'profileimg' + currentUser;
        const storageRef = sRef(storage, name);
        uploadString(storageRef, profileImage.slice(23), "base64", {
          contentType: "image/png",
        })
          .then(() => {
            console.log("img testing");
            getDownloadURL(storageRef)
              .then((URL) => {
                // console.log(URL)
                update(ref(db, `user/${currentUser}`), { profileImage: URL });
                setProfileImage("");
                // window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
            // setimg(null)
          })
          .catch((error) => {
            console.log(error);
          });
       
      }
      if (returnIfHttps(coverImage) === false) {
        let namee = 'coverimg' + currentUser;
        const storageRef1 = sRef(storage, namee);
        uploadString(storageRef1, coverImage.slice(23), "base64", {
          contentType: "image/png",
        })
          .then(() => {
            console.log("img testing");
            getDownloadURL(storageRef1)
              .then((URL) => {
                // console.log(URL)
                update(ref(db, `user/${currentUser}`), { coverImage: URL });
                setCoverImage("");
                // window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
            // setimg(null)
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (returnIfHttps(logoImage) === false) {
        let namea = 'logoimg' + currentUser;
        const storageRef2 = sRef(storage, namea);
        uploadString(storageRef2, logoImage.slice(23), "base64", {
          contentType: "image/png",
        })
          .then(() => {
            console.log("img testing");
            getDownloadURL(storageRef2)
              .then((URL) => {
                // console.log(URL)
                update(ref(db, `user/${currentUser}`), { logoImage: URL });
                setLogoImage("");
                // window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
            // setimg(null)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }).catch((error) => {
      console.error('Error updating user data:', error);
    });
   
    toast.success(t("Information Changing successfully!"));

  };
 ////////////// end upload image//////////////////////
  const handleLuPlusCircleClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteClick = () => {
    setCoverImage("");
    setShowUpload(true);
    setShowDelete(false);
  };

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
      setShowProfileUpload(false);
      setShowProfileDelete(true);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleProfileDelete = () => {
    setProfileImage("");
    setShowProfileUpload(true);
    setShowProfileDelete(false);
  };


  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setLogoImage(reader.result);
      setShowLogoUpload(false);
      setShowLogoDelete(true);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleLogoDelete = () => {
    setLogoImage("");
    setShowLogoUpload(true);
    setShowLogoDelete(false);
  };

  const handleProfileLuPlusCircleClick = () => {
    profileInputRef.current.click();
  };

  const handleLogoLuPlusCircleClick = () => {
    logoInputRef.current.click();
  };
 // Regular expression pattern for validating email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regular expression pattern for validating contact (phone number)
const contactRegex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]*$/;




// Regular expression pattern for validating username
const usernameRegex = /^.*$/;
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  const handleLinkMediaModalopen = (linkData, currentUser, allLinks) => {
    // Check if the link value is not null or empty
    if (!linkData.value) {
      // Show alert if the link value is null or empty
      toast.error("Please add a link value");
      return; // Exit function if link value is null
    }
  
    // Validate the link value using the linkRegex pattern
    if (linkData.placeholder === "Enter email") {
      // Check if the input value matches the email regex pattern
      if (!emailRegex.test(linkData.value)) {
        // Show alert if the input value is invalid for email
        toast.error(t("Invalid email"));
        return; // Exit function if input value is invalid for email
      }
  
      // Check if "http" or "https" is included in the email
      if (linkData.value.includes("http") || linkData.value.includes("https")) {
        // Show alert if "http" or "https" is included in the email
        toast.error(t("Email cannot contain 'http' or 'https'"));
        return; // Exit function if "http" or "https" is included in the email
      }
    } else if (linkData.placeholder === "Enter phone no") {
      // Check if the input value matches the contact regex pattern
      if (!contactRegex.test(linkData.value)) {
        // Show alert if the input value is invalid for contact
        toast.error(t("Invalid contact"));
        return; // Exit function if input value is invalid for contact
      }
    } else if (linkData.placeholder === "Enter username") {
      // Check if the input value matches the username regex pattern
      if (!usernameRegex.test(linkData.value)) {
        // Show alert if the input value is invalid for username
        toast.error(t("Invalid username"));
        return; // Exit function if input value is invalid for username
      }
    } else if (linkData.placeholder === "Enter url") {
      // Check if the input value matches the URL regex pattern
      if (!urlRegex.test(linkData.value)) {
        // Show alert if the input value is invalid for URL
        toast.error(t("Invalid URL"));
        return; // Exit function if input value is invalid for URL
      }
    }    
  
    // Add link to database if link value is not null
    if (allLinks) {
      set(ref(db, `user/${currentUser}/links/`), [...allLinks, linkData]).then(() => {
        toast.success(t("Link added successfully"));
      });
    } else {
      set(ref(db, `user/${currentUser}/links/`), [linkData]).then(() => {
        toast.success(t("Link added successfully"))
      });
    }

  
  setLinkMediaModalOpen(false); 
  };
  const handleLinkMediaUpdate =  (linkData, currentUser, allLinks) => {
    // if (linkData?.value) {
      if (!linkData.value) {
        // Show alert if the link value is null or empty
        toast.error("Please add a link value");
        return; // Exit function if link value is null
      }
    
      // Validate the link value using the linkRegex pattern
      if (linkData.placeholder === "Enter email") {
        // Check if the input value matches the email regex pattern
        if (!emailRegex.test(linkData.value)) {
          // Show alert if the input value is invalid for email
          toast.error(t("Invalid email"));
          return; // Exit function if input value is invalid for email
        }
    
        // Check if "http" or "https" is included in the email
        if (linkData.value.includes("http") || linkData.value.includes("https")) {
          // Show alert if "http" or "https" is included in the email
          toast.error(t("Email cannot contain 'http' or 'https'"));
          return; // Exit function if "http" or "https" is included in the email
        }
      } else if (linkData.placeholder === "Enter phone no") {
        // Check if the input value matches the contact regex pattern
        if (!contactRegex.test(linkData.value)) {
          // Show alert if the input value is invalid for contact
          toast.error(t("Invalid contact"));
          return; // Exit function if input value is invalid for contact
        }
      } else if (linkData.placeholder === "Enter username") {
        // Check if the input value matches the username regex pattern
        if (!usernameRegex.test(linkData.value)) {
          // Show alert if the input value is invalid for username
          toast.error(t("Invalid username"));
          return; // Exit function if input value is invalid for username
        }
      } else if (linkData.placeholder === "Enter url") {
        // Check if the input value matches the URL regex pattern
        if (!urlRegex.test(linkData.value)) {
          // Show alert if the input value is invalid for URL
          toast.error(t("Invalid URL"));
          return; // Exit function if input value is invalid for URL
        }
      }   
    if (allLinks) {
      let index = allLinks?.findIndex((elm) => {
        return elm?.linkId === linkData?.linkId;
      });
      update(ref(db, `user/${currentUser}/links/${index}`), { ...linkData }).then(() => {
        toast.success("Link updated successfuly");
      });
    }
    // }
    setLinkMediaModalOpen(false);
  };



  const linksSocail = [
    { imgSrc:insta,linkId:1, altname:'Instagram', name:'Instagram' ,instruction:'https://www.instagram.com',placeholder:"Enter username" },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/ffffff/tiktok--v1.png',linkId:2,  altname: 'Tiktok', name: 'Tiktok',instruction:'Add your tiktok account  (https://www.tiktok/ahmad.com)',placeholder:"Enter username" },
    { imgSrc: 'https://img.icons8.com/material-rounded/96/FFFFFF/facebook-f--v1.png',linkId:3,  altname: 'facebook-f', name: 'Facebook',instruction:'Paste your facebook profile link here.(https://www.facebook.com)',placeholder:"Enter url" },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/ffffff/twitterx--v1.png',linkId:4,  altname: 'Twitter', name: 'X',instruction:'Add your twitter id link (e.g. https://www.twitter.com',placeholder:"Enter username" },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/ffffff/linkedin.png',linkId:5,  altname: 'linkedin', name: 'Linkedin',instruction:'Add your linkidn account  (https://www.linkdin.com)',placeholder:"Enter url" },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/FFFFFF/facebook-messenger.png',linkId:6,  altname: 'facebook-messenger', name: 'Messenger',instruction:'Add your messenger account (e.g. https://www.messenger.com)',placeholder:"Enter url" },
    { imgSrc: 'https://img.icons8.com/ios-glyphs/96/FFFFFF/discord-logo.png',linkId:7,  altname: 'discord-logo', name: 'Discord',instruction:'Add your discord account (e.g. https://www.Discord.com)',placeholder:"Enter url" },
   
    { imgSrc: 'https://img.icons8.com/ios-filled/96/ffffff/snapchat--v1.png',linkId:8,  altname: 'snapchat', name: 'Snapchat',instruction:'Add your snpachat account (https://www.snapchat.com)',placeholder:"Enter username" },
  ];
  const linksContact = [
    { imgSrc: 'https://img.icons8.com/fluency-systems-filled/96/FFFFFF/phone-disconnected.png',linkId:9, altname: 'phone-disconnected', name: 'Call',instruction:'Add your phone number including your country code (e.g. +33 743210012)',placeholder:"Enter phone no" },
    { imgSrc: 'https://img.icons8.com/material-rounded/96/FFFFFF/user.png',linkId:10, altname: 'user', name: 'Contact',instruction:'Add your phone number including your country code (e.g. +33 743210012)',placeholder:"Enter phone no" },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/FFFFFF/whatsapp--v1.png',linkId:11, altname: 'whatsapp--v1', name: 'WhatsApp',instruction:'Add your phone number including your country code (e.g. +33 743210012)',placeholder:"Enter phone no" },
    { imgSrc: 'https://img.icons8.com/ios-filled/98/FFFFFF/gmail-new.png',linkId:12, altname: 'gmail-new', name: 'Gmail',instruction:'Add your email (e.g. salmanwork144@gmail.com (e.g. +33 743210012)',placeholder:"Enter email" },
    { imgSrc: 'https://img.icons8.com/material-rounded/96/FFFFFF/new-post.png',linkId:13, altname: 'new-post', name: 'Email',instruction:'Add your email (e.g. salmanwork144@gmail.com (e.g. +33 743210012)',placeholder:"Enter email" },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/ffffff/zoom.png',linkId:14, altname: 'zoom-', name: 'Zoom',instruction:'Add your zoom url ',placeholder:"Enter url" },
    { imgSrc: 'https://img.icons8.com/windows/96/FFFFFF/telegram-app.png',linkId:15, altname: 'telegram-app', name: 'Telegram',instruction:'Add your phone number including your country code (e.g. +33 743210012)',placeholder:"Enter phone no" },
   
    { imgSrc: 'https://img.icons8.com/ios-filled/96/ffffff/skype.png',linkId:16, altname: 'skype', name: 'Skype',instruction:'Add your phone number including your country code (e.g. +33 743210012)',placeholder:"Enter username" },
  ];

  const linksMore = [
    { imgSrc: 'https://img.icons8.com/ios-filled/96/ffffff/google-play.png',linkId:17, altname: 'google-play', name: 'Google Play',instruction:'Add your phone number including your country code (e.g. +33 743210012)',placeholder:"Enter url" },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/ffffff/apple-app-store--v2.png',linkId:18, altname: 'apple-app-store', name: 'Apple Store',instruction:'Add your phone number including your country code (e.g. +33 743210012)',placeholder:"Enter url" },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/ffffff/paypal.png',linkId:19, altname: 'paypal', name: 'Paypal',instruction:'Add your phone number including your country code (e.g. +33 743210012)',placeholder:"Enter url" },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/ffffff/cash-app.png',linkId:20, altname: 'cash-app', name: 'CashApp',instruction:'Add your email (e.g. salmanwork144@gmail.com (e.g. +33 743210012)',placeholder:"Enter url" },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/ffffff/google-logo.png',linkId:21, altname: 'map', name: 'Map',instruction:'Add your email (e.g. salmanwork144@gmail.com (e.g. +33 743210012)',placeholder:"Enter location" },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/ffffff/youtube-squared.png',linkId:22, altname: 'youtube', name: 'Youtube',instruction:'Add your phone number including your country code (e.g. +33 743210012)',placeholder:"Enter url" },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/ffffff/amazon.png',linkId:23, altname: 'amazon', name: 'Amazon',instruction:'Add your phone number including your country code (e.g. +33 743210012)',placeholder:"Enter url" },
   
    { imgSrc: 'https://img.icons8.com/ios-filled/96/FFFFFF/facetime.png',linkId:24, altname: 'facetime', name: 'Facetime',instruction:'Add your phone number including your country code (e.g. +33 743210012)',placeholder:"Enter url" },
  ];
  
  /////////fetch link///////
  const [linkExists, setLinkExists] = useState(false);
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
 const checkLinkExists = (linkId) => {
  return selectlinks.some(link => link.linkId === linkId);
};
let [colorfirebase,setcolorfirebase]=useState("");
console.log(colorfirebase)
///////////tick on link/////
let checkAdded = (linkId) => {
  if (links) {
    let ifAdded = links?.some((elm) => {
      return elm?.linkId === linkId;
    });
    return ifAdded;
  }
};
////end////
//get data from firebase///////////////////////////////////////////////////////////////
const[theme,settheme]=useState("")
  const getSingleChild = () => {
    const starCountRef = ref(db, `user/${currentUser}`)

    onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();
      console.log(data);
      console.log("testing data");
      setOurInfo({fullname:data.fullname,location:data.location,jobtitle:data.jobtitle,company:data.company,bio:data.bio,profileImage:data.profileImage,coverImage:data.coverImage,logoImage:data.logoImage,phone:data.phone})
      setProfileImage(data?.profileImage)
      setCoverImage(data?.coverImage)
      setLogoImage(data?.logoImage)
      setlinks(data?.links)
      setColor(data?.colors)
      setDarkmode(data?.darkmode)
      setProfilelockmode(data?.profilelockmode)
      setcolorfirebase(data?.colors)
      settheme(data?.theme)
      // setmylist(Object.values(data));
      // setfiltered(Object.values(data));
      // updateStarCount(postElement, data);
    });
  };
  useEffect(() => {
    getSingleChild()
   
  }, []);
  // end get data from firebase///////////////////////////////////////////////////////////////
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
  
//code zain//


const [cover1, setcover] = useState('');
  let handleCoverImageChange = (event) => {
    // profileImage
    setcover("");
    const { files } = event.target;

    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setcover(reader.result);
        setKey(key+1)
        // dispatch(setProfileImg(reader.result))

        setcropModal1(true);
      });
    }
  };
  const [logo1, setlogo] = useState('');
  let handleLogoImageChange = (event) => {
    // profileImage
    setlogo("");
    const { files } = event.target;

    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setlogo(reader.result);
        setKey(key+1)
        // dispatch(setProfileImg(reader.result))

        setcropModal12(true);
      });
    }
  };


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
      let returnInstaruction=(linkId)=>{
        if (linkId===1) {
          return t("1");
        }else if (linkId===2){
          return t("2"); }
          else if (linkId===3){
            return t("3");  }else if (linkId===4){
              return t("4");  }else if (linkId===5){
                return t("5");  } else if (linkId===6){
                  return t("6");   }else if (linkId===7){
                    return t("7");   }
                    else if (linkId===8){
                      return t("8");    }
                        else if (linkId===9){
                          return t("9");   }
                            else if (linkId===10){
                              return t("10");  }
                                else if (linkId===11){
                                  return t("11"); 
                                 }
                                    else if (linkId===12){
                                      return t("12");  }
                                        else if (linkId===13){
                                          return t("13");  }else if (linkId===14){
                                            return t("14");   }else if (linkId===15){
                                              return t("15");  }else if (linkId===16){
                                                return t("16");  }else if (linkId===17){
                                                  return t("17");   }else if (linkId===18){
                                                    return t("18");  }else if (linkId===19){
                                                      return t("19");   }else if (linkId===20){
                                                        return t("20");  }else if (linkId===21){
                                                          return t("21");  }else if (linkId===22){
                                                            return t("22");  }else if (linkId===23){
                                                              return t("23");    }else if (linkId===24){
                                                                return t("24");   }
    
          }
          let updateLinks = () => {
            if (selectlinks?.length === 1) {
              setselectlinks([]);
            }
          };
          const removeLink = (linkData, currentUser, allLinks,) => {
            if (allLinks) {
              let remainingLinks = allLinks.filter((elm) => {
                return elm.linkId != linkData.linkId;
              });
          
              set(ref(db, `user/${currentUser}/links/`), remainingLinks).then(() => {
                toast.success(t("Link deleted successfully"));
                setLinkMediaModalOpen(false);
                updateLinks();
              });
            }
          };
          const toggledarkmodStatus = async () => {
            setDarkmode(!darkmode);
              try {
               
                  const userRef = ref(db, `user/${currentUser}`);
                  await update(userRef, { darkmode: darkmode }); 
                  
                  console.log("Leadmode saved to Firebase");
                }
               catch (error) {
                console.error("Error saving leadmode to Firebase: ", error);
              }
            
          };
          function truncateText(text, maxLength) {
            if (text?.length <= maxLength) {
              return text;
            } else {
              return text?.slice(0, maxLength) + '...';
            }
          }
          const handleColorChange1 = () => {


            changeBodyColor('screen', colorfirebase);
            setColor(colorfirebase);
        
    
    };
    const [selectlng, setSelectLng] = useState({});
    useEffect(() => {
      let getData = async () => {
        const starCountRef = ref(db, `user/${currentUser}`);
        onValue(starCountRef, async (snapshot) => {
          let fetchData = await snapshot.val();
          
          setSelectLng(fetchData?.language.toLowerCase());
        });
      };
      getData();
    }, []);
    console.log(selectlng);
    const [selectedValue, setSelectedValue] = useState('a');

  const handleChangetheme = (event) => {
    settheme(event.target.value);
    console.log(event.target.value)
  };

  return (
    <>
  
    <div className='home'>
   
  
   
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
      <Cropper
        cropModal={cropModal1}
        handleclosecropper={handleclosecropper}
        theimg={cover1}
        myimg={myprflimg1}
        setmyimg={setmyprflimg1}
        setcrop={setCropPrfl1}
        crop={cropPrfl1}
        aspect={425 / 250}
        setReduxState={setCoverImage}
        isCircle={false}
      />

      <Cropper
      cropModal={cropModal12}
      handleclosecropper={handleclosecropper}
      theimg={logo1}
      myimg={myprflimg12}
      setmyimg={setmyprflimg12}
      setcrop={setCropPrfl12}
      crop={cropPrfl12}
      aspect={1 / 1}
      setReduxState={setLogoImage}
      isCircle={true}
    />
    <div className='main-hed-page'>
    <Link to="/home">
    <div className="back-Div" onClick={handleColorChange1}>
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
          
        <div className='coverDiv' style={{ position: 'relative' }}>
        <img 
        src={coverImage ? coverImage : cover} 
        alt="Cover" 
        style={{ width: '100%', height: '226px', borderRadius: '23px' }} 
      />
        {showUpload && (
          <label htmlFor="uploadInput" className='coverEdit' style={{ position: 'absolute' }}>
            <input key={key} id="uploadInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCoverImageChange} ref={fileInputRef} />
           
          </label>
        )}
        {coverImage ? (
          <GrSubtractCircle style={{ position: 'absolute', right: '-8px', top: '-3px', fontSize: '25px', color: 'red', cursor: 'pointer',background:'white',borderRadius:'50%' }} onClick={handleDeleteClick} />
          ) : (
          <LuPlusCircle style={{ position: 'absolute', right: '-8px', top: '-3px', fontSize: '25px', color: '726f6f', cursor: 'pointer',background:'white',borderRadius:'50%' }} onClick={handleLuPlusCircleClick} />
        )}
      </div>
      <div>
      <div className='profileDiv' style={{ position: 'relative' }}>
      <img src={profileImage ? profileImage : prfl } alt="Profile" />
            {showProfileUpload && (
              <label htmlFor="profileUploadInput" className='profileEdit' style={{ position: 'absolute' }}>
                <input key={key} id="profileUploadInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePrflImageChange} ref={profileInputRef} />
               
              </label>
            )}
            
            {profileImage ? (
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
          <div className='iconDiv' style={{ position: 'relative' }}>
            <img src={logoImage ? logoImage : logo} alt="Logo" />
            {showLogoUpload && (
              <label htmlFor="logoUploadInput" className='iconEdit' style={{ position: 'absolute' }}>
                <input key={key} id="logoUploadInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoImageChange} ref={logoInputRef} />
               
              </label>
            )}
            {logoImage ? (
              <GrSubtractCircle style={{ position: 'absolute', left: '38px', top: '8px', fontSize: '16px', color: 'red', cursor: 'pointer',background:'white',borderRadius:'50%' }} onClick={handleLogoDelete} />
              ) : (
              <LuPlusCircle style={{ position: 'absolute', left: '38px', top: '8px', fontSize: '16px', color: '726f6f', cursor: 'pointer',background:'white',borderRadius:'50%' }} onClick={handleLogoLuPlusCircleClick} />
            )}
          </div>
</div>
        </div>


       
        <div className='prolink'>
        <div className='prolink1'>
        {'\u00A0'}   <Switchtoggle  toggleOnlineStatus={toggleOnlineStatus} profilelockmode={profilelockmode}  />    
<span className='linktxt2'>{truncateText(previewURL,50)}</span>
    
        <div className='prolink2' onClick={handleCopyLinkModalOpen}>
               <img src='images/Copy.png'></img>
               <p>{t("Copy")}</p>
        </div>
        <CopyLinkModal isOpen={isCopyLinkModalOpen} handleClose={handleCopyLinkModalClose} />
        </div>
        </div>
        <div className='Inputfieldprofile'>
        <h1 id='inputfield-profile'>{t("Personal Detail")}</h1>
        <div className='inputfield'>
        <input type='name' name='fullname'  placeholder={t("Full Name")} value={ourInfo.fullname} onChange={(e)=>setOurInfo({...ourInfo,fullname:e.target.value})}   />
        <input type='name' name='location' placeholder={t("Location")} value={ourInfo.location} onChange={(e)=>setOurInfo({...ourInfo,location:e.target.value})}/>
        <input type='name' name='jobtitle' placeholder={t("Job Title")} value={ourInfo.jobtitle} onChange={(e)=>setOurInfo({...ourInfo,jobtitle:e.target.value})}/>
        <input type='name' name='company' placeholder={t("Company Name")} value={ourInfo.company} onChange={(e)=>setOurInfo({...ourInfo,company:e.target.value})}/>
        <input type='number' name='phone' placeholder={t("Phone Number")} value={ourInfo.phone} onChange={(e)=>setOurInfo({...ourInfo,phone:e.target.value})}/>
        <textarea id='biofield' type='Bio' name='bio' placeholder={t("Bio")} value={ourInfo.bio} onChange={(e)=>setOurInfo({...ourInfo,bio:e.target.value})}></textarea>
        </div>
        </div>
        <div className='addnewlink'>
        <div className="heading-container">
        <div className="line"></div>
        <h1 className="centered-heading">{t("Link")}</h1>
        <div className="line"></div>
      </div>
      <div className='addlink' style={{ marginTop: '-10px' }}>
      {selectlinks?.map((elm,i)=>{
        return(
        <div  className='namelink'>
          <div className='link'  onClick={checkAdded(elm.linkId) ?  () => {handleLinkMediaModalOpen2(addExistingLink(elm.linkId)),setValue(addExistingLink(elm.linkId)?.value)} : () => {handleLinkMediaModalOpen2(elm),setValue("")}}>
            <img src={returnIcons(elm.linkId)}  alt={elm.altname} />
          </div>
          <p id='soialp'>{t(elm.name)}</p>
        </div>
        )}
      )
    }
      
      <div onClick={handleAddLinkButtonClick} className='mainaddlinknew'>
      <div className='addlinknew'>
       <img src='images/Plus.png'></img>
      </div>
      <p>{t("Add Link")}</p>
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
      <h2 id='main-name-addlink'>{t("Add Social Links")}</h2>
      <h1 id='social-media-hed'>{t("Social Media")}</h1>
      <div className='social-media'>
        <div className='social-media-icon'>
        {linksSocail.map((link, index) => (
          <div key={`link-${index}`} className='mediaalllink'>
            <div className='link-media' onClick={checkAdded(link.linkId) ?  () => {handleLinkMediaModalOpen2(addExistingLink(link.linkId)),setValue(addExistingLink(link.linkId)?.value)} : () => {handleLinkMediaModalOpen2(link),setValue("")}}>
              <img src={link.imgSrc} alt={link.altname} />
              {checkAdded(link.linkId) && (
                
                <img id='tick' src="https://img.icons8.com/fluency/96/checked.png" alt="checked--v1"/>
              )}
            </div>
            <p id='soialp'>{t(link.name)}</p>
          </div>
        
      ))}
       </div>
       </div>
       <div className='contact-media'>
       <h1 id='contactmedia'>Contact</h1>
       <div className='social-media' style={selectlng==="esanpol"?{height:"200px"}:null}>
       <div className='social-media-icon'>
       {linksContact.map((link, index) => (
        <div key={`link-${index}`} className='mediaalllink'>
          <div className='link-media' onClick={checkAdded(link.linkId) ?  () => {handleLinkMediaModalOpen2(addExistingLink(link.linkId)),setValue(addExistingLink(link.linkId)?.value)} : () => {handleLinkMediaModalOpen2(link),setValue("")}}>
            <img src={link.imgSrc} alt={link.altname} />
            {checkAdded(link.linkId) && (
                
              <img id='tick' src="https://img.icons8.com/fluency/96/checked.png" alt="checked--v1"/>
            )}
          </div>
          <p id='soialp'>{t(link.name)}</p>
        </div>
        
      ))}
       </div>
       </div>
       </div>
       <div className='website'>
       <h1 id='contactmedia'>{t("More")}</h1>
       <div className='social-media'>
       <div className='social-media-icon'>
       {linksMore.map((link, index) => (
        <div key={`link-${index}`} className='mediaalllink'>
          <div className='link-media' onClick={checkAdded(link.linkId) ?  () => {handleLinkMediaModalOpen2(addExistingLink(link.linkId)),setValue(addExistingLink(link.linkId)?.value)} : () => {handleLinkMediaModalOpen2(link),setValue("")}}>
            <img src={link.imgSrc} alt={link.altname} />
            {checkAdded(link.linkId) && (
                
              <img id='tick' src="https://img.icons8.com/fluency/96/checked.png" alt="checked--v1"/>
            )}
          </div>
          <p id='soialp'>{t(link.name)}</p>
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
          onClose={()=>{handleLinkMediaModalClose(),setLinkInfoVisible(true)}}
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
          <></>
          {isLinkInfoVisible && (
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
          )}

            {clickedLink && (
              <div>
                {isLinkInfoVisible && ( 
                  <div className='add-link-media2'>
                  
                   <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'90%'}}><div style={{width:"33%"}}></div> <h1 style={{width:"33%"}}>{t("Add")}</h1>
                   {checkLinkExists(clickedLink.linkId) ? (
                    <div style={{width:"33%",display:"flex",justifyContent:'flex-end'}}>
                      <img
                        width="30"
                        height="30"
                        src="https://img.icons8.com/ios-glyphs/96/trash--v1.png"
                        alt="trash--v1"
                        onClick={() => removeLink({ name: clickedLink.name, linkId: clickedLink.linkId, value: value }, currentUser, selectlinks)}
                        style={{ display: 'inline-block' }}
                      />
                      </div>
                  ) : (
                    <div style={{width:"33%"}}></div>
                  )}
                
                 </div>
                    <div className='every-link-icon'>
                      <img src={returnIcons(clickedLink.linkId)} alt={clickedLink.altname} />
                    </div>
                    <p>{t(clickedLink.name)}</p>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', width: '100%' }}>
                      <input type='name' name='input url' placeholder={t(clickedLink.placeholder)}  style={{ outline: 'none' }} onChange={handleChange} value={value}/>
                      {'\u00A0'}
                      <FaCircleInfo style={{ fontSize: '30px' }} onClick={handleToggleLinkInfo} /> {/* Toggle info visibility */}
                    </span>
                    <div className='twolink-btn'>
                      <button onClick={handleLinkMediaModalClose} id='cancel-Btn'>{t("Cancel")}</button>
                      {checkAdded(clickedLink.linkId) ?  
                        <button onClick={() => handleLinkMediaUpdate({ name: clickedLink.name, linkId: clickedLink.linkId, value: value,placeholder:clickedLink.placeholder }, currentUser, links)} id='save-Btn'>{t("Update")}</button> :
                        <button onClick={() => handleLinkMediaModalopen({ name: clickedLink.name, linkId: clickedLink.linkId, value: value,placeholder:clickedLink.placeholder }, currentUser, links)} id='save-Btn'>{t("Save")}</button>}
                    </div>
                  </div>
                )}
                
                {!isLinkInfoVisible && 
                  <div style={{display:'flex',height:'max-content',flexDirection:'column'}}>
                  <div className='main-hed-page'>
                    <div className="back-Div" onClick={()=>setLinkInfoVisible(true)}>
                    <img
                     id='back-div-icon'
                      src="https://img.icons8.com/ios-glyphs/96/back.png"
                      alt="back"
                    />
                  </div>
                  <div className='web-icon-page'>
                  </div>
                  </div>
                  <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'column'}}>
                <p style={{fontFamily:'inter',fontWeight:'600'}}>Instruction</p>
                <p style={{width:'300px',marginTop:'20px',fontFamily:'inter',marginBottom:'20px'}}>{returnInstaruction(clickedLink.linkId)} </p>
                </div>
                  </div>
              
              } </div>
             
            )}
           
          </Box>
        </Modal>
        <div className='Back-theme'>
        <div className='single-theme'>
          <img width={50} src={theme1} alt="Theme A" />
          <p>{t("Default")}</p>
          <Radio
            checked={theme === 'Default'}
            onChange={handleChangetheme}
            value="Default"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'Default' }}
          />
        </div>
        <div className='single-theme'>
          <img width={50} src={theme2} alt="Theme B" />
          <p>{t("Linear")}</p>
          <Radio
            checked={theme === 'Linear'}
            onChange={handleChangetheme}
            value="Linear"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'Linear' }}
          />
        </div>
        <div className='single-theme'>
        <img width={50} src={theme1} alt="Theme B" />
        <p>{t("Potrait")}</p>
        <Radio
          checked={theme === 'Potrait'}
          onChange={handleChangetheme}
          value="Potrait"
          name="radio-buttons"
          inputProps={{ 'aria-label': 'Potrait' }}
        />
      </div>
      </div>
        <div className='colors'>
        <div className='color'>
        <p>{t("Select Colors")}</p>
        </div>
        <div className='select-color'>
        <div className='chossecolor' style={{position:"relative"}} >
      
<label htmlFor="colorPick"> <img src='images/Eye drops.png' style={{ cursor: 'pointer' }}  /></label>
            <input type='color' id='colorPick' onChange={(e) => handleColorChange(e.target.value)} style={{width:'30px',height:'20px',position:"absolute"}}  />


        </div>
        <div className={color === 'white' ? 'active1' : ''}> <div className='chossecolor7' onClick={() => handleColorChange('white')}></div></div>
        <div className={color === 'rgb(214, 235, 198)' ? 'active1' : ''}>  <div className='chossecolor1' onClick={() => handleColorChange('rgb(214, 235, 198)')}></div></div>
        <div className={color === 'rgb(108, 108, 108)' ? 'active1' : ''}>  <div className='chossecolor2' onClick={() => handleColorChange('rgb(108, 108, 108)')}></div></div>
        <div className={color === 'rgb(235, 233, 142)' ? 'active1' : ''}>  <div className='chossecolor3' onClick={() => handleColorChange('rgb(235, 233, 142)')}></div></div>
        <div className={color === 'orange' ? 'active1' : ''}>  <div className='chossecolor4' onClick={() => handleColorChange('orange')}></div></div>
        <div className={color === 'rgb(212, 166, 240)' ? 'active1' : ''}>  <div className='chossecolor5' onClick={() => handleColorChange('rgb(212, 166, 240)')}></div></div>
        <div className={color === 'pink' ? 'active1' : ''}>  <div className='chossecolor6' onClick={() => handleColorChange('pink')}></div></div>
      
        </div>
        </div>
        <div className='theme'>
        <div className='select-theme'>
        <p id='theme-11'>{t("Select Theme")}</p>
        <p id='theme-22'>{t("Day Mode Is Active")}</p>
        </div>
        <div className='tdso'></div>
        <DarkModeToggle darkmode={ourInfo?.darkmode} toggledarkmodStatus={toggledarkmodStatus} />
        </div>
        <div className='save-button'>
        <button onClick={handleFormSubmit}>{t("Save")}</button>
        </div>
       </div>
       <ToastContainer
       position="top-center"
       reverseOrder={false}
     />
    </>
  )
}
export default React.memo(EditProfile);
