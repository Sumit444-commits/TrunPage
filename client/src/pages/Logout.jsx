import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useStore } from '../store/AppContext'

const Logout = () => {
    const {logoutUser} = useStore()
    useEffect(()=>{
        logoutUser()
    },[logoutUser])
  return (
    <Navigate to={"/login"}/>
  )
}

export default Logout