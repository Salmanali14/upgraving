import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom';
export default function Signup() {
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
    <div className='heddingsignup'>
    <h1 id='signuppageh1'>Signup Your Account</h1>
    <p id='signuppagep'>Unlock Exclusive Access: Sign Up and Experience a World of Benefits! </p>
    <img id='signuppageimg' src='images/rafiki.png'></img>
    </div>
    <div className='signupninput'>
    <label id='loginpass'>Username</label>
    <input type='text' name='text' placeholder='Enter Username'/>
    <label>Email</label>
    <input type='email' name='Email' placeholder='Enter Email'/>
    </div>
    <label id='signupnpass'>Password</label>
    <div className='passwordeyediv'>
    
    <input type='password' name='Password' placeholder='Enter Password' /><img width="24" height="24" src="https://img.icons8.com/external-febrian-hidayat-basic-outline-febrian-hidayat/96/external-eye-user-interface-febrian-hidayat-basic-outline-febrian-hidayat.png" alt="external-eye-user-interface-febrian-hidayat-basic-outline-febrian-hidayat"/>
    </div>
    <Link className='forgetbutton' to="/login1">Login</Link>
    <br></br>
    </div>
    </>
  )
}

