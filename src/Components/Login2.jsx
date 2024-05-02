import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageContext } from './LanguageContext';
import { useTranslation } from 'react-i18next';
import { child, equalTo, get, onValue, orderByChild, query, ref, set } from 'firebase/database';
export default function Login2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);   
  const history = useNavigate();

 const handleLogin = () => {
 
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("useruid", user?.uid);
          localStorage.setItem("parentid", user.uid);
          toast.success(t("Successfully Login!"));
          setTimeout(() => {
            history("/home");
          }, 2000); // 2000 milliseconds delay (2 seconds)
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(error.message);
          if (error.code === "auth/invalid-email") {
            toast.error(t("Invalid  Emial!"));
          } else if (error.code === "auth/invalid-credential") {
            toast.error(t("Invalid password!"));
          } else {
            toast.error(errorMessage);
          }
        });
    } else {
      toast.error(t("Email and password should not be empty!"));
    }
  };
  const provider = new GoogleAuthProvider();

const handleSignUpGoogle = () => {
  signInWithPopup(auth, provider)
    .then((response) => {
      console.log(response, "this is the console of response");
      localStorage.setItem("parentid", response?.user?.uid);
      localStorage.setItem("useruid", response?.user?.uid);
      // Query user data
      const deviceRef = query(
        ref(db, "/user"),
        orderByChild("id"),
        equalTo(response?.user?.uid)
      );

      onValue(deviceRef, (snapshot) => {
        const userData = snapshot.val();
        console.log(userData);
        
        if (!userData) {
          // User doesn't exist in database, create a new entry
          set(ref(db, "user/" + response?.user?.uid), {
            email: response?.user?.email,
            id: response?.user?.uid,
            fullname: response?.user?.displayName,
            profileUrl: response?.user?.photoURL,
            userName: response?.user?.displayName,
            parentId: "",
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
        }
      });

      // Redirect to home page
      toast.success("Login successful");
      setTimeout(() => {
        history("/home");
      }, 2000);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

  return (
    <>
      <div className='login'>
       
          <Link to='/login2'> <div className='backimgdiv'><img id="backimg" src='images/Back.png' alt="Back" />     </div></Link>
   
        <div className='box'>
          <img src="images/upgraving_logo new (5).png" alt="Upgraving Logo" />
        </div>
        <div className='hedding'>
          <h1 id='loginpageh1'>{t("Login Your Account")}</h1>
          <p id='loginpagep'>{t("loginpage")}</p>
          <img id='loginpageimg' src='images/pana.png' alt="Pana" />
        </div>
        <div style={{width:'100%'}}>
        <div className='logininput'>
          <label>{t("Email")}</label>
          <input type='email' name='Email' placeholder={t('Enter Email')} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='logininput'>
        <label id='loginpass'>{t("Password")}</label>
        <div className='passwordeyediv'>
          <input type={showPassword ? 'password' : 'text'} name='Password' placeholder={t('Enter Password')} value={password} onChange={(e) => setPassword(e.target.value)} />
          {showPassword ? (
            <FaRegEyeSlash onClick={() => setShowPassword(false)} />
          ) : (
            <MdOutlineRemoveRedEye onClick={() => setShowPassword(true)} />
          )}
        </div>
        </div>
        </div>
        <div className='forgtpass'>
          <Link id='forgttext' to="/forgot">{t("Forgot Password?")}</Link>
        </div>
        <button className='forgetbutton' style={{border:'none'}} onClick={handleLogin}>{t("Login")}</button>
        <div style={{ fontSize: '14px', fontWeight: '400', marginTop: '10px' ,border:'none' }}>{t("Don't have an account?")}<Link to="/signup"><b style={{ color: 'black', marginLeft:'2px'}}>{t("Signup")}</b></Link></div>
        <br></br>
        <img onClick={handleSignUpGoogle} width="30" height="30" src="https://img.icons8.com/color/96/google-logo.png" alt="google-logo"/>
        <br></br>
      </div>
      <ToastContainer
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}
