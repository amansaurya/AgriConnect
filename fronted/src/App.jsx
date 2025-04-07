

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'
import WeatherApp from './components/weatherApp'
import Landing from './pages/landing'
import Login from './components/login'
import Mandi from './components/mandi'
import GovernmentSchemes from './components/GovernmentSchemes'
import AdminPanel from './components/AdminPanel';
import AboutUs from './pages/AboutUs';
import ManualSoilChecker  from './components/manualSoilChecker'
import SoilHealthChecker from './components/CropSoilHealthChecker';

function App() {
  return (
    <>
    <Router>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/weather' element={<WeatherApp/>}/>
      <Route path='/cropsoilhealth' element={<SoilHealthChecker />} />
      <Route path='/mandi' element={<Mandi/>}/>
      <Route path='/government-schemes' element={<GovernmentSchemes />} />
      <Route path='/admin' element={<AdminPanel />} />
      <Route path='/about' element={<AboutUs />} />
     <Route path='/croprecommendation' element={< ManualSoilChecker/>}/>



    </Routes>
    </Router>
    </>
    

     
    
  )
}

export default App
