import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Login.css'; // Import your CSS file
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
import { onValue, ref } from 'firebase/database';
import { db } from './firebaseConfig';
export default function Footer() {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);   
  const location = useLocation();

  const isLogin1Path = location.pathname === '/home';
  const isconPath = location.pathname === '/connections';
  const isconPath1 = location.pathname === '/analytics';
  const isconPath2 = location.pathname === '/setting';
  const isconPath23 = location.pathname === '/list';
  const isconPath24 = location.pathname === '/groupconnections';
  const isconPath25= location.pathname === '/grouplist';
  const [selectlng, setSelectLng] = useState({});
  let currentUser = localStorage.getItem("useruid")
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
  return (
    <div className='Footer'>
      <div className='textlinkfooter'>
        <Link className={`foterlink ${isLogin1Path ? 'active' : ''}`} to="/home">
        <img id='imgft' src='/country/user22.png'/>
          <p style={selectlng === 'japanese' ? { width: "60px",textAlign:"center" }: selectlng === 'thai' ? { width: "36px",textAlign:"center" }: selectlng === 'arabic' ? { width: "65px",textAlign:"center" } : null}>{t("Profile")}</p>
        </Link>
        <Link className={`foterlink ${(isconPath || isconPath23 || isconPath24 || isconPath25) ? 'active' : ''}`} to="/connections">
        <img id='imgft' src='/country/Followers.png'/>
          <p style={selectlng === 'japanese' ? { width: "20px",textAlign:"center" }: selectlng === 'thai' ? { width: "50px",textAlign:"center" } : null}>{t("Connections")}</p>
        </Link>
        <Link className={`foterlink ${isconPath1 ? 'active' : ''}`} to="/analytics">
        <img id='imgft' src='/country/Stats.png'/>
          <p style={selectlng === 'japanese' ? { width: "20px",textAlign:"center" }: selectlng === 'thai' ? { width: "50px",textAlign:"center" } : null}>{t("Analytics")}</p>
        </Link>
        <Link className={`foterlink ${isconPath2 ? 'active' : ''}`} to="/setting">
        <img id='imgft' src='/country/Settings.png'/>
          <p style={selectlng === 'japanese' ? { width: "20px",textAlign:"center" }: selectlng === 'thai' ? { width: "40px",textAlign:"center" } : null}>{t("Settings")}</p>
        </Link>
      </div>
    </div>
  );
}
