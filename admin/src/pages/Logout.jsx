import React from 'react'
import { useEffect } from 'react'
import { useStore } from '../context/Store'
import { Navigate } from 'react-router-dom'


const Logout = () => {
    const {userLogout} = useStore()
    useEffect(()=>{
        userLogout()
    },[userLogout])
  return (
    <Navigate to="/login"/>
  )
}

export default Logout