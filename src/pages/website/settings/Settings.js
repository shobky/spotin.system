import React, { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import './settings.css'
import Nav from '../components/nav/Nav'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

const Settings = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const page = 'settings'
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50

    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe || isRightSwipe) {
            // ('swipe', isLeftSwipe ? navigate('/home') : navigate('/profile'))
            if (isRightSwipe) {
            } else if (isLeftSwipe) {
                navigate('/')

            }
        }
        // add your conditional logic here
    }


    const onSignOut = () => {
        logout()
        navigate("/login")
    }
    return (
        <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} >
            <Nav page={page} />
            <Link className='setting-profile-link' to='/profile' style={{ textDecoration: "none", color: "black" }}>
                <header className='settings-header'>
                    <p className='settings_head'>Profile</p>
                    <img alt="" className='setttings_prfoile-img' src={user.photoURL} />
                    <p className='settings_username'>{user.displayName}</p>
                </header></Link>
            <hr className='settings-line' />
            <main className='settings_main'>
                <p className='settings_main-label'>Account</p>
                <Link to='/settings/my-account' className='settings-list-div'>
                    <p className='settings-btn'>Reset Password</p>
                    <p>
                        <MdOutlineKeyboardArrowRight className='settings-arr-ico' />
                    </p>
                </Link>
                <Link to="/edit-profile" className='settings-list-div'>
                    <p className='settings-btn'>Edit Profile</p>
                    <p> <MdOutlineKeyboardArrowRight className='settings-arr-ico' /> </p>
                </Link>

                <br />

                <p className='settings_main-label'>Support</p>
                <Link className='settings-list-div'>
                    <p className='settings-btn'>Help</p>
                    <p> <MdOutlineKeyboardArrowRight className='settings-arr-ico' /> </p>
                </Link>
                <Link className='settings-list-div'>
                    <p className='settings-btn'>About</p>
                    <p> <MdOutlineKeyboardArrowRight className='settings-arr-ico' /> </p>
                </Link>




                <div onClick={() => onSignOut()} className='settings-logout-btn settings-list-div'>
                    <p>Logout</p>
                    <p> <MdOutlineKeyboardArrowRight className='settings-arr-ico settings-arr-ico__logout ' /> </p>
                </div>
            </main>
        </div>
    )
}

export default Settings