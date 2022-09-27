import React, { useEffect, useState } from 'react'
import './home.css'
//icons
import { GiCircle } from 'react-icons/gi'
import { BsSearch, BsCalendarEventFill, BsFillInfoCircleFill } from 'react-icons/bs'
import thinkerIllus from '../../assets/imgs/thinkerIllus.png'
import { FaUserAlt, FaChalkboardTeacher } from 'react-icons/fa'
import { MdRestaurantMenu } from 'react-icons/md'
// imgs
import man from '../../assets/avatars/man.png'
import woman from '../../assets/avatars/woman.png'

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { auth } from '../../firebase/Config'
import { HiMenuAlt3, HiLogin, HiLogout } from 'react-icons/hi'
//components
import Nav from './components/nav/Nav'



const Home = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(user?.photoURL ? user.photoURL : man)
    const [counter, setCounter] = useState(0)
    const [searchActv, setSearchActv] = useState(false)


    const ownderId = process.env.REACT_APP_OWNER_ID
    const devId = process.env.REACT_APP_DEV_ID

    const signOut = () => {
        logout()
        navigate("/login")
    }

    const changeAvatar = () => {
        if (counter === 0) {
            setAvatar(man)
            setCounter(counter + 1)
        } else if (counter === 1) {
            setAvatar(woman)
            setCounter(counter + 1)
        } else if (counter === 2 && user?.photoURL) {
            setAvatar(user.photoURL)
            setCounter(0)
        } else if (counter === 2) {
            setAvatar(man)
            setCounter(0)
        }
    }


    return (
        <div className='home'>
            <Nav />
            <div className='home_header'>

                <h1 className='home_name'>Spot<span>In</span></h1>
                <div>
                    <input placeholder='search...' type="text" className={!searchActv ? 'home_header_search-input__active' : 'home_header_search-input'} />
                    {searchActv ? <BsSearch onClick={() => setSearchActv(!searchActv)} className='home_search-ico__active' />
                        : <BsSearch onClick={() => setSearchActv(!searchActv)} className='home_search-ico' />
                    }

                </div>
                <div className='home_circle_container'>
                    <div className='home_circle_content'>
                        <img onClick={changeAvatar} src={avatar} alt="" className={user ? "home_userPhoto" : "home_userAvatar"} />
                        {
                            user ? <HiLogout onClick={signOut} className='home_logout-icon' />
                                : <HiLogin onClick={signOut} className='home_login-icon' />
                        }

                    </div>
                </div>
            </div>
            <div onClick={() => setSearchActv(false)} className='home_content'>
                <div>
                    {
                        auth.currentUser ? <div>
                            <p className='home_content_username'>{user.displayName}, </p>
                            {
                                user?.uid === ownderId || user?.uid === devId
                                    ? <div>
                                        <p className='home-content-slogan'><span>Welcome back..</span> to start work here are some quick links </p>
                                        <div className='home_content-link-group'>
                                            <Link className='home_content-Link' to="/cashier.system">Cashier System</Link>
                                            <Link className='home_content-Link home_btw-link' to="/cashier.system/orders">Orders</Link>
                                            <Link className='home_content-Link home_btw-link' to="/cashier.system/add-new-item">Add Items</Link>
                                            {
                                                (user?.uid === process.env.REACT_APP_OWNER_ID || user?.uid === process.env.REACT_APP_DEV_ID) &&
                                                <Link className='home_content-Link home_btw-link' to="/cashier.system/orders/ledger">ledger</Link>
                                            }
                                        </div>

                                    </div>
                                    :
                                    <p className='home-content-slogan'>Welcome to the <span> space of the future.</span></p>

                            }
                        </div> : <div>
                            <p className='home-content-slogan'>Welcome to the <span> space of the future.</span></p>
                            <Link className='home_no-user-crete-link' to="/signup">create my accout</Link>
                        </div>
                    }
                </div>
                <div className='home_content_section-2'>
                    <p className='home_content_section-2-header'>Get familar with the platform:</p>
                    <div className='home_content_section-2_link-group'>
                        <Link className='home_section-2_user-links' to=""><BsFillInfoCircleFill /></Link>
                        <Link className='home_section-2_user-links' to=""><FaUserAlt /></Link>
                        <Link className='home_section-2_user-links' to=""><BsCalendarEventFill /></Link>
                        <Link className='home_section-2_user-links' to=""><MdRestaurantMenu /></Link>
                        <Link className='home_section-2_user-links' to=""><FaChalkboardTeacher /></Link>
                    </div>
                    <img alt='thinker' src={thinkerIllus} className="home_content_sectino-2_img" />

                </div>

            </div>

            <GiCircle className='home_circle home_circle-1' />
            <GiCircle className='home_circle home_circle-2' />
            <GiCircle className='home_circle home_circle-3' />


        </div>
    )
}

export default Home

