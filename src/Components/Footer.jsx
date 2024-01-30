import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Login.css'; // Import your CSS file

export default function Footer() {
  const location = useLocation();

  const isLogin1Path = location.pathname === '/login1';
  const isconPath = location.pathname === '/connections';
  const isconPath1 = location.pathname === '/analytics';
  const isconPath2 = location.pathname === '/setting';
  const isconPath23 = location.pathname === '/list';
  const isconPath24 = location.pathname === '/groupconnections';
  const isconPath25= location.pathname === '/grouplist';
  return (
    <div className='Footer'>
      <div className='textlinkfooter'>
        <Link className={`foterlink ${isLogin1Path ? 'active' : ''}`} to="/login1">
          <img width="30" height="30" src="https://img.icons8.com/small/96/administrator-male.png" alt="administrator-male"/>
          <p>Profile</p>
        </Link>
        <Link className={`foterlink ${(isconPath || isconPath23 || isconPath24 || isconPath25) ? 'active' : ''}`} to="/connections">
          <img width="30" height="30" src="https://img.icons8.com/small/96/user-group-woman-woman.png" alt="user-group-woman-woman"/>
          <p>Connections</p>
        </Link>
        <Link className={`foterlink ${isconPath1 ? 'active' : ''}`} to="/analytics">
          <img width="30" height="30" src="https://img.icons8.com/fluency-systems-regular/96/web-analystics.png" alt="web-analystics"/>
          <p>Analytics</p>
        </Link>
        <Link className={`foterlink ${isconPath2 ? 'active' : ''}`} to="/setting">
          <img width="30" height="30" src="https://img.icons8.com/ios/96/settings--v1.png" alt="settings--v1"/>
          <p>Settings</p>
        </Link>
      </div>
    </div>
  );
}
