import './App.css'
import Login from './Components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

  return (
    <>
    <Router>

    <div className='app'>
    <div className='screen'>
    
    <Routes>
    <Route path='/login2' element={<Login/>}/>
    <Route path='/login' element={<Login2/>} />
    <Route path='/login1' element={<Home/>} />
    <Route path='/prevprofile' element={<PrevProfile/>} />
    <Route path='/editprofile' element={<EditProfile/>} />
    <Route path='/addlink' element={<Addnewlink/>} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/' element={<Start/>} />
    <Route path='/start1' element={<Start1/>} />
    <Route path='/start2' element={<Start2/>} />
    <Route path='/start3' element={<Start3/>} />
    <Route path='/start4' element={<Start4/>} />
    <Route path='/forgot' element={<Forgotpassword/>} />
    <Route path='/exchangecontact' element={<Exchangecontact/>} />
    <Route path='/connections' element={<Connections/>} />
    <Route path='/groupconnections' element={<Groupconnections/>} />
    <Route path='/singlegroup' element={<Singlegroup/>} />
    <Route path='/analytics' element={<Analytics/>} />
    <Route path='/setting' element={<Setting/>} />
    <Route path='/list' element={<List/>} />
    <Route path='/grouplist' element={<Grouplist/>} />
    <Route path='/singlegroup1' element={<Singlegroup1/>} />
    </Routes>
    </div>
    
    </div>
    </Router>
    </>
  )
}

export default App
