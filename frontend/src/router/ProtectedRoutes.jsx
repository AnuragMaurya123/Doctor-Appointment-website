import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children,allowedRoles}) => {
    const {token,role,user,dispatch} = useContext(AuthContext)
    const accessibleRoutes= role && token && user ? children:<Navigate to={"/login"}  replace={true}/>
    useEffect(()=>{
      if (!role || !token || !user) {
        dispatch({
          type:"LOGOUT"
        })
      }
    },[token,role,user])


  return accessibleRoutes
}

export default ProtectedRoutes
