import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import './Login.css';

export default function Start() {
  const navigate = useNavigate();


 

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const currentUser = localStorage.getItem('useruid');
      if (!currentUser) {
     
        navigate('/start1');
      } else {
   
        navigate('/login2');
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []); 



  return (
    <div className='start'>
      <img src='images/upgraving_logo new (5).png' alt='start'></img>
      <BeatLoader color="black" loading={true} size={10} speedMultiplier={1} />
    </div>
  );
}
