import React from 'react'
import logo from '../../assets/logo.png'
import './loading.css'

const Logo = () => {
  return (
    <div className='logo-loading-container'>
        <img alt='spotin' src={logo} className="logo-loading-png"/>
    </div>
  )
}

export default Logo