import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import './Login.css';

export default function Start() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to navigate to /start1 after 2 seconds
    const timeoutId = setTimeout(() => {
      navigate('/start1');
    }, 2000);

    // Clear the timeout when the component unmounts or when the navigation occurs
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className='start'>
      <img src='images/upgraving_logo new (5).png' alt='start'></img>
      <BeatLoader color="black" loading={true} size={10} speedMultiplier={1} />
    </div>
  );
}
