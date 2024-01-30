import React from 'react'
import './Login.css'
import Footer from './Footer'
import { Link } from 'react-router-dom';
export default function PrevProfile() {
  const profiles = [
    {
      name: 'Drake Adwin',
      role: 'Project Manager',
      description: 'Lorem ipsum dolor sit amet consectetur. Aliquet nunc augue praesent lectus sodales.',
    },
  ];
  const links = [
    { imgSrc: 'https://img.icons8.com/fluency-systems-filled/96/FFFFFF/phone-disconnected.png', altText: 'phone-disconnected', text: 'Call' },
    { imgSrc: 'https://img.icons8.com/material-rounded/96/FFFFFF/user.png', altText: 'user', text: 'Contact' },
    { imgSrc: 'https://img.icons8.com/material-rounded/96/FFFFFF/facebook-f--v1.png', altText: 'facebook-f', text: 'Facebook' },
    { imgSrc: 'https://img.icons8.com/windows/96/FFFFFF/telegram-app.png', altText: 'telegram-app', text: 'Telegram' },
    { imgSrc: 'https://img.icons8.com/material-rounded/96/FFFFFF/new-post.png', altText: 'new-post', text: 'Email' },
    { imgSrc: 'https://img.icons8.com/sf-regular/96/FFFFFF/messaging-.png', altText: 'messaging-', text: 'Chat' },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/FFFFFF/facebook-messenger.png', altText: 'facebook-messenger', text: 'Messenger' },
    { imgSrc: 'https://img.icons8.com/ios/96/FFFFFF/dining-room.png', altText: 'dining-room', text: 'Menu' },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/FFFFFF/whatsapp--v1.png', altText: 'whatsapp--v1', text: 'WhatsApp' },
    { imgSrc: 'https://img.icons8.com/ios-glyphs/96/FFFFFF/discord-logo.png', altText: 'discord-logo', text: 'Discord' },
    { imgSrc: 'https://img.icons8.com/ios-filled/98/FFFFFF/gmail-new.png', altText: 'gmail-new', text: 'Gmail' },
    { imgSrc: 'https://img.icons8.com/ios-filled/96/FFFFFF/cash-app.png', altText: 'cash-app', text: 'Cash App' },
   
  ];
  return (
    <>
    <div className='home'>
    <div className='main-hed-page'>
    <Link to="/login1">
    <div className="back-Div">
      <img
       id='back-div-icon'
        src="https://img.icons8.com/ios-glyphs/96/back.png"
        alt="back"
      />
    </div>
    </Link>
    <div className='web-icon-page'>
    <img id='web-icon' src='images/upgraving_logo 1 (5).png'/>
    </div>
    <div></div>
    </div>
        <div className='coverimg'>
            <img  className='cover' src='images/Rectangle 1.png' alt='coverimg'/> 
            <img  className='profile13' src='images/Ellipse 1.png' alt='proffileimg' />
            <img  className='icon' src='images/Ellipse 2.png' alt='iconimg'/><img  className='icon4' src='images/Photo camera.png' alt='coverimg'/> 
        </div>
        <div className='profiletext'>
        {profiles.map((profile, index) => (
          <div key={`profile-${index}`} className='username'>
            <h2>{profile.name}</h2>
            <h4>{profile.role}</h4>
            <p>{profile.description}</p>
          </div>
        ))}
      </div>
    <div className='Profilebutton1'>
    <button>Save Contact <img src='images/Vector 1.png'></img></button> 
    <Link   id='exchangebutton' to='/exchangecontact'>
    Exchange Contact</Link>
    </div>
    <div className="heading-container">
    <div className="line"></div>
    <h1 className="centered-heading">Link</h1>
    <div className="line"></div>
  </div>
  <div className='addlink' style={{ marginTop: '-10px' }}>
          {links.map((link, index) => (
            <div key={`link-${index}`} className='textlink'>
              <div className='link'>
                <img src={link.imgSrc} alt={link.altText} />
              </div>
              <p>{link.text}</p>
            </div>
          ))}
        </div>
  <br></br>
  
 

     </div>

    
    </>
  )
}
