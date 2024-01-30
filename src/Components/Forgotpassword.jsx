import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom';
export default function Forgotpassword() {
  return (
    <>
    <div className='login'>
    <div className='backimgdiv'>
   <Link to='/login2' ><img id="backimg" src='images/Back.png'></img>
   </Link>
    </div>
    <div className='box'>
    <img src="images/upgraving_logo new (5).png"  alt="..." />
    </div>
    <div className='hedding'>
    <h1 id='loginpageh1'>Reset Password!</h1>
    <p id='loginpagep'>Please enter your email address to reset your password!</p>
    <img id='forgotpageimg' src='images/forgot.png'></img>
    </div>
    <div className='logininput'>
    <label>Email</label>
    <input type='email' name='Email' placeholder='Enter Email'/>
    </div>
    <Link className='forgetbutton' to="/login1">Login</Link>
    <br></br>
    </div>
    </>
  )
}

