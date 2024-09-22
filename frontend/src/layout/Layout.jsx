import React from 'react'
import Header from '../component/Header/Header'
import Router  from '../router/Router'
import Footer from '../component/Footer/Footer'


const Layout = () => {
  return <>
  <Header/>
  <main>
    <Router/>
  </main>
  <Footer/>
  </>
}

export default Layout
