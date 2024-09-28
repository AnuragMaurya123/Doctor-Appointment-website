import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children,allowedRoles}) => {
    const {token,role} = useContext(AuthContext)
    const isAllowed= allowedRoles.includes(role)
    const accessibleRoutes= isAllowed && token ? children:<Navigate to={"/login"} replace={true}/>

  return accessibleRoutes
}

export default ProtectedRoutes
