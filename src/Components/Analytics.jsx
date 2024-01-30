import React,{useState} from 'react';
import Footer from './Footer';
import { LineChart } from '@mui/x-charts/LineChart';
import AnalyticDropdown from './AnalyticDropdown';

export default function Analytics() {
  const [anchorEl2, setAnchorEl] = useState(null);

  const handleOpenMenu2 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu2 = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <div className='analytics'>
    <h1>Analytics</h1>
    <div className='chart'>
    <div className='sessionby'>
    <div className='session-dev'>
    <h3>Sessions by Device</h3>
    <p>Last 30 Days</p>
    </div>
    <div className='button-session' onClick={handleOpenMenu2}>
    <span>
    <h5 >Month</h5>
  </span>
    <img width="15" height="15" src="https://img.icons8.com/ios-glyphs/96/expand-arrow.png" alt="expand-arrow"/>
    </div>
    <AnalyticDropdown anchorEl2={anchorEl2} handleCloseMenu={handleCloseMenu2} />
    </div>
    <LineChart
    xAxis={[
      {
        data: [1, 2, 3, 5, 8, 10, 12, 15, 16],
      },
    ]}
    series={[
      {
        data: [2, 5.5, 2, 8.5, 1.5, 5],
        valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
        color: '#767676', 
      },
      {
        data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
        color: 'black', 
      },
     
    ]}
    height={142}
    margin={{ top: 10, bottom: 20 }}
  />
  <div className='desk-mobl'>
    <div className='desk-dev1'>
    <div className='deskdiv-singal'>
  <span><img width="15" height="15" id='des-img-ss' src="https://img.icons8.com/ios/96/767676/imac.png" alt="imac"/> Desktop</span>
    </div>
    <div className='deskdiv-singal2'>
  <span><p>53.6%</p><h4>60%</h4><img  style={{ marginLeft:'2px'}} width="8" height="8" src="https://img.icons8.com/pastel-glyph/96/6CDB15/climb-arrow.png" alt="climb-arrow"/></span>
    </div>
  <div>
  </div>
    </div>
    <div className='desk-dev1'>
    <div className='deskdiv-singal'>
  <span><img width="17" height="15" id='des-img-s1'  src="https://img.icons8.com/ios-glyphs/96/iphone.png" alt="iphone"/> Mobile</span>
    </div>
    <div className='deskdiv-singal2'>
  <span><p>44.6%</p><h4 id='dfd'>40%</h4><img
  style={{ transform: 'rotate(180deg)', marginLeft:'2px' }}
  width="8"
  height="8"
  src="https://img.icons8.com/pastel-glyph/96/EE0E00/climb-arrow.png"
  alt="climb-arrow"
/></span>
    </div>
  <div>
  </div>
    </div>
    </div>
    </div>
    <div className='mobile-category'>
    <div className='mobile-side'>
    <div className='andriod'>
    <div className='txt-ana' >
    <h6>Mobile Category</h6>
    </div>
    <img id='andriod-img' src='images/Rectangle 228.png'/>
    <div className='percentage'>
    <h3>Andriod</h3>
    <p>75%</p>
    </div>
    </div>
    <div className='andriod'>
    <img id='andriod-img' src='images/Rectangle 2299.png'/>
    <div className='percentage'>
    <h6>Iphone</h6>
    <h4>25%</h4>
    </div>
    </div>
    </div>
    <img id='mobile-img' src='images/Group 1340.png'/>
    </div>
    <div className='total-pops'>
    <div className='single-total'>
    <div className='total-img'>
    <img  src="https://img.icons8.com/parakeet-line/96/nui2.png" alt="nui2"/>
    </div>
    <p>Total Pops</p>
    <h5>1,024</h5>
    </div>
    <div className='single-total'>
    <div className='total-img'>
    <img  src="https://img.icons8.com/wired/96/broken-link.png" alt="broken-link"/>
    </div>
    <p>Total Link Clicks</p>
    <h5>200K</h5>
    </div>
    <div className='single-total'>
    <div className='total-img'>
    <img src="https://img.icons8.com/ios/96/add-user-group-man-man.png" alt="add-user-group-man-man"/>
    </div>
    <p>New Connections</p>
    <h5>43,522</h5>
    </div>
    <div className='single-total'>
    <div className='total-img'>
    <img src="https://img.icons8.com/wired/96/broken-link.png" alt="broken-link"/>
    </div>
    <p>Tap Through Rat</p>
    <h5>12%</h5>
    </div>
    </div>
    <div className='app-mesg'>
    <div className='single-app1'>
    <div className='img-bg-4'>
    <img width="24" height="24" src="https://img.icons8.com/ios-filled/96/FFFFFF/upwork.png" alt="upwork"/>
    </div>
    <div className='app-txt1'>
    <h4>Upword</h4>
    <p>4 times user click on that.</p>
    </div>
    <div className='mesg-count'>
    <h3>4</h3>
    </div>
    </div>
    <div className='single-app1'>
    <div className='img-bg-4'>
    <img width="32" height="32" src="https://img.icons8.com/windows/96/FFFFFF/line-me.png" alt="line-me"/>
    </div>
    <div className='app-txt1'>
    <h4>Line</h4>
    <p>3 times user click on that.</p>
    </div>
    <div className='mesg-count'>
    <h3>3</h3>
    </div>
    </div>
    <div className='single-app1'>
    <div className='img-bg-4'>
    <img width="24" height="24" src="https://img.icons8.com/ios-filled/96/FFFFFF/skype.png" alt="skype"/>
    </div>
    <div className='app-txt1'>
    <h4>Skype</h4>
    <p>6 times user click on that.</p>
    </div>
    <div className='mesg-count'>
    <h3>6</h3>
    </div>
    </div>
    <div className='single-app1'>
    <div className='img-bg-4'>
    <img width="24" height="24" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/96/FFFFFF/external-paypal-social-media-tanah-basah-glyph-tanah-basah.png" alt="external-paypal-social-media-tanah-basah-glyph-tanah-basah"/>
    </div>
    <div className='app-txt1'>
    <h4>PayPal</h4>
    <p>1 times user click on that.</p>
    </div>
    <div className='mesg-count'>
    <h3>1</h3>
    </div>
    </div>
    </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
   
    </div>
    <Footer/>
    </>
  )
}
