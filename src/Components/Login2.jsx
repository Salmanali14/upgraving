import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom';
export default function Login2() {
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
    <h1 id='loginpageh1'>Login Your Account</h1>
    <p id='loginpagep'>Access Your Account: Begin Your Digital Journey with a Secure Login.</p>
    <img id='loginpageimg' src='images/pana.png'></img>
    </div>
    <div className='logininput'>
    <label>Email</label>
    <input type='email' name='Email' placeholder='Enter Email'/>
    </div>
    <label id='loginpass'>Password</label>
    <div className='passwordeyediv'>
    
    <input type='password' name='Password' placeholder='Enter Password' /><img width="24" height="24" src="https://img.icons8.com/external-febrian-hidayat-basic-outline-febrian-hidayat/96/external-eye-user-interface-febrian-hidayat-basic-outline-febrian-hidayat.png" alt="external-eye-user-interface-febrian-hidayat-basic-outline-febrian-hidayat"/>
    </div>
    <div className='forgtpass'>
    <Link id='forgttext' to="/forgot">Forgot Password?</Link>
    </div>
    <Link className='forgetbutton' to="/login1">Login</Link>
    <br></br>
    </div>
    </>
  )
}

