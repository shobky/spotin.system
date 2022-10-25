import React, { useState } from 'react'
import "./nav.css"

import { BsCalendarEvent, BsCalendarEventFill, BsHouse, BsHouseFill, BsPeople, BsPeopleFill, BsPerson, BsPersonFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../contexts/AuthContext'
import { MdWork, MdWorkOutline } from 'react-icons/md'
import { IoPersonCircleOutline, IoPersonCircleSharp, IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5'
import { VscDebugStackframeDot } from 'react-icons/vsc'
import Profileblank from '../../../../assets/avatars/Profile-PNG-File.png'


const Nav = ({ page }) => {
    const { user } = useAuth()
    const [active, setActive] = useState(page)
    const [userPic, setUserPic] = useState(user.photoURL ?? Profileblank)

    return (
        <div className='nav'>
            <Link className='nav_link' onClick={() => setActive("settings")} to="/settings">{active === 'settings' ? <> <IoSettingsSharp className='nav_link-ico__active' /><VscDebugStackframeDot className="nav-link-active-dot" /> </> : <IoSettingsOutline />}</Link>
            <Link className='nav_link' onClick={() => setActive("home")} to="/">{active === 'home' ? <> <BsHouseFill className='nav_link-ico__active' /><VscDebugStackframeDot className="nav-link-active-dot" /> </> : <BsHouse />}</Link>
            <Link className='nav_link' onClick={() => setActive("workshops")} to="/workshops">{active === 'workshops' ? <> <BsCalendarEventFill className='nav_link-ico__active' /><VscDebugStackframeDot className="nav-link-active-dot" /> </> : <BsCalendarEvent />}</Link>
            <Link to="/profile" className='nav_link' onClick={() => setActive("profile")}>{active === "profile" ?
                userPic ?
                 <>
                    <img alt='' className='nav_user-photo__active' src={userPic } />
                    <VscDebugStackframeDot className="nav-link-active-dot__photo" /></>
                    :
                    <>
                    <IoPersonCircleSharp className='nav_link-ico__active' />
                    <VscDebugStackframeDot className="nav-link-active-dot" /></>
                :
                userPic ?
                    <img alt='' className='nav_user-photo__inactive' src={userPic } /> :
                    <IoPersonCircleOutline />}</Link>


        </div>
    )
}

export default Nav