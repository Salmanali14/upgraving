import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { update, ref, push, get, child } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { db } from './firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const history = useNavigate();
  let userid = useParams()
  console.log(userid)

  const isUsernameUnique = async (username) => {
    const snapshot = await get(child(ref(db), `user`));
    if (snapshot.exists()) {
      const user = snapshot.val();
      return !Object.values(user).some(user => user.userName === username);
    }
    return true;
  };

  const handleSignup = async () => {
    if (!username) {
      toast.error(t("Please add a username"));
      return; // Exit the function early if username is empty
    }
  
    if (email && password) {
      // Validate email format using regular expression
      const emailRegEx = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z]{2,8})?$/;
      if (!emailRegEx.test(email)) {
        toast.error(t("Please enter a valid email"));
        return; // Exit the function if email format is invalid
      }
  
      const isUnique = await isUsernameUnique(username);
      if (isUnique) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          localStorage.removeItem("useruid");
          localStorage.setItem("useruid", user.uid);
          localStorage.setItem("parentid", user.uid);
          await update(ref(db, `user/${user.uid}`), {
            fullname: '',
            userName: username,
            id: user.uid,
            parentId: "",
            email: email,
            location: '',
            jobtitle: '',
            company: '',
            bio: '',
            profileImage: '',
            logoImage: '',
            coverImage: '',
            colors: '',
            links: '',
            leadmode: '',
            directmode: '',
            language: '',
            phone: '',
            darkmode: '',
            profilelockmode: '',
            theme:'',
          });
          toast.success(t("New user created successfully"));
          setTimeout(() => {
            history("/home");
          }, 2000); // 2000 milliseconds delay (2 seconds)
        } catch (error) {
          const errorCode = error.code;
          console.error(error.message);
          if (errorCode === "auth/invalid-email") {
            toast.error(t("Please enter a valid email"));
          } else if (errorCode === "auth/email-already-in-use") {
            toast.error(t("Email already exists"));
          } else if (errorCode === "auth/weak-password") {
            toast.error(t("Password must be at least 6 characters"));
          }
        }
      } else {
        toast.error(t("Username already exists"));
      }
    } else {
      toast.error(t("Email and password should not be empty!"));
    }
  };
  
  

  return (
    <>
      <div className='login'>
        <Link to='/login2'>
          <div className='backimgdiv'>
            <img id="backimg" src='images/Back.png' alt="Back" />
          </div>
        </Link>
        <div className='box'>
          <img src="images/upgraving_logo new (5).png" alt="..." />
        </div>
        <div className='heddingsignup'>
          <h1 id='signuppageh1'>{t("Signup Your Account")}</h1>
          <p id='signuppagep'>{t("signuppage")} </p>
          <img id='signuppageimg' src='images/rafiki.png' alt="Rafiki" />
        </div>
        <div className='signupninput'>
          <label id='loginpass'>{t("Username")}</label>
          <input type='text' name='username' placeholder={t("Enter username")} value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>{t("Email")}</label>
          <input type='email' name='email' placeholder={t("Enter Email")} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='signupninput1 ' style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
          <label id='signupnpass'>{t("Password")}</label>
          <div className='passwordeyediv'>
            <input type={showPassword ? 'password' : 'text'} name='password' placeholder={t("Enter Password")} value={password} onChange={(e) => setPassword(e.target.value)} />
            {showPassword ? (
              <FaRegEyeSlash onClick={() => setShowPassword(false)} />
            ) : (
              <MdOutlineRemoveRedEye onClick={() => setShowPassword(true)} />
            )}
          </div>
        </div>
        <button className='forgetbutton' onClick={handleSignup}>{t("Create account")}</button>
        <div style={{ fontSize: '14px', fontWeight: '400', marginTop: '10px' }}>{t("Already have an account?")}<Link to="/login"><b style={{ color: 'black', marginLeft: '2px' }}>{t("Login")}</b></Link></div>
        <br></br>
      </div>
      <ToastContainer
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}
