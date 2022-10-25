import React, { useEffect, useState } from 'react'
import './home.css'
//icons
import { CgMenuRight } from 'react-icons/cg'
import { BsSearch, BsCalendarEventFill, BsFillInfoCircleFill } from 'react-icons/bs'
import thinkerIllus from '../../assets/imgs/thinkerIllus.png'
import { FaUserAlt, FaChalkboardTeacher } from 'react-icons/fa'
import { HiLogout } from 'react-icons/hi'
// imgs
import man from '../../assets/avatars/man.png'
import woman from '../../assets/avatars/woman.png'
import googleMap from '../../assets/imgs/googlemap.png'
import commu from '../../assets/imgs/community.png'

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
//components
import Nav from './components/nav/Nav'
import { useDb } from '../../contexts/Database'
import HomeMore from './components/nav/HomeMore'
import dnatree from '../../assets/imgs/dnaTreetxt.png'
import { MdCopyright } from 'react-icons/md'



const Home = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(user?.photoURL ? user.photoURL : man)
    const [counter, setCounter] = useState(0)
    const { openOrders } = useDb()
    const [tktNum, setTktNum] = useState()
    const [searchActv, setSearchActv] = useState(false)
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
                navigate('/settings')
            } else if (isLeftSwipe) {
                navigate('/workshops')
            }
        }
        // add your conditional logic here
    }



    const ownderId = "NcHM2FUvdgNQ2BGhrIFCrl7oPTt1"
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



    useEffect(() => {
        const countPropleInSpace = () => {
            let Allpeople = [];
            openOrders?.map((order) =>
                Allpeople.push(order.tickets.number)
            )
            setTktNum(Allpeople.reduce((a, b) => a + b, 0))
        }
        countPropleInSpace()
    }, openOrders)

    const showMoreHome = () => {
        const moreHome = document.getElementById('homeMore')
        moreHome.classList.remove('home_showMore__inactive')
        moreHome.classList.add('home_showMore__active')
    }

    const page = "home"
    return (
        <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <section className='home'>
                <nav>
                    <Nav page={page} />
                </nav>
                <div className='home_header'>
                    <header>
                        <h1 className='home_name'>Spot<span>IN</span></h1>
                        <p><CgMenuRight onClick={showMoreHome} className="home_burger-menu-icon" /></p>
                        <HomeMore />
                    </header>
                    <img alt='' src={avatar} className='home_logo' />
                    <div className='db-n-mb'>
                        <ul className="home_nav-container">
                            <li className="home_nav-link active-link">home</li>
                            <li className="home_nav-link">profile</li>
                            <li className="home_nav-link">events</li>
                            <li className="home_nav-link">workshops</li>
                        </ul>

                        <div className='home_img-btn-div'>
                            <img alt='' src={avatar} className='home_user-photo' />
                            <button className='home_nav_login'>{user ? "logout" : "login"} <HiLogout style={{ marginLeft: "5px" }} /></button>
                        </div>
                    </div>

                </div>
                <main>
                    <h2 className='home_slogan'>The Space Of The Future.</h2>
                    <p className='home_trafic-teller'>The trafic in the space now is
                        {
                            tktNum > 15 ? <span className='home_trafic__high'> High </span> : tktNum < 5 ? <span className='home_trafic__low'> Low </span> : <span className='home_trafic__normal'> Normal</span>
                        }</p>
                    <section className='nre0sdi'>
                        <p className='home_section-1-header'>New from SpotIN:</p>
                        <p className='home_sectio-1-main'>Join our community and become one of us. <Link to="/join-community-form" className='home_section-1-btn'>Join</Link></p>
                        <img alt='' src={commu} className="hom_section-1-img" />
                    </section>

                </main>

            </section>
            <div className='home-page-second-section'>
                <h1 className='s2_header'>Don't get lost, here is the location:</h1>
                <iframe className='home-s2_map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6404.045531184958!2d32.310388161918524!3d31.271092226201386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f99de50d7e99ed%3A0xcacb714f1b1aba84!2sSpotIN!5e0!3m2!1sen!2seg!4v1666661292838!5m2!1sen!2seg" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <div className='home-page-third-section'>
                <p className='home-third_header'>Be eco. pay less.</p>
                <p className='home-third_sub-header'>We don't use paper receipts, It's all digital <span><Link className='home-third_sub-header-link' to="/profile/orders">history</Link></span></p>

                <img alt="" src={dnatree} className="dnaTree" />
            </div>


            <p className='copy-right-footer'><MdCopyright className='copy-right-ico'/>2022 Ahmed Shobky, Spotin EGY. All rights reserved.</p>

        </div>
    )
}

export default Home

