import React,{useState,useEffect, useContext} from 'react';
import Footer from './Footer';
import { LineChart } from '@mui/x-charts/LineChart';
import AnalyticDropdown from './AnalyticDropdown';
import { GrPowerReset } from "react-icons/gr";
import { storage,  } from './firebaseConfig';
import { Modal, Box, IconButton, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { uploadString , ref as sRef,getDownloadURL} from 'firebase/storage';
import { update , ref,push,onValue,query,orderByChild,equalTo, remove, set } from 'firebase/database';
import {db} from './firebaseConfig';
import { BarChart } from "@mui/x-charts/BarChart";
import insta from './images/instagram.png'
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
export default function Analytics() {
  const [anchorEl2, setAnchorEl] = useState(null);
  const [ourInfo, setOurInfo] = useState({ fullname: '', location: '', jobtitle: '', company: '', bio: '' });
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [logoImage, setLogoImage] = useState('');
  const parentidUser = localStorage.getItem("parentid");
  const [filteredUsers, setFilteredUsers] = useState([]);
const [color,setColor]=useState("")
const [selectedOption, setSelectedOption] = useState('Daily');
  const currentUser = localStorage.getItem("useruid");

  const [confirmation, setConfirmation] = useState(false);
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);   
  const handleopen = () => {
      setConfirmation(true);
  };
  const handleClose =()=>{
    setConfirmation(false);
  }
  
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
  const handleOpenMenu2 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu2 = () => {
    setAnchorEl(null);
  };
  const [desktopUsers, setDesktopUsers] = useState(0);
const [mobileUsers, setMobileUsers] = useState(0);
let [links,setLinks]=useState([])
useEffect(() => {
  const deviceRef = query(
    ref(db, "/Analytic"),
    orderByChild("userid"),
    equalTo(currentUser)
  );
  onValue(deviceRef, (snapshot) => {
    const userData = snapshot.val();
    setFilteredUsers(Object.values(userData)?.[0]);
    if(Object.values(userData)?.[0]?.links){
      setLinks(Object.values(Object.values(userData)?.[0]?.links))
    }
    
  
  });
}, []);
 
let updateLinks = () => {
    setLinks([]);
}; 

 const returnPercentage = (den, neom) => {
  const result = Math.round((den / neom) * 100);
  return isNaN(result) ? 0 : result;
};

let returnIcons=(linkId)=>{
  if (linkId===1) {
      return insta
  }else if (linkId===2){
    return 'https://img.icons8.com/ios-filled/96/ffffff/tiktok--v1.png'
  }else if (linkId===3){
    return 'https://img.icons8.com/material-rounded/96/FFFFFF/facebook-f--v1.png'
  }else if (linkId===4){
    return 'https://img.icons8.com/ios-filled/96/ffffff/twitter.png'
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
console.log(filteredUsers?.mobile)

const resetData = () => {

  const deviceRef = query(
    ref(db, "/Analytic"),
    orderByChild("userid"),
    equalTo(currentUser)
  );

  onValue(deviceRef, (snapshot) => {
    const userData = snapshot.val();

    if (userData) {
      Object.keys(userData).forEach((key) => {
        update(ref(db, `/Analytic/${key}`), {
          totalClickRate: 0,
          totalLeads: 0,
          links:"",
          crntWeekViews: 0,
          pastWeekViews: 0,
          crntWeekLeads: 0,
          pastWeekLeads: 0,
          crntMonthViews: 0,
          pastMonthViews: 0,
          crntMonthLeads: 0,
          pastMonthLeads: 0,
          todayViews: 0,
          totalViews:0,
          todayLeads: 0,
          weeklyViews: [0, 0, 0, 0, 0, 0, 0],
          weeklyConnections: [0, 0, 0, 0, 0, 0, 0],
          totalClicks:0,
          totalandroid:0,
          totaliphone:0,
            iphone:0,
            android:0,
            Weeklyiphone:0,
            Weeklyandroid:0,
            Monthlyiphone:0,
            Monthlyandroid:0,
          desktopDay: 0,
          desktopWeekly: 0,
          desktopMonthly: 0,
          mobile:0,
          mobileweekly:0,
          mobilemonthly:0,
        })
          .then(() => {
            console.log(`Data with ID ${key} reset successfully.`);
          })
          .catch((error) => {
            console.error(`Error resetting data with ID ${key}: ${error.message}`);
          });
      });
    } else {
      console.log("No data found to reset.");
    }
  });
  updateLinks();
  window.location.reload();
};



const handleResetButtonClick = () => {
  resetData();
  handleClose();
};
const handleSelectOption = (option) => {
  setSelectedOption(option); 
  handleCloseMenu2();
};
console.log(selectedOption)
const computeChartData = () => {
  if (selectedOption === 'Daily') {
      return {
          desktop: filteredUsers?.desktopDay,
          mobile: filteredUsers?.mobile,
      };
  } else if (selectedOption === 'Weekly') {
      return {
          desktop: filteredUsers?.desktopWeekly,
          mobile: filteredUsers?.mobileweekly,
      };
  } else if (selectedOption === 'Monthly') {
      return {
          desktop: filteredUsers?.desktopMonthly,
          mobile: filteredUsers?.mobilemonthly,
      };
  } else {
      // Default case
      return {
          desktop: 0,
          mobile: 0,
      };
  }
};
function truncateText(text, maxLength) {
  if (text?.length <= maxLength) {
    return text;
  } else {
    return text?.slice(0, maxLength) + '...';
  }
}
var widthiner= window.innerWidth
  return (
    <>
    <div className='analytics' style={{backgroundColor:color}}>
    <h1>{t("Analytics")}</h1>
    <div className='chart'>
    <div className='sessionby'>
    <div className='session-dev'>
    <h3>{t("Sessions by Device")}</h3>
    </div>
    <span style={{display:'flex'}}> <div className='button-session' onClick={handleOpenMenu2}>
    <span>
    <h5 style={{fontFamily:'inter',fontSize:'12px'}} >{t(selectedOption ? selectedOption : 'Daily')}</h5>
  </span>
    <img width="15" height="15" src="https://img.icons8.com/ios-glyphs/96/expand-arrow.png" alt="expand-arrow"/>
    </div>{'\u00A0'}
    <h5 className='button-session' style={{fontFamily:'inter',fontSize:'12px'}} onClick={handleopen} >{t("Reset")}<GrPowerReset/></h5> </span>
    <AnalyticDropdown
    anchorEl2={anchorEl2}
    handleCloseMenu={handleCloseMenu2}
    handleSelectOption={handleSelectOption}
/>

    </div>



    <BarChart
    xAxis={[
      {
        id: "barCategories",
        data: [truncateText(t("Desktop"),8), t("Mobile")],
        scaleType: "band",
      },
    ]}
    series={[
      {
        data: [
          computeChartData().desktop,
          computeChartData().mobile,
        ],
      },
    ]}
    colors={["#767676","#EBA21E",]}
    width={ widthiner>=400? '360' : '300'}
    height={300}
  />
  

  <div className='desk-mobl'>
    <div className='desk-dev1'>
    <div className='deskdiv-singal'>
  <span><img width="15" height="15" id='des-img-ss' src="https://img.icons8.com/ios/96/767676/imac.png" alt="imac"/> {truncateText(t("Desktop"),8)}</span>
    </div>
    <div className='deskdiv-singal2'>
  <span><p> 
  {selectedOption === 'Daily' && (
            <h5 style={{ fontFamily: 'inter', fontSize: '12px' }}>
                {returnPercentage(filteredUsers?.desktopDay, filteredUsers?.desktopDay + filteredUsers?.mobile)}%
            </h5>
        )}
        
        {selectedOption === 'Weekly' && (
          <h5 style={{ fontFamily: 'inter', fontSize: '12px' }}>
          {returnPercentage(filteredUsers?.desktopWeekly, filteredUsers?.desktopWeekly + filteredUsers?.mobileweekly)}%
      </h5>
        )}

        {selectedOption === 'Monthly' && (
          <h5 style={{ fontFamily: 'inter', fontSize: '12px' }}>
                {returnPercentage(filteredUsers?.desktopMonthly, filteredUsers?.desktopMonthly + filteredUsers?.mobilemonthly)}%</h5>
        )}</p></span>
    </div>

  <div>
  </div>
    </div>
    <div className='desk-dev1'>
    <div className='deskdiv-singal'>
  <span><img width="17" height="15" id='des-img-s1'  src="https://img.icons8.com/ios-glyphs/96/iphone.png" alt="iphone"/> {t("Mobile")}</span>
    </div>
    <div className='deskdiv-singal2'>
  <span><p>
  {selectedOption === 'Daily' && (
            <h5 style={{ fontFamily: 'inter', fontSize: '12px' }}>
                {returnPercentage(filteredUsers?.mobile, filteredUsers?.mobile + filteredUsers?.desktopDay)}%
            </h5>
        )}
        
        {selectedOption === 'Weekly' && (
          <h5 style={{ fontFamily: 'inter', fontSize: '12px' }}>
          {returnPercentage(filteredUsers?.mobileweekly, filteredUsers?.mobileweekly + filteredUsers?.desktopWeekly)}%
      </h5>
        )}

        {selectedOption === 'Monthly' && (
          <h5 style={{ fontFamily: 'inter', fontSize: '12px' }}>
                {returnPercentage(filteredUsers?.mobilemonthly, filteredUsers?.mobilemonthly + filteredUsers?.desktopMonthly)}%</h5>
        )}</p>
  </span>
    </div>
  <div>
  </div>
    </div>
    </div>
    </div>
    <div className='mobile-category'>
    <div className='mobile-side'>
    <div className='andriod'>
    <div className='txt-ana' >
    <h6>{t("Mobile Category")}</h6>
    </div>
    <img id='andriod-img' src='images/Rectangle 228.png'/>
    <div className='percentage'>
    <h3>{t("Andriod")}</h3>
    <p>{returnPercentage(filteredUsers?.totalandroid,filteredUsers?.totalandroid+filteredUsers?.totaliphone)}%</p>
    </div>
    </div>
    <div className='andriod'>
    <img id='andriod-img' src='images/Rectangle 2299.png'/>
    <div className='percentage'>
    <h6>{t("Iphone")}</h6>
    <h4>{returnPercentage(filteredUsers?.totaliphone,filteredUsers?.totaliphone+filteredUsers?.totalandroid)}%</h4>
    </div>
    </div>
    </div>
    <img id='mobile-img' src='images/Group 1340.png'/>
    </div>
    <div className='total-pops'>
    <div className='single-total'>
    <div className='total-img'>
    <img  src="https://img.icons8.com/parakeet-line/96/nui2.png" alt="nui2"/>
    </div>
    <p>{t("Total View")}</p>
    <h5>{filteredUsers.totalViews === 0 ? 0:filteredUsers.totalViews }</h5>
    </div>
    <div className='single-total'>
    <div className='total-img'>
    <img  src="https://img.icons8.com/wired/96/broken-link.png" alt="broken-link"/>
    </div>
    <p>{t("Total Link Clicks")}</p>
    <h5>{filteredUsers.totalClicks}</h5>
    </div>
    <div className='single-total'>
    <div className='total-img'>
    <img src="https://img.icons8.com/ios/96/add-user-group-man-man.png" alt="add-user-group-man-man"/>
    </div>
    <p>{t("Total Connections")}</p>
    <h5>{filteredUsers.totalLeads !== 0 ? filteredUsers.totalLeads : 0}
    </h5>
    </div>
    <div className='single-total'>
    <div className='total-img'>
    <img src="https://img.icons8.com/wired/96/broken-link.png" alt="broken-link"/>
    </div>
    <p>{t("Tap Through Rat")}</p>
    <h5>
    {filteredUsers?.totalViews !== 0
      ? returnPercentage(filteredUsers?.totalClicks, filteredUsers?.totalViews) + "%"
      : "0%"}
  </h5>
  
    </div>
    </div>
    <div className='app-mesg'>
    {links.map((app, index) => (
      <div className='single-app1' key={index}>
        <span style={{ display: 'flex' }}>
          <div className='img-bg-4'>
          <img height={24} width={24} src={returnIcons(app.linkId)} alt={app.altname} />
          </div>
          {'\u00A0'}{'\u00A0'}{'\u00A0'}
          <div className='app-txt1'>
            <h4>{t(app.name)}</h4>
            <p>{app.clicks} {t("times user click on that.")}</p>
          </div>
        </span>
        <div className='mesg-count'>
          <h3>{app.clicks}</h3>
        </div>
      </div>
    ))}
  </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
   
    </div>
    <Footer/>
    <Modal open={confirmation} onClose={handleClose}>
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
    <img width="60" height="60" src="https://img.icons8.com/bubbles/100/recurring-appointment.png" alt="recurring-appointment"/></p>
      
      <Typography variant="body2" sx={{ fontFamily: 'Inter',margin:'10px',textAlign:'center' }}>
      {t("Are you sure want create new account?")}
      </Typography>
      <Box mt={2} display="flex" justifyContent="center">
      <Button onClick={handleClose}  sx={{ fontFamily: 'Inter',color:'black',background: "#77cbd2",borderRadius:'20px',fontSize:"10px",width:'100px',height:'35px', "&:hover": {
        background: "#0079bf", // Change color on hover
      }, }}>
      {t("Cancel")}
      </Button>{'\u00A0'}
        <Button onClick={handleResetButtonClick}  sx={{ fontFamily: 'Inter',color:'black',background: "#f9dbd2",fontSize:"10px",borderRadius:'20px',width:'100px',height:'35px', "&:hover": {
          background: "#0079bf", // Change color on hover
        }, }}>
        {t("Yes, Reset")}
        </Button>
       
      </Box>
    </Box>
  </Modal>
    </>
  )
}
