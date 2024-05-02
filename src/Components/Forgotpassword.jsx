import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from './firebaseConfig';
import { sendPasswordResetEmail } from "firebase/auth"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
import { equalTo, orderByChild, query, ref, get, onValue } from 'firebase/database';

export default function Forgotpassword() {
  const [email, setEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);   

  const handleResetPassword = async () => {
    try {
      if (!email) {
        toast.error(t("Please enter a valid email address."));
        return;
      }

      const emailRegEx =
        /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
      if (!emailRegEx.test(email)) {
        toast.error(t("Please enter a valid email address."));
        return;
      }

      const deviceRef = query(
        ref(db, "/user"),
        orderByChild("email"),
        equalTo(email)
      );

      onValue(deviceRef, (snapshot) => {
        const userData = snapshot.val();
        console.log(userData);
  
        if (!userData) {
          toast.error(t("This email does not have an associated account."));
          return;
        }
  
        // Email exists, proceed with password reset
        sendPasswordResetEmail(auth, email)
          .then(() => {
            toast.success(t("Password reset email sent. Check your inbox."));
            setEmail("");
          })
          .catch((error) => {
            console.error(error);
            toast.error("Error sending password reset email.");
          });
      });
    } catch (error) {
      console.error(error);
      toast.error("Error sending password reset email.");
    }
  };

  return (
    <>
      <div className='login'>
        <Link to='/login'>
          <div className='backimgdiv'>
            <img id="backimg" src='images/Back.png' alt="Back" />
          </div>
        </Link>
        <div className='box'>
          <img src="images/upgraving_logo new (5).png" alt="..." />
        </div>
        <div className='hedding'>
          <h1 id='loginpageh1'>{t("Reset Password")}</h1>
          <p id='loginpagep'>{t("Please enter your email address to reset your password.")}</p>
          <img id='forgotpageimg' src='images/forgot.png' alt="Forgot Password" />
        </div>
        <div className='logininput'>
          <label>{t("Email")}</label>
          <input type='email' name='email' placeholder={t("Enter Email")} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        {resetEmailSent ? (
          <p>{t("Password reset email sent. Check your inbox.")}</p>
        ) : (
          <>
            {error && <p>{error}</p>}
            <button className='forgetbutton' onClick={handleResetPassword}>{t("Reset Password")}</button>
          </>
        )}
        <br />
      </div>
      <ToastContainer
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
}
