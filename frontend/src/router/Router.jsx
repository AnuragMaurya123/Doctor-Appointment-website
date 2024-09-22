import React from 'react'
import Home from "../pages/Home"
import {Routes,Route} from "react-router-dom"
import Contact from '../pages/Contact'
import Doctors from '../pages/Doctors/Doctors'
import DoctorsDetails from '../pages/Doctors/DoctorsDetails'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Services from '../pages/Services'
const Router = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:id' element={<DoctorsDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/services' element={<Services/>}/>
      </Routes>
    </div>
  )
}

export default Router
