import React,{useState} from 'react'
import './Login.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { CiGrid41 } from "react-icons/ci";
import { BsListCheck } from "react-icons/bs";
import DefaultprofileList from './DefaultprofileList';
export default function List() {

  return (
    <div className='Connections'>
    <h1 id='con-hed-main'>Connections</h1>
    <div className='search-con'>
    <img width="20" height="20" src="https://img.icons8.com/ios/96/search.png" alt="search"/>
    <input type='text' name='Search' placeholder='Search'/>
    </div>
    <div className='connection-btn'>
    <Link to='/connections'>
    <button id='peo-btn'>People</button></Link>
    <Link to='/groupconnections'>
    <button id='group-btn'>Groups</button>
    </Link>
    </div>
    <div className='connection-hed'>
    <h1> Add Connections</h1>
    <p>Develop your network by meeting new individuals and having them click the "exchange contact" button on your profile.</p>
    </div>
    <div className="heading-container" id='hedding-line-width'>
    <div className="line"></div>
    <h1 className="centered-heading" id='line-hed'>All Connections</h1>
    <div className="line"></div>
    </div>
   <div className='grid'>
   <div className='connection-btn44'>
    <Link to='/connections'>
    <button id='group-btn512'><CiGrid41 /> {'\u00A0'}Grid{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</button></Link>
    <Link to='/list'>
    <button id='peo-btn512'><BsListCheck />{'\u00A0'}List</button>
    </Link>
    </div>
   </div>
   <DefaultprofileList/>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>

  <Footer/>
      </div>
   
  )
}
