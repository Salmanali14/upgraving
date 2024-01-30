import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Modalpopup from './Modalpopup';
export default function Login() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
    <div className='login'>
    <Modalpopup open={open} handleClose={handleClose}/>
    <div className='box'>
    <img src="images/upgraving_logo new (5).png"  alt="..." />
    </div>
    <div className='hedding'>
    <h1>Time To Network</h1>
    <p>With a tap of your device or scan of your QR code, share your info with anyone you meet.</p>
    <img src='images/bro.png'></img>
    <span style={{display:'flex', marginTop:'40px', width:'100%',justifyContent:'center'}}>
    <Link className='button2' to="/login">Login</Link>{'\u00A0'}{'\u00A0'}
    <Link id='button22' to="/signup">Signup</Link></span>
    </div>
   
    <div className='language' >
    <h1>Choose Your Language</h1>
    <div className='country' onClick={handleOpen}>
    <div className='countries'>
    <img src="images/United Kingdom.png"  alt="..." /> <span id='lanchos'>Select Language</span><span><img id='logindropdownbutton' src="https://img.icons8.com/ios-glyphs/96/expand-arrow--v1.png" alt="expand-arrow--v1"/></span>
    </div>
    </div>
    </div>
    <br></br>
    
    </div>
    </>
  )
}
