import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Modalpopup from './Modalpopup';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({ name: 'English', flag: 'images/United Kingdom.png' });
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);   
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    // Retrieve selected language from local storage when component mounts
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      setSelectedLanguage(JSON.parse(storedLanguage));
    }
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    // Store selected language in local storage
    localStorage.setItem('selectedLanguage', JSON.stringify(language));
    // Change language using i18n
    i18next.changeLanguage(language.name.toLowerCase());
    // Close the modal after language selection
    handleClose();
  };

  return (
    <>
      <div className='login'>
        <Modalpopup open={open} handleClose={handleClose} handleLanguageSelect={handleLanguageSelect} />
        <div className='box'>
          <img src="images/upgraving_logo new (5).png"  alt="..." />
        </div>
        <div className='hedding'>
          <h1>{t("Time")}</h1>
          <p>{t("loginmsg")}</p>
          <img src='images/bro.png' alt="..." />
          <span style={{display:'flex', marginTop:'40px', width:'100%',justifyContent:'center'}}>
            <Link className='button2' to="/login">{t("Login")}</Link>{'\u00A0'}{'\u00A0'}
            <Link id='button22' to="/signup">{t("Signup")}</Link>
          </span>
        </div>

        <div className='language' >
          <h1>{t("Choose Your Language")}</h1>
          <div className='country' onClick={handleOpen}>
            <div className='countries'>
              <img src={selectedLanguage.flag} alt="..." />
              <span id='lanchos'>{selectedLanguage.name}</span>
              <span>
                <img id='logindropdownbutton' src="https://img.icons8.com/ios-glyphs/96/expand-arrow--v1.png" alt="expand-arrow--v1"/>
              </span>
            </div>
          </div>
        </div>
        <br></br>
      </div>
      <ToastContainer
      position="top-center"
      reverseOrder={false}
    />
    </>
  );
}
