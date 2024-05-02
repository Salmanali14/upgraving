import React, { useState,useEffect, useContext } from 'react'
import './Login.css'
import Footer from './Footer'
import { Modal, Box, IconButton, colors } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { storage,  } from './firebaseConfig';
import { uploadString , ref as sRef,getDownloadURL} from 'firebase/storage';
import { update , ref,push,onValue,query,orderByChild,equalTo, set, get } from 'firebase/database';
import {db} from './firebaseConfig';
import prfl from './images/Group 661.png'
import cover from './images/Group 659.png'
import logo from './images/Group 663.png'
import insta from './images/instagram.png'
import vCardsJS from 'vcards-js';
import VCard from 'vcard-creator';
import { IoClose } from 'react-icons/io5';
import { isMobile } from 'react-device-detect';
import Exchangecontact from './Exchangecontact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
import { DotLoader } from 'react-spinners';
export default function PrevProfile() {
  const currentUser = localStorage.getItem("useruid");
  const { id } = useParams();
  const [ourInfo, setOurInfo] = useState({ fullname: '', location: '', jobtitle: '', company: '', bio: '',phone:'',id:null });
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [logoImage, setLogoImage] = useState('');
  const [directData, setDirectData] = useState(null);
  const [directmode, setDirectmode] = useState(null);
  const [profilelockmode, setProfilelockmode] = useState(null);
  const [leadmode, setleadmode] = useState(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [allAnalytics, setAllAnalytics] = useState([]);
  const deviceType = isMobile ? 'mobile' : 'desktop';
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);  
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleExchangeContact = () => {
    setIsSliderOpen(true);
  };

  const handleCloseSlider = () => {
    setIsSliderOpen(false);
  };
const [color,setColor]=useState("")


 
  useEffect(() => {
    const getSingleChild = async () => {
      const starCountRef2 = ref(db, `Analytic/`);
      onValue(starCountRef2, async (snapshot) => {
        const analytData = await snapshot.val();
        console.log(analytData);
        setAllAnalytics(Object.values(analytData));
      })
     
    };
    getSingleChild();
  }, [id]);
  useEffect(()=>{
    const starCountRef = ref(db, `user/${id}`);
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
        setProfileImage(data.profileImage || '');
        setCoverImage(data.coverImage || '');
        setLogoImage(data.logoImage || '');
        setColor(data.colors || '');
        setDirectmode(data.directmode);
       setDirectData(data.direct);
       setleadmode(data.leadmode);
       setOpen(data?.leadmode);
       setProfilelockmode(data?.profilelockmode);

       console.log(data?.profilelockmode)
      }
    });
  },[allAnalytics])
  console.log()
  const [selectlinks, setselectlinks] = useState([]);

 useEffect(() => {
    const getLinksData = async () => {
      const starCountRef = ref(db, `user/${id}/links/`);
      onValue(starCountRef, (snapshot) => {
        const fetchdata = snapshot.val();
        if (fetchdata) {
          setselectlinks(Object.values(fetchdata));
        }
      });
    };
    getLinksData();
  }, [id]);

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
  const profiles = [
    {
      name: 'Drake Adwin',
      role: 'Project Manager',
      description: 'Lorem ipsum dolor sit amet consectetur. Aliquet nunc augue praesent lectus sodales.',
    },
  ];
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
  
  let [base64img, setbase64img] = useState("");
  useEffect(() => {
    let cnvrtTo64 = async () => {
      const base64 = await fetch(profileImage)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          return new Promise((res) => {
            reader.onloadend = () => {
              res(reader.result);
            };
          });
        });
      setbase64img(base64);
    };
    cnvrtTo64();
  }, [profileImage]);
  let downloadVcf = async () => {
    // Define a new vCard
    const myVCard = new VCard();

    // Some variables
    const lastname = "";
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
      .addPhoto(base64img.slice(22), "jpeg")
      .addAddress(ourInfo?.location)
      .addNote("From Upgraving");

      selectlinks?.map((elm) => {
        myVCard.addSocial(
          elm?.value,
          elm?.selectedLink
          
        );
    });


    const vcardData = myVCard.toString();
    const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "UpGraving.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  console.log(selectlinks)
// ----------------------------------------->Analytics<-------------------------------------
let currentDate = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const oneMonth = 30 * 24 * 60 * 60 * 1000;
  const oneDay = 24 * 60 * 60 * 1000;
let addedInAnalyticsOrNot = (id) => {
  if(allAnalytics?.length>0){
    let addedOrNot = allAnalytics?.some((elm) => {
      return id === elm?.userid;
    });
    
    return addedOrNot;
  }
 //console.log(allAnalytics)


};

// console.log(allAnalytics)

let returnClickedLinkAnalyt = () => {};
let crntUsrAnalytics = allAnalytics?.find((usr) => {
  return id === usr?.userid;
});
let linkAddedInAnalyticsOrNot = (linkId) => {
  let addedOrNot = crntUsrAnalytics?.links?.some((elm) => {
    return linkId === elm?.linkId;
  });
  return addedOrNot;
};
// console.log(id)
// console.log(addedInAnalyticsOrNot(id))
  

const oneYear = 365 * 24 * 60 * 60 * 1000; // Milliseconds in a year

useEffect(() => {
  const userAgent = navigator.userAgent;
  const isAndroid = /Android/.test(userAgent);
  const isIPhone = /iPhone/.test(userAgent);
  const isDesktop = !isAndroid && !isIPhone;
  if (ourInfo?.id) {
    console.log(id);
    if (addedInAnalyticsOrNot(id)) {
      console.log("added");



      if (currentDate > crntUsrAnalytics?.updatedWeek + oneWeek) {
        const mobileDayUpdate = {
          iphone: isIPhone ? 1 : 0,
          android: isAndroid ? 1 : 0,
        };
        const mobileWeeklyUpdate = { ...mobileDayUpdate };
        const mobileMonthlyUpdate = { ...mobileDayUpdate };

        const desktopDayUpdate = isDesktop ? 1 : 0;

        update(ref(db, `Analytic/${crntUsrAnalytics?.id}`), {
          totalViews: crntUsrAnalytics?.totalViews + 1,
          totalandroid: crntUsrAnalytics?.totalandroid + mobileDayUpdate.android,
          totaliphone: crntUsrAnalytics?.totaliphone + mobileDayUpdate.iphone,
          updatedWeek: currentDate,
          pastWeekViews: crntUsrAnalytics?.crntWeekViews,
          pastWeekLeads: crntUsrAnalytics?.crntWeekLeads,
            iphone: crntUsrAnalytics?.iphone + mobileDayUpdate.iphone,
            android: crntUsrAnalytics?.android + mobileDayUpdate.android,
            Weeklyiphone: crntUsrAnalytics?.Weeklyiphone + mobileWeeklyUpdate.iphone,
            Weeklyandroid: crntUsrAnalytics?.Weeklyandroid + mobileWeeklyUpdate.android,
            Monthlyiphone: crntUsrAnalytics?.Monthlyiphone + mobileMonthlyUpdate.iphone,
            Monthlyandroid: crntUsrAnalytics?.Monthlyandroid + mobileMonthlyUpdate.android,
          desktopDay: crntUsrAnalytics?.desktopDay + desktopDayUpdate,
          desktopWeekly: crntUsrAnalytics?.desktopWeekly + desktopDayUpdate,
          desktopMonthly:  crntUsrAnalytics?.desktopMonthly + desktopDayUpdate,
          mobile: crntUsrAnalytics?.mobile + (isAndroid || isIPhone ? 1 : 0),
          mobileweekly: crntUsrAnalytics?.mobileweekly + (isAndroid || isIPhone ? 1 : 0),
          mobilemonthly: crntUsrAnalytics?.mobilemonthly + (isAndroid || isIPhone ? 1 : 0),
        }).then(() => {
          update(ref(db, `Analytic/${crntUsrAnalytics?.id}`), {
            crntWeekViews: 1,
            crntWeekLeads: 0,
          });
        });
      } else {
        update(ref(db, `Analytic/${crntUsrAnalytics?.id}`), {
          totalViews: crntUsrAnalytics?.totalViews + 1,
          totaliphone:isIPhone ? crntUsrAnalytics?.totaliphone  + 1 :  crntUsrAnalytics?.totaliphone  + 0,
          totalandroid:isAndroid ? crntUsrAnalytics?.totalandroid  + 1 :  crntUsrAnalytics?.totalandroid  + 0,
          crntWeekViews: crntUsrAnalytics?.crntWeekViews + 1,
          crntMonthViews: crntUsrAnalytics?.crntMonthViews + 1,
            iphone:isIPhone ? crntUsrAnalytics?.iphone  + 1 :  crntUsrAnalytics?.iphone  + 0,
            android:isAndroid ? crntUsrAnalytics?.android  + 1 :  crntUsrAnalytics?.android  + 0,
            Weeklyiphone:isIPhone ? crntUsrAnalytics?.Weeklyiphone  + 1 :  crntUsrAnalytics?.Weeklyiphone  + 0,
            Weeklyandroid:isAndroid ? crntUsrAnalytics?.Weeklyandroid  + 1 :  crntUsrAnalytics?.Weeklyandroid  + 0,
            Monthlyiphone:isIPhone ? crntUsrAnalytics?.Monthlyiphone  + 1 :  crntUsrAnalytics?.Monthlyiphone  + 0,
            Monthlyandroid:isAndroid ? crntUsrAnalytics?.Monthlyandroid  + 1 :  crntUsrAnalytics?.Monthlyandroid  + 0,
          desktopDay:isDesktop? crntUsrAnalytics?.desktopDay + 1 : crntUsrAnalytics?.desktopDay + 0,
          desktopWeekly:isDesktop? crntUsrAnalytics?.desktopWeekly + 1 : crntUsrAnalytics?.desktopWeekly + 0,
          desktopMonthly:isDesktop? crntUsrAnalytics?.desktopMonthly + 1 : crntUsrAnalytics?.desktopMonthly + 0,
          mobile: crntUsrAnalytics?.mobile + (isAndroid || isIPhone ? 1 : 0),
          mobileweekly: crntUsrAnalytics?.mobileweekly + (isAndroid || isIPhone ? 1 : 0),
          mobilemonthly: crntUsrAnalytics?.mobilemonthly + (isAndroid || isIPhone ? 1 : 0),
        });
      }

      if (currentDate > crntUsrAnalytics?.updatedMonth + oneMonth) {
        const mobileMonthlyUpdate = {
          iphone: isIPhone ? 1 : 0,
          android: isAndroid ? 1 : 0,
        };

        update(ref(db, `Analytic/${crntUsrAnalytics?.id}`), {
          updatedMonth: currentDate,
          pastMonthViews: crntUsrAnalytics?.crntMonthViews,
          pastMonthLeads: crntUsrAnalytics?.crntMonthLeads,
          Monthlyiphone: crntUsrAnalytics?.Monthlyiphone + mobileMonthlyUpdate.iphone,
          Monthlyandroid: crntUsrAnalytics?.Monthlyandroid + mobileMonthlyUpdate.android,
          desktopMonthly:  crntUsrAnalytics?.desktopMonthly + (isDesktop ? 1 : 0),
          mobilemonthly: crntUsrAnalytics?.mobilemonthly + (isAndroid || isIPhone ? 1 : 0),
        }).then(() => {
          update(ref(db, `Analytic/${crntUsrAnalytics?.id}`), {
            crntMonthViews: crntUsrAnalytics?.crntMonthViews + 1,
            crntMonthLeads: 0,
          });
        });
      } else {
        update(ref(db, `Analytic/${crntUsrAnalytics?.id}`), {
          crntMonthViews: crntUsrAnalytics?.crntMonthViews + 1,
          Monthlyiphone: crntUsrAnalytics?.Monthlyiphone + (isIPhone ? 1 : 0),
          Monthlyandroid: crntUsrAnalytics?.Monthlyandroid + (isAndroid ? 1 : 0),
          desktopMonthly:crntUsrAnalytics?.desktopMonthly + (isDesktop ? 1 : 0),
          mobilemonthly: crntUsrAnalytics?.mobilemonthly + (isAndroid || isIPhone ? 1 : 0),
        });
      }

      if (currentDate > crntUsrAnalytics?.updatedDay + oneDay) {
        update(ref(db, `Analytic/${crntUsrAnalytics?.id}`), {
          updatedDay: currentDate,
            iphone: isIPhone ? 1 : 0,
            android: isAndroid ? 1 : 0,
          desktopDay: isDesktop ? 1 : 0,
        }).then(() => {
          update(ref(db, `Analytic/${crntUsrAnalytics?.id}`), {
            todayViews: 1,
            todayLeads: 0,
          });
        });
      } else {
        update(ref(db, `Analytic/${crntUsrAnalytics?.id}`), {
          todayViews: crntUsrAnalytics?.todayViews + 1,
            iphone: crntUsrAnalytics?.iphone + (isIPhone ? 1 : 0),
            android: crntUsrAnalytics?.android + (isAndroid ? 1 : 0),
          desktopDay: crntUsrAnalytics?.desktopDay + (isDesktop ? 1 : 0),
          todayLeads: crntUsrAnalytics?.todayLeads,
          mobile:crntUsrAnalytics?.android + (isAndroid || isIPhone? 1 : 0),
        });
      }
    } else {
      console.log("not added");
      let thePushKey = push(ref(db, `Analytic/`), {
        userid: id,
        totalViews: 1,
        totalClicks: 0,
        totalClickRate: 0,
        totalLeads: 0,
        crntWeekViews: 1,
        pastWeekViews: 0,
        crntWeekLeads: 0,
        pastWeekLeads: 0,
        crntMonthViews: 1,
        pastMonthViews: 0,
        crntMonthLeads: 0,
        pastMonthLeads: 0,
        todayViews: 1,
        todayLeads: 0,
        weeklyViews: [0, 0, 0, 0, 0, 0, 0],
        weeklyConnections: [0, 0, 0, 0, 0, 0, 0],
        updatedWeek: currentDate,
        updatedMonth: currentDate,
        updatedDay: currentDate,
        totalandroid:isAndroid? 1:0,
        totaliphone:isIPhone? 1:0,
          iphone:isIPhone? 1:0,
          android:isAndroid? 1:0,
          Weeklyiphone:isIPhone? 1:0,
          Weeklyandroid:isAndroid? 1:0,
          Monthlyiphone:isIPhone? 1:0,
          Monthlyandroid:isAndroid? 1:0,
        desktopDay: isDesktop?1:0,
        desktopWeekly: isDesktop?1:0,
        desktopMonthly: isDesktop?1:0,
        mobile:isDesktop ? 0 : 1,
        mobileweekly:isDesktop ? 0 : 1,
        mobilemonthly:isDesktop ? 0 : 1,
      }).key;
      update(ref(db, `Analytic/${thePushKey}`), {
        id: thePushKey,
      });
    }
  }
}, [ourInfo?.id]);

console.log(crntUsrAnalytics)
let linkAnalytics = (name) => {
  console.log(name.name)
  if (crntUsrAnalytics?.links) {
    if (linkAddedInAnalyticsOrNot(name?.linkId)) {
      console.log("added");
      let findLink = crntUsrAnalytics?.links?.find((elm) => {
        return name?.linkId === elm?.linkId;
      });
      let linksWithoutCrntLink = crntUsrAnalytics?.links?.filter((elm) => {
        return name?.linkId != elm?.linkId;
      });
      update(ref(db, `Analytic/${crntUsrAnalytics?.id}`), {
        links: [
          ...linksWithoutCrntLink,
          {
            linkId: findLink?.linkId,
            name: findLink?.name ? findLink?.name : "",
            clicks: findLink?.clicks + 1,
            value: findLink?.value ? findLink?.value : "",
          },
        ],
      }).then(() => {
        update(ref(db, `Analytic/${crntUsrAnalytics?.id}/`), {
          totalClicks: crntUsrAnalytics?.totalClicks + 1,
        });
      });
    } else {
      console.log("yes this part is working");
      update(ref(db, `Analytic/${crntUsrAnalytics?.id}/`), {
        links: [
          ...crntUsrAnalytics?.links,
          {
            linkId: name?.linkId,
            name: name?.name ? name?.name : "",
            clicks: 1,
            value: name?.value ? name?.value : "",
          },
        ],
      }).then(() => {
        update(ref(db, `Analytic/${crntUsrAnalytics?.id}`), {
          totalClicks: crntUsrAnalytics?.totalClicks + 1,
        });
      });
    }
    console.log("testing analytics");
  } else {
    update(ref(db, `Analytic/${crntUsrAnalytics?.id}/`), {
      links: [
        {
          linkId: name?.linkId,
          name: name?.name ? name?.name : "",
          clicks: 1,
          value: name?.value ? name?.value : "",
        },
      ],
    }).then(() => {
      update(ref(db, `Analytic/${crntUsrAnalytics?.id}`), {
        totalClicks: 1,
      });
      console.log("testing analytics2");
    });
  }
};
 
let linkopen=(name,value)=>{
  if (name == "Call") {
    return `tel:${value}`;
  } else if (name == "WhatsApp") {
    return `https://api.whatsapp.com/send?phone=${value}`;
  } else if (name == "Custom Link") {
    return `${value}`;
  } else if (name == "Email") {
    return `mailto:${value}`;
  } else if (name == "Facebook") {
    return `${value}`;
  } else if (name == "Instagram") {
    return `https://www.instagram.com/${value}`;
  } else if (name == "LinkedIn") {
    return `${value}`;
  } else if (name == "Paypal") {
    return `${value}`;
  } else if (name == "Contact") {
    return `tel:${value}`;
  } else if (name == "Reddit") {
    return `${value}`;
  } else if (name == "Snapchat") {
    return `https://www.snapchat.com/add/${value}`;
  } else if (name == "Spotify") {
    return `${value}`;
  } else if (name == "Telegram") {
    return `https://t.me/${value}`;
  } else if (name == "Tiktok") {
    return `https://www.tiktok.com/@${value}`;
  } else if (name == "X") {
    return `https://twitter.com/${value}`;
  } else if (name == "Vimeo") {
    return `${value}`;
  } else if (name == "Website") {
    return `${value}`;
  } else if (name == "Youtube") {
    return `${value}`;
  }else if (name == "Skype") {
    return `https://join.skype.com/invite/@${value}`;
  } else if (name == "Gmail") {
    return `mailto:${value}`;
  }else if (name == "Linkedin") {
    return `${value}`;
  }else if (name == "Discord") {
    return `${value}`;
  }else if (name == "Messenger") {
    return `${value}`;
  }else if (name == "Zoom") {
    return `${value}`;
  }else if (name == "Google Play") {
    return `${value}`;
  }else if (name == "Apple Store") {
    return `${value}`;
  }else if (name == "AppleStore") {
    return `${value}`;
  }else if (name == "CashApp") {
    return `${value}`;
  }else if (name == "Map") {
    return `${value}`;
  }else if (name == "Amazon") {
    return `${value}`;
  }else if (name == "Facetime") {
    return `${value}`;
  }
}

let url = directData?.value.startsWith("https://") ? directData?.value : "https://" + directData?.value;
console.log(directData)
const [loading, setLoading] = useState(true);
useEffect(() => {
  // Simulate a 2-second loading time
  const timeout = setTimeout(() => {
    setLoading(false);
  }, 2000);

  return () => clearTimeout(timeout);
}, []); // Run only once on component mount
function truncateText(text, maxLength) {
  if (text?.length <= maxLength) {
    return text;
  } else {
    return text?.slice(0, maxLength) + '...';
  }
}


  return (
<>
{loading ? (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh" }} className="loading-screen">
    <DotLoader color="#0b6e99" />
  </div>
) : (
    profilelockmode ? (
      <div style={{padding:"20px",display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
      <div className="profile-closed-message">
      <img width="150" height="150" src="https://img.icons8.com/color/150/circled-user-male-skin-type-7--v1.png" alt="circled-user-male-skin-type-7--v1"/>
      <img width="100" height="100" src="https://img.icons8.com/ios/100/lock--v1.png" alt="lock--v1"/>
      <p style={{paddingLeft:"10px",paddingRight:"10px"}}>
        Profile closed due to user configuration. If you are the owner of this link, activate your device, and personalize your profile.
      </p>
      <p>
        Service Upgraving™
      </p>
    </div>
    </div>
      ) : (

      directmode ? (
        window.location.href = linkopen(directData.selectedLink,directData.value)
      ) : (
        <>
        <div className='home1' style={{backgroundColor:color}}>
        <div className='main-hed-page'>
        <div></div>
        <div className='web-icon-page'>
        <img id='web-icon' src='/images/upgraving_logo 1 (5).png'/>
        </div>
        <div></div>
        </div>
            <div className='coverimg'>
                <img  className='cover'  src={coverImage ? coverImage : cover} /> 
                <img  className='profile13' src={profileImage ? profileImage : prfl} />
                <img  className='icon' src={logoImage ? logoImage : logo}/>
            </div>
            <div className='profiletext'>
            {profiles.map((profile, index) => (
              <div key={`profile-${index}`} className='username'>
                <h2>{truncateText(ourInfo.fullname,20)}</h2>
                <h4>{truncateText(ourInfo.jobtitle,20)}</h4>
                <p>{ourInfo.bio}</p>
              </div>
            ))}
          </div>
        <div className='Profilebutton1'>
        <button onClick={downloadVcf}>{t("Save Contact")} <img src='/images/Vector 1.png'></img></button> 
        <button id='exchangebutton' onClick={handleOpen}>{t("Exchange Contact")}</button>
        </div>
        <Modal
        open={open}
        onClose={handleClose}
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
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 2,
              right: 18,
              width: '24px',
             height: '24px',
             bgcolor:"#f5f5f5"
         
            }}
          >
            <CloseIcon />
          </IconButton>
     <Exchangecontact/>
        </Box>
      </Modal>

        <div className="heading-container">
        <div className="line"></div>
        <h1 className="centered-heading">{t("Link")}</h1>
        <div className="line"></div>
      </div>
      <div className='addlink' style={{ marginTop: '-10px' }}>
      {selectlinks.length > 0 ? (
        selectlinks.map((elm, i) => (
          <div key={`link-${i}`} className='namelink'>
          <div onClick={() => window.open(linkopen(elm.name,elm.value))}>
            <div className='link' onClick={() =>{(linkAnalytics(elm))}}>
              <img src={returnIcons(elm.linkId)} alt={elm.altname} />
            </div>
            </div>
            <p id='soialp'>{t(elm.name)}</p>
          </div>
        ))
      ) : (
        <p>{t("No link added")}</p>
      )}
            </div>
      <br></br>
      
     
    
         </div>
         <ToastContainer
         position="top-center"
         reverseOrder={false}
       />
        
        </>
      )
  
      )
    )}
      </>
  )}
