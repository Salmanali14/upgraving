import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Start1() {
  const history = useNavigate();
  const handlemove =()=>{
   history("/start2");
  }
  return (
   <>
<div className='start1'>
<div className='main3'>
<div className='logoskip'>
<div></div>
<img src='images/upgraving_logo new (5).png' alt='start'></img> 
<Link to="/login2" ><div className='skip'>Skip</div></Link>
</div>
</div>
<div className='start1text'>
    <div><h1 >Create Multiple Profiles</h1></div>
    <div> <p>Diversify Your Experience: Create Multiple Profiles for Tailored Interactions with other people!</p></div>
    </div>
    <img id='start1img' src='images/Group 1634.png' ></img>
    <img id='start2img'  src='images/Group 1506.png'></img>
    <div className='nextmain'>
       
    <div id="next_btn_div" onClick={handlemove}>
    <Link to='/start2'>  <img id='nextbuttonicon' src="https://img.icons8.com/ios-glyphs/96/FFFFFF/forward.png" alt="forward"/></Link>
         </div> 
        <Link to='/start2' className='nextbtnstyle'> <button>Next</button></Link>
         
   </div>
</div>
   </>
  )
}
