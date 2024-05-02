import React, { useState,useEffect, useRef, useContext } from 'react'
import './Login.css';
import { Link } from 'react-router-dom';
import { storage,  } from './firebaseConfig';
import { useParams } from 'react-router-dom';
import { uploadString , ref as sRef,getDownloadURL} from 'firebase/storage';
import { update , ref,push,onValue,query,orderByChild,equalTo } from 'firebase/database';
import {db} from './firebaseConfig';
import prfl from './images/Group 661.png'
import cover from './images/Group 659.png'
import logo from './images/Group 663.png'
import insta from './images/instagram.png'
import { ClipLoader } from 'react-spinners';
import { GrSubtractCircle } from "react-icons/gr";
import { LuPlusCircle } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cropper from './Cropper';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
const profiles = [
  {
    name: 'Drake Adwin',
    role: 'Project Manager',
    description: 'Lorem ipsum dolor sit amet consectetur. Aliquet nunc augue praesent lectus sodales.',
  },
];
export default function Exchangecontact() {
  const [ourInfo, setOurInfo] = useState({ fullname: '', location: '', jobtitle: '', company: '', bio: '' });
  const [contact, setContact] = useState({ fullname: '', location: '', jobtitle: '', company: '', bio: '' ,email:'',userprofileImageURL:'',date:'',phone:''});
  const [coverImage, setCoverImage] = useState('');
  const [showProfileUpload, setShowProfileUpload] = useState(true);
  const [userprofileImage, setProfileImage] = useState('');
  const [logoImage, setLogoImage] = useState('');
  const profileInputRef = useRef(null);
const [color,setColor]=useState("")
const[selectlinks,setselectlinks]=useState([])
const [allAnalytics, setAllAnalytics] = useState([]);
const { id } = useParams();
const { t } = useTranslation();
const { language } = useContext(LanguageContext);   
  const currentUser = localStorage.getItem("useruid");
  const getSingleChild = () => {
    const starCountRef = ref(db, `user/${id}`)

    onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();
      console.log(data);
      console.log("testing data");
      setColor(data?.colors)
      // setmylist(Object.values(data));
      // setfiltered(Object.values(data));
      // updateStarCount(postElement, data);
    });
  };
  const handleProfileDelete = () => {
    setProfileImage("");
    setShowProfileUpload(true);
    setShowProfileDelete(false);
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
    }
  };

  useEffect(() => {
    getSingleChild()
   
  }, []);
  const handleProfileLuPlusCircleClick = () => {
    profileInputRef.current.click();
  };

  let returnClickedLinkAnalyt = () => {};
let crntUsrAnalytics = allAnalytics?.find((usr) => {
  return id === usr?.userid;
});
let linkAddedInAnalyticsOrNot = (id) => {
  let addedOrNot = crntUsrAnalytics?.links?.some((elm) => {
    return id === elm?.id;
  });
  return addedOrNot;
};
  
  useEffect(() => {
 
    let getdata = async () => {
      const starCountRef2 = ref(db, `Analytic/`);
      onValue(starCountRef2, async (snapshot) => {
        const analytData = await snapshot.val();
        console.log(analytData);
        setAllAnalytics(Object.values(analytData));
      })


    const starCountRef = ref(db,`user/${id}/links/`);
    onValue(starCountRef, async (snapshot) => {
    let fetchdata = await snapshot.val();
    console.log(fetchdata)
    setselectlinks(Object.values(fetchdata));
    });
    };
    getdata();
  },[])
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
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]*$/;
    return phoneRegex.test(phone);
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    if (!contact.email || !contact.fullname || !contact.phone) {
      toast.error(t("Email and fullname are required."));
      return;
    }
    if (!validateEmail(contact.email)) {
      toast.warn(t('Please enter a valid email address.'));
      return;
    }

    if (!validatePhone(contact.phone)) {
      toast.warn(('Please enter a valid phone number.'));
      return;
    }

    try {
      if (!contact.email || !contact.fullname) {
        toast.error(t("Email and fullname are required."));
        return;
      }
      let downloadURL = '';
      if (userprofileImage) {
      
        if (!returnIfHttps(userprofileImage)) {
          const uniqueNum = Date.now();
          const name = 'userprofileimg' + uniqueNum;
          const storageRef = sRef(storage, name);
          await uploadString(storageRef, userprofileImage.slice(23), "base64", {
            contentType: "image/png",
          });
          downloadURL = await getDownloadURL(storageRef);
        } else {
          downloadURL = userprofileImage;
        }
      }
  
      const contactsRef = ref(db, 'contacts');
      const newContactRef = push(contactsRef);
      const pushKey = newContactRef.key;
  
      const updates = {
        userId: id,
        id: pushKey,
        email: contact.email,
        fullname: contact.fullname,
        location: contact.location,
        jobtitle: contact.jobtitle,
        company: contact.company,
        bio: contact.bio,
        phone: contact.phone,
        date: contact.date,
        userprofileImageURL: downloadURL,
      };
    
      await Promise.all([
        update(newContactRef, updates),
        update(ref(db, `/Analytic/${crntUsrAnalytics?.id}`), {
          crntMonthLeads: crntUsrAnalytics?.crntMonthLeads + 1,
          crntWeekLeads: crntUsrAnalytics?.crntWeekLeads + 1,
          totalLeads: crntUsrAnalytics?.totalLeads + 1,
          todayLeads: crntUsrAnalytics?.todayLeads + 1,
        }),
      ]);
     
      setContact({ fullname: '', location: '', jobtitle: '', company: '', bio: '', email: '', userprofileImageURL: "", date: '', phone: "" });
      toast.success(t("Form Submit successfully!"));
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error("Error adding contact.");
    } 
  };
  
  
  
  


const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact(prevState => ({
        ...prevState,
        [name]: value
    }));
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
  return (
    <>
    
    <Cropper
    className={cropModal ? 'cropper-container show' : 'cropper-container hide'}
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
    <div className='home' style={{backgroundColor:color,width:'100%'}}>
       
        <div className='exchange-input'>
        <div className='Inputfieldprofile'>
        <h1 id='personaldetail'>{t("Personal Detail")}</h1>
        <div className='profileDiv1' style={{ position: 'relative' }}>
      <img src={userprofileImage ? userprofileImage : prfl } alt="Profile" />
            {showProfileUpload && (
              <label htmlFor="profileUploadInput" className='profileEdit' style={{ position: 'absolute' }}>
                <input key={key} id="profileUploadInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePrflImageChange} ref={profileInputRef} />
               
              </label>
            )}
            
            {userprofileImage ? (
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
        <div className='inputfield'>
        <input type='text' name='fullname' placeholder={t("Full Name")} value={contact.fullname} onChange={handleInputChange} />
        <input type='text' name='location' placeholder={t("Location")} value={contact.location} onChange={handleInputChange} />
        <input type='email' name='email' placeholder={t("Email")} value={contact.email} onChange={handleInputChange} />
        <input type='text' name='phone' placeholder={t("Phone Number")}value={contact.phone} onChange={handleInputChange} />
                        <input type='text' name='jobtitle' placeholder={t("Job Title")} value={contact.jobtitle} onChange={handleInputChange} />
                        <input type='text' name='company' placeholder={t("Company Name")}  value={contact.company} onChange={handleInputChange} />
                        <input 
                       
                        name='date' 
                        placeholder={t("Date")}  
                        onFocus={(e) => e.target.type = 'date'}
                        onBlur={(e) => e.target.type = 'text'}
                        value={contact.date} 
                        onChange={handleInputChange} 
                      />
                      
                        <textarea id='biofield' type='Bio' name='bio'  placeholder={t("Bio")}  value={contact.bio} onChange={handleInputChange}></textarea>
        </div>
        </div>
        </div>
        <div style={{marginTop:"5px"}}>
        {loading && <ClipLoader  color="#36d7b7" />}</div>
        <div style={{paddingBottom:'10px',width:'100%',display:'flex',justifyContent:'center'}}>
        <button id='submit-btn-exchange' onClick={handleSubmit}>{t("Submit")} </button>
        </div>
        </div>
     
      
        </>
  )
}
