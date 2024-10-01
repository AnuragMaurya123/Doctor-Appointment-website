import React, { useContext, useEffect, useRef } from 'react'
import logo from "../../assets/images/logo.png"
import { Link, NavLink } from 'react-router-dom'
import { BiMenu } from "react-icons/bi"
import { AuthContext } from '../../context/authContext'


const navLink=[
  {
    path:"/home",
    display:"Home"
  },
  {
    path:"/doctors",
    display:"Find a Doctors"
  },
  {
    path:"/services",
    display:"Services"
  },
  {
    path:"/contact",
    display:"Contact Us"
  },
]
const Header = () => {

  const headerRef=useRef(null)
  const menuRef=useRef(null)
  const {user,role,token}=useContext(AuthContext)

  const handleStickyHeader=()=>{
    window.addEventListener("scroll",()=>{
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add("sticky_header")
      }else{
        headerRef.current.classList.remove("sticky_header")
      }
    })
  }

  useEffect(()=>{
    handleStickyHeader()
    return ()=>window.removeEventListener("scroll" ,handleStickyHeader)
  })

  const toggleMenu=()=> menuRef.current.classList.toggle("show_menu")

  return <header className="header  flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* ------------logo ------------ */}
          <div className="">
            <img src={logo} alt="" />
          </div>

        {/* ------------menu ------------ */}
        <div className="navigation" ref={menuRef} onClick={toggleMenu}>
          <ul className="menu flex items-center gap-[2.7rem]">
          {
            navLink.map((link,index)=>(
              <li key={index}>
                <NavLink to={link.path} className={navclass=>navclass.isActive ?
                   "text-primaryColor leading-7 text-[16px] font-[600]":"hover:text-primaryColor text-textColor leading-7 text-[16px] font-[600]"}>
                  {link.display}
                </NavLink>
              </li>
            ))
          }
          </ul>
        </div>


         {/* ------------nav right ------------ */}

         <div className="flex items-center gap-4">
          {
            user && token ? (
            <div >
            <Link  className=' flex gap-2 justify-between items-center order-2' to={`${role === "patient" ? `/users/profile/${user.name}`:`/doctors/profile/${user.name}`}`}>
            <h3 className="text-[16px] font-semibold text-headingColor">{user.name}</h3>
            <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
              <img src={user.photo} className='w-full rounded-full' alt="" />
            </figure>
           
            </Link>
          </div>
          ):(
            <Link to={"/login"}>
            <button className="bg-primaryColor justify-center rounded-[50px] py-2 px-6 text-white font-[600] h-[44px] flex items-center ">Login</button>
          </Link>
          )
          }
          <span className="md:hidden" onClick={toggleMenu}>
            <BiMenu className="w-6 h-6 cursor-pointer" />
          </span>
         </div>

        </div>
      </div>
  </header>
}

export default Header
