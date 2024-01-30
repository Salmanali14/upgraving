import React from 'react'
import './Login.css';
import { Link } from 'react-router-dom';
const profiles = [
    {
      name: 'Drake Adwin',
      role: 'Project Manager',
      description: 'Lorem ipsum dolor sit amet consectetur. Aliquet nunc augue praesent lectus sodales.',
    },
  ];
export default function Exchangecontact() {
  return (
    <div className='home'>
        <div className='main-hed-page'>
        <Link to="/prevprofile">
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
          <img className='cover' src='images/Rectangle 1.png' alt='coverimg' />
          <img className='profile13' src='images/Ellipse 1.png' alt='proffileimg' />
          <img className='icon' src='images/Ellipse 2.png' alt='iconimg' /><img className='icon4' src='images/Photo camera.png' alt='coverimg' />
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
        <div className='exchange-input'>
        <div className='Inputfieldprofile'>
        <h1 id='personaldetail'>Personal Detail</h1>
        <div className='inputfield'>
        <input type='text' name='full name' placeholder='Full Name'/>
        <input type='text' name='City name' placeholder='City Name'/>
        <input type='text' name='Job Tital' placeholder='Job Tital'/>
        <input type='text' name='Company Name' placeholder='Company Name'/>
        <textarea id='biofield' type='Bio' name='full name' placeholder='Bio'></textarea>
        </div>
        </div>
        </div>
        <button id='submit-btn-exchange'>Submit</button>
        </div>
  )
}
