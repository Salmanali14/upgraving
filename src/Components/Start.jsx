import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom';
export default function Start() {
  return (
    <div className='start'>
    <img src='images/upgraving_logo new (5).png' alt='start'></img>
    <img id='startimg' src='images/Group 1516.png'></img>
    <Link className='button7' to="/start1">Start</Link>
    </div>
  )
}
