import React,{useState,useEffect, useContext} from 'react'
import './Login.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { CiGrid41 } from "react-icons/ci";
import { BsListCheck } from "react-icons/bs";
import DefaultprofileList from './DefaultprofileList';
import { storage,  } from './firebaseConfig';
import { uploadString , ref as sRef,getDownloadURL} from 'firebase/storage';
import { update , ref,push,onValue,query,orderByChild,equalTo } from 'firebase/database';
import {db} from './firebaseConfig';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
export default function List() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ourInfo, setOurInfo] = useState({ fullname: '', location: '', jobtitle: '', company: '', bio: '' });
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [logoImage, setLogoImage] = useState('');
  const { t } = useTranslation();
const { language } = useContext(LanguageContext);  
const [color,setColor]=useState("")
  const currentUser = localStorage.getItem("useruid");
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
  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter function to filter connections based on search query
  const filterConnections = (connection) => {
    const { name } = connection; // Adjust this based on the structure of your connection object
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  };
  return (
    <div className='Connections' style={{backgroundColor:color}}>
    <h1 id='con-hed-main'>{t("Connections")}</h1>
    <div className='search-con'>
    <img width="20" height="20" src="https://img.icons8.com/ios/96/search.png" alt="search"/>
    <input type='text' name={t("Search")} placeholder={t("Search")} value={searchQuery} onChange={handleSearchInputChange}/>
    </div>
    <div className='connection-btn'>
    <Link to='/connections'>
    <button id='peo-btn'>{t("People")}</button></Link>
    <Link to='/groupconnections'>
    <button id='group-btn'><p style={{marginLeft:"27px"}}>{t("Groups")}</p></button>
    </Link>
    </div>
    <div className='connection-hed'>
    <h1> {t("Add Connections")}</h1>
    <p>{t("Develop your network by meeting new individuals and having them click the exchange contact button on your profile.")}</p>
    </div>
    <div className="heading-container" id='hedding-line-width'>
    <div className="line"></div>
    <h1 className="centered-heading" id='line-hed'>{t("All Connections")}</h1>
    <div className="line"></div>
    </div>
   <div className='grid'>
   <div className='connection-btn44'>
    <Link to='/connections'>
    <button id='group-btn512'><CiGrid41 /> {'\u00A0'}{t("Grid")}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</button></Link>
    <Link to='/list'>
    <button id='peo-btn512'><BsListCheck />{'\u00A0'}{t("List")}</button>
    </Link>
    </div>
   </div>
   <DefaultprofileList filterConnections={filterConnections} searchQuery={searchQuery}/>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>

  <Footer/>
      </div>
   
  )
}
