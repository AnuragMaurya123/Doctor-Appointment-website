import React from 'react'
import Header from '../component/Header/Header'
import Router  from '../router/Router'
import Footer from '../component/Footer/Footer'
import Notification from '../component/Notification/Notification'


const Layout = () => {
  return <>
  <Header/>
  <Notification/>
  <main>
    <Router/>
  </main>
  <Footer/>
  </>
}

export default Layout
