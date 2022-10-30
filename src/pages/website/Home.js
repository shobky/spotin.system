import React, { useEffect, useState } from 'react'
import './home.css'
//icons
import { CgCommunity, CgMenuRight } from 'react-icons/cg'
// imgs
import man from '../../assets/avatars/man.png'
import woman from '../../assets/avatars/woman.png'

import commu from '../../assets/imgs/community.png'
import commu2 from '../../assets/imgs/comunity2.png'


import { HashRouter, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
//components
import Nav from './components/nav/Nav'
import HomeMore from './components/nav/HomeMore'
import dnatree from '../../assets/imgs/dnaTreetxt.png'
import { collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase/Config'
import Footer from './footer/Footer'
import musicImg from '../../assets/imgs/music.png';
import playstaionImg from '../../assets/imgs/playstaion.png';
import pumpkin from '../../assets/imgs/BackgroundEraser_20221028_195711752.png'
import { TbTrafficCone } from 'react-icons/tb'




const Home = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(user?.photoURL ? user.photoURL : man)
    const [counter, setCounter] = useState(0)
    const [tktNum, setTktNum] = useState()
    const [searchActv, setSearchActv] = useState(false)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const [commForm, setCommForm] = useState(false)

    const openOrdersQ = collection(db, `open-orders`)
    const [openOrders,] = useCollectionData(openOrdersQ)
    const usersQ = collection(db, `Users`)
    const [users] = useCollectionData(usersQ)

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
                // navigate('/settings')
            } else if (isLeftSwipe) {
                // navigate('/workshops')
            }
        }
        // add your conditional logic here
    }



    const ownderId = "NcHM2FUvdgNQ2BGhrIFCrl7oPTt1"
    const devId = process.env.REACT_APP_DEV_ID
    console.log(process.env.REACT_APP_DEV_ID, devId)





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

    useEffect(() => {
        users?.map((userDb) => {
            if (userDb.email === user?.email) {
                if (userDb.commForm === "filled") {
                    setCommForm(true)
                } else {
                }
            } else {
            }
        })
    }, [user, users])

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

                </div>
                <main>
                    <div className='home_main-flex-container'>
                        <h2 className='home_slogan'>The Space Of The Future.</h2>
                        <div >
                            <div className='home_main-aloone-div'>
                                <Link to={user ? "/join-community-form" : "/login"} className=' home_main-Link-div dashboard_community'><p>
                                    <CgCommunity className='home_comm-ico dashboard_ico' />COMMUNITY
                                    <span className='home-link-sub-ifo'>

                                        {
                                            commForm ? `Thanks for joining. Welcome.` :
                                                user ? `join us, login first` : `join and become one of us`
                                        } </span>
                                </p>
                                </Link>
                            </div>
                            <div className='home_link_div-container'>
                                <div className='home_main-alone_trafic'>
                                    <p className={tktNum > 30 ? "home_main-trafic__high" : tktNum < 10 ? "home_main-alone_trafic-low" : "home_main-trafic__normal"}>
                                        <TbTrafficCone className='dashboard_ico' /> TRAFIC
                                        <span className='dashboard-link-sub-ifo'>{tktNum} checkins </span></p>
                                </div>
                                <div className='home_main-halloween-event-div'>
                                    <a href='#halloween' className=' home_main-Link-div'><p>
                                        HALLOWEEN
                                        <span className='home-link-sub-ifo'> Ready to party? </span>
                                    </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <img alt='' src={commu2} className="homee_section-1-img" />

                    {/* <p className='home_trafic-teller'>The trafic in the space now is
                        {
                            tktNum > 30 ? <span className='home_trafic__high'> High </span> : tktNum < 10 ? <span className='home_trafic__low'> Low </span> : <span className='home_trafic__normal'> Normal</span>
                        }</p>
                    <section className='nre0sdi'>
                        {
                            !commForm ?
                                <div>
                                    <p className='home_section-1-header'>New from SpotIN:</p>
                                    <p className='home_sectio-1-main'>Join our community and become one of us. <br/>{
                                        user ?
                                            <Link to="/join-community-form" className='home_section-1-btn'>Join</Link>
                                            :
                                            <Link className='home_section-1-login-link' to="/login"> Login First</Link>
                                    } </p>
                                </div>
                                :
                                <p className='home_sectio-1-main'>Thank you for joining our community.</p>
                        }
                    </section> */}

                </main>

            </section>
            <div id='halloween' className="home_halloween-container">
                <p className='home_halloween_header'>HALLO <br /> <span>WEEN</span></p>
                <p className='home_halloween-sub-header'>party at spotin</p>
                <Link to='/events' className='home_halloween-btn'>Events</Link>
                <img alt="" src={pumpkin} className="home_halloween-img" />
            </div>
            <div className='home-page-second-section'>
                <h1 className='s2_header'>Don't get lost, here is the location:</h1>
                <iframe className='home-s2_map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6404.045531184958!2d32.310388161918524!3d31.271092226201386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f99de50d7e99ed%3A0xcacb714f1b1aba84!2sSpotIN!5e0!3m2!1sen!2seg!4v1666661292838!5m2!1sen!2seg" allowfullscreen={true} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <div className='home-page-third-section'>
                <div>
                    <p className='home-third_header'>Be eco. pay less.</p>
                    <p className='home-third_sub-header'>We don't use paper receipts, It's all digital <span><Link className='home-third_sub-header-link' to="/profile/orders">history</Link></span></p>
                </div>

                <img alt="" src={dnatree} className="dnaTree" />
            </div>
            <div className='home_forth-section'>
                <img alt='' src={musicImg} className="home_forth-secition-music-img" />
                <div>
                    <p className='home_forth_txt'><span>KARAOKE</span> NIGHTS </p>
                    <p className='home_forth-subtxt'><Link className='home_forth-link' to='/events'>NEW EVENTS</Link></p>
                </div>
            </div>
            <div className='home_fifth-section'>
                <p>gather with your friends </p>

                <h1> <span>& PLAYSTATION</span> At Spotin.</h1>
                <img alt='' src={playstaionImg} className="home_fifth-secition-music-img" />
            </div>
            <Footer />



        </div>
    )
}

export default Home

