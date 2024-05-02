import './App.css'
import { useEffect,useState } from "react";
import Login from './Components/Login'
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login2 from './Components/Login2';
import Home from './Components/Home';
import PrevProfile from './Components/PrevProfile';
import EditProfile from './Components/EditProfile';
import Addnewlink from './Components/Addnewlink';
import Signup from './Components/Signup';
import Start from './Components/Start';
import Start1 from './Components/Start1';
import Start2 from './Components/Start2';
import Start3 from './Components/Start3';
import Start4 from './Components/Start4';
import Forgotpassword from './Components/Forgotpassword';
import Exchangecontact from './Components/Exchangecontact';
import Connections from './Components/Connections';
import Groupconnections from './Components/Groupconnections';
import Singlegroup from './Components/Singlegroup';
import Analytics from './Components/Analytics';
import Setting from './Components/Setting';
import List from './Components/List';
import Grouplist from './Components/Grouplist';
import Singlegroup1 from './Components/Singlegroup1';


function App() {
  const [isAuth, setAuth] = useState(false);
  const [screenColor, setScreenColor] = useState('white');

  // useEffect(() => {
    
  //   setAuth(currentUser ? true : false);
  // }, []);
// console.log(currentUser);


  const RequireAuth = ({ children }) => {
    const currentUser = localStorage.getItem("useruid");
    return currentUser?.length>0 && currentUser !=undefined  ? children : <Navigate to="/login" />;
  };

  const RequireAuthlogin = ({ children }) => {
    return !currentUser ? children : <Navigate to="/home" />;
  };
  return (
    <>
    <Router>

    <div className='app'>
    <div className='screen' >
    
    <Routes>
    <Route path='/login2' element={<Login/>}/>
    <Route path='/login' element={<Login2/>} />
    <Route path='/home' element={
      <RequireAuth>
      <Home/>
      </RequireAuth>
    }
       />
    <Route path='/prevprofile/:id' element={<PrevProfile/>} />
    <Route path='/editprofile' element={<RequireAuth><EditProfile/></RequireAuth>} />
    <Route path='/addlink' element={<RequireAuth><Addnewlink/></RequireAuth>} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/' element={<Start/>} />
        <Route path='/start1' element={<Start1 />} />
        <Route path='/start2' element={<Start2 />} />
        <Route path='/start3' element={<Start3 />} />
        <Route path='/start4' element={<Start4 />} />
    <Route path='/forgot' element={<Forgotpassword/>} />
    <Route path='/exchangecontact' element={<Exchangecontact/>} />
    <Route path='/connections' element={<RequireAuth><Connections/></RequireAuth>} />
    <Route path='/groupconnections' element={<RequireAuth><Groupconnections/></RequireAuth>} />
    <Route path='/singlegroup/:id' element={<RequireAuth><Singlegroup/></RequireAuth>} />
    <Route path='/analytics' element={<RequireAuth><Analytics/></RequireAuth>} />
    <Route path='/setting' element={<RequireAuth><Setting/></RequireAuth>} />
    <Route path='/list' element={<RequireAuth><List/></RequireAuth>} />
    <Route path='/grouplist' element={<RequireAuth><Grouplist/></RequireAuth>} />
    <Route path='/singlegroup1/:id' element={<RequireAuth><Singlegroup1/></RequireAuth>} />
    </Routes>
    </div>
    
    </div>
    </Router>
 
    </>
  )
}

export default App
