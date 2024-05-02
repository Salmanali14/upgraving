import React, { useState,useEffect, useContext} from "react";
import QRCode from "react-qr-code";
import useSWR from "swr";
import Switchtoggle from "./Switchtoggle";
import { CiCircleInfo } from "react-icons/ci";
import VCard from 'vcard-creator';
import { onValue, ref } from "firebase/database";
import { db } from "./firebaseConfig";
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
import Qrtoggle from "./Qrtoggle";
export default function QrCodeGenerator() {
  const [isOnline, setIsOnline] = useState(false);
  const [ourInfo, setOurInfo] = useState({ fullname: '', location: '', jobtitle: '', company: '', bio: '',phone:'',id:null });
  const [allAnalytics, setAllAnalytics] = useState([]);
  const currentUser = localStorage.getItem("useruid");
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);  
  const [selectlinks, setselectlinks] = useState([]);

  useEffect(() => {
     const getLinksData = async () => {
       const starCountRef = ref(db, `user/${currentUser}/links/`);
       onValue(starCountRef, (snapshot) => {
         const fetchdata = snapshot.val();
         if (fetchdata) {
           setselectlinks(Object.values(fetchdata));
         }
       });
     };
     getLinksData();
   }, [currentUser]);
  useEffect(()=>{
    const starCountRef = ref(db, `user/${currentUser}`);
    onValue(starCountRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setOurInfo({
          fullname: data.fullname || '',
          location: data.location || '',
          jobtitle: data.jobtitle || '',
          company: data.company || '',
          bio: data.bio || '',
          phone: data.phone || '',
          email: data.email || '',
          id:data?.id
        });
      }
    });
  },[currentUser])
  const { data, error } = useSWR(isOnline ? "/api/user" : null, fetch);

 
  const generateVCardString = () => {
    // Define a new vCard
    const myVCard = new VCard();

    // Some variables
    const lastname = ""; // No lastname?
    const firstname = ourInfo?.fullname;
    const additional = "";
    const prefix = "";
    const suffix = "";

    myVCard
      .addName(lastname, firstname, additional, prefix, suffix)
      .addJobtitle(ourInfo?.jobtitle)
      .addCompany(ourInfo?.company)
      .addEmail(ourInfo?.email)
      .addPhoneNumber(ourInfo?.phone)
      .addAddress(ourInfo?.location)
      .addNote("From Upgraving");
      selectlinks?.map((elm) => {
        myVCard.addSocial(
          elm?.value,
          elm?.name
        )
        })
    return myVCard.toString();
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  if (error) return <div>failed to load</div>;
  if (!data && isOnline) return <div>loading...</div>;
  const vCardString = generateVCardString(data);
  const baseURL = window.location.origin;
const previewURL = `${baseURL}/prevprofile/${localStorage.getItem('useruid')}`;
console.log(selectlinks);
  
  return (
    <>
    <div className="Qr-code-e">
    <div style={{display:'flex',alignItems:'center',fontFamily:'inter',fontSize:'14px',marginBottom:'20px',fontWeight:'400'}}><CiCircleInfo/>{'\u00A0'}{t("Offline Mode")}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}<Qrtoggle isOnline={isOnline} toggleOnlineStatus={toggleOnlineStatus}/></div>
      {isOnline ? (
        <>
          <QRCode value={vCardString} size={172}  />
       
        </>
      ) : (
        <>
       
          <QRCode value={previewURL} size={172}   />
         
        </>
    
      )}
     
    </div>
    <div style={{position:'absolute',top:'-28px',left:'0px',display:'flex'}}>
    </div>
    
    </>
  );
}
