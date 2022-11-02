import React, { useEffect, useState } from 'react'
import './home.css'
//icons
import { CgCommunity, CgMenuRight } from 'react-icons/cg'
// imgs
import man from '../../assets/avatars/man.png'
import commu2 from '../../assets/imgs/comunity2.png'


import { Link } from 'react-router-dom'
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
    const { user } = useAuth()
    const [tktNum, setTktNum] = useState()
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


    useEffect(() => {
        const countPropleInSpace = () => {
            let Allpeople = [];
            openOrders?.map((order) =>
                Allpeople.push(order.tickets.number)
            )
            setTktNum(Allpeople.reduce((a, b) => a + b, 0))
        }
        countPropleInSpace()
    }, [openOrders])

    useEffect(() => {
        users?.forEach((userDb) => {
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
                    <img alt='' src={user?.photoURL ? user.photoURL : man} className='home_logo' />

                </div>
                <main>
                    <div className='home_main-flex-container'>
                        <h2 className='home_slogan'>The Space Of The Future.</h2>
                        <div >
                            <div className='home_main-aloone-div'>
                                <Link to={user ? "/join-community-form" : "/login"} className=' home_main-Link-div'><p>
                                    <CgCommunity className='home_comm-ico dashboard_ico' />COMMUNITY
                                    <span className='home-link-sub-ifo'>

                                        {
                                            commForm ? `Thanks for joining. Welcome.` :
                                                user ? `join and become one of us` : `join us, login first`
                                        } </span>
                                </p>
                                </Link>
                            </div>
                            <div className='home_link_div-container'>
                                <div className='home_main-alone_trafic'>
                                    <p className={tktNum > 30 ? "home_main-trafic__high" : tktNum < 10 ? "home_main-alone_trafic-low" : "home_main-trafic__normal"}>
                                        <TbTrafficCone className='dashboard_ico' /> TRAFIC
                                        <span className='dashboard-link-sub-ifo'>{tktNum > 30 ? "high" : tktNum < 10 ? "low" : "normal"}</span></p>
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

                    <img alt='' src={commu2} loading="lazy" className="homee_section-1-img" />
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
                <iframe title="map" className='home-s2_map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6404.045531184958!2d32.310388161918524!3d31.271092226201386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f99de50d7e99ed%3A0xcacb714f1b1aba84!2sSpotIN!5e0!3m2!1sen!2seg!4v1666661292838!5m2!1sen!2seg" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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

