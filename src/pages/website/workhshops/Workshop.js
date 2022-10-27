import React, { useState } from 'react'
import './workshop.css'
import piano from '../../../assets/workhsops/piano.jfif'
import english from '../../../assets/workhsops/engllish.jpg'
import graphic from '../../../assets/workhsops/graphic.jpg'


import { MdExpandMore } from 'react-icons/md'
import Nav from '../components/nav/Nav'
import { IoClose } from 'react-icons/io5'
import { IoMdSwap } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { CgMenuRight } from 'react-icons/cg'
import HomeMore from '../components/nav/HomeMore'
import { RiMenuAddLine } from 'react-icons/ri'

const Workshop = () => {
    const page = "workshops"
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const navigate = useNavigate()
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
                navigate('/')
            } else if (isLeftSwipe) {
                navigate('/profile')
            }
        }
        // add your conditional logic here
    }

    const showMoreHome = () => {
        const moreHome = document.getElementById('homeMore')
        moreHome.classList.remove('home_showMore__inactive')
        moreHome.classList.add('home_showMore__active')

    }


    const openWorkshop = () => {
        const workshopcontainer = document.getElementById('workshopContainer')
        const workshopFlier = document.getElementById('workshopReadMore')
        workshopFlier.classList.add("workshopReadMore__active")

        workshopcontainer.classList.add('workshop_active')


    }
    const closeWorkshop = () => {
        const workshopcontainer = document.getElementById('workshopContainer')
        const workshopFlier = document.getElementById('workshopReadMore')
        workshopFlier.classList.remove("workshopReadMore__active")
        workshopcontainer.classList.remove('workshop_active')

    }

    const openWorkshopgd = () => {
        const workshopcontainer = document.getElementById('workshopContainer')
        const workshopFlier = document.getElementById('workshopReadMoregd')
        workshopFlier.classList.add("workshopReadMore__active")

        workshopcontainer.classList.add('workshop_active')

    }
    const closeWorkshopgd = () => {
        const workshopcontainer = document.getElementById('workshopContainer')
        const workshopFlier = document.getElementById('workshopReadMoregd')
        workshopFlier.classList.remove("workshopReadMore__active")
        workshopcontainer.classList.remove('workshop_active')

    }

    const openGraphic = () => {
        const workshopcontainer = document.getElementById('workshopContainer')
        const workshopFlier = document.getElementById('graphicReadMore')
        workshopFlier.classList.add("workshopReadMore__active")

        workshopcontainer.classList.add('workshop_active')

    }
    const closegraphic = () => {
        const workshopcontainer = document.getElementById('workshopContainer')
        const workshopFlier = document.getElementById('graphicReadMore')
        workshopFlier.classList.remove("workshopReadMore__active")
        workshopcontainer.classList.remove('workshop_active')

    }
    return (
        <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <Nav page={page} />
            <header className='workhsops-header'>
                <h1 className='workshop_name'>workShops</h1>
                <div style={{
                    display: "flex", alignItems: "center"
                }}>
                    <Link to='/events'><IoMdSwap className='workshop_swap-ico' /></Link>
                    <p><CgMenuRight onClick={showMoreHome} className="workshop_burger-menu-icon" /></p>
                </div>
                <HomeMore />
            </header>
            <div id='workshopContainer' className='workshop'>

                <div id='graphicReadMore' className='workshop_flier-container'>
                    <img className='workhshop_flier-cover-photo' src={graphic} alt="" />
                    <div className='workhshop_flier-cover-filter'>
                        <IoClose onClick={closegraphic} className="workshop_close-ico" />
                        <h1 className='workshop_workshop-name workshop_workshop-name__graphic'>Graphic Design Workshop</h1>
                        <p className='workshop_workshop-level'>Beginner Level</p>
                        <p className='workshop_workshop-appointment'>Every Mon & Wed 4-6 PM</p>
                        <p className='workshop_workshop-price'>Price: 800LE / Level <br /> {`(10 sessions)`}.</p>
                        <button className='workshop_join-btn'><RiMenuAddLine/></button>
                        <button onClick={openGraphic} className='workshop_expand-ico'><MdExpandMore /></button>
                        <article>
                            <p className='workshop_article-head'>Each workshop is divided into pracitcal and theroratical parts {`( learan how to read notes )`}</p>
                            <p className='workshop_article-list-title'>Topics: </p>
                            <ul className='workshop_article-topic-list'>
                                <li>understanding the program interface </li>
                                <li>mastering layers with blending options</li>
                                <li>detection skills and usefull shortcuts</li>
                                <li>making a new design and how to make creative ideas</li>
                            </ul>
                            <br />
                            <p>You'll need a labtop with average performance. </p>
                            <br />
                            <p style={{ paddingBottom: "10px" }}>Phone number: 01211216618</p>
                            <button className='workshop_join-btn-pc'><RiMenuAddLine/></button>

                        </article>
                    </div>
                </div>

                <div id='workshopReadMore' className='workshop_flier-container'>
                    <img className='workhshop_flier-cover-photo' src={piano} alt="" />
                    <div className='workhshop_flier-cover-filter'>
                        <IoClose onClick={closeWorkshop} className="workshop_close-ico" />
                        <h1 className='workshop_workshop-name'>Piano Workshop</h1>
                        <p className='workshop_workshop-level'>Beginner to advanced</p>
                        <p className='workshop_workshop-appointment'>Every Friday 1-3 PM</p>
                        <p className='workshop_workshop-price'>Price: 250LE / Month.</p>
                        <button className='workshop_join-btn'><RiMenuAddLine/></button>
                        <button onClick={openWorkshop} className='workshop_expand-ico'><MdExpandMore /></button>
                        <article>
                            <p className='workshop_article-head'>Each workshop is divided into pracitcal and theroratical parts {`( learan how to read notes )`}</p>
                            <p className='workshop_article-list-title'>Topics: </p>
                            <ul className='workshop_article-topic-list'>
                                <li>Piano Basics</li>
                                <li>Techniques</li>
                                <li>Musical notes</li>
                                <li>Play your first musical piese</li>
                            </ul>
                            <br />
                            <p>You'll need a Music notebook and a pencil. </p>
                            <br />
                            <p style={{ paddingBottom: "10px" }}>Phone number: 01271165428</p>
                            <button className='workshop_join-btn-pc'><RiMenuAddLine/></button>

                        </article>
                    </div>
                </div>

                <div id='workshopReadMoregd' className='workshop_flier-container'>
                    <img className='workhshop_flier-cover-photo' src={english} alt="" />
                    <div className='workhshop_flier-cover-filter'>
                        <IoClose onClick={closeWorkshopgd} className="workshop_close-ico" />
                        <h1 className='workshop_workshop-name'>English Workshop</h1>
                        <p className='workshop_workshop-level'>Beginner to advanced</p>
                        <p className='workshop_workshop-appointment'>Every Friday 1-3 PM</p>
                        <p className='workshop_workshop-price'>Price: 250LE / Month.</p>
                        <button className='workshop_join-btn'><RiMenuAddLine/></button>
                        <button onClick={openWorkshopgd} className='workshop_expand-ico'><MdExpandMore /></button>
                        <article>
                            <p className='workshop_article-head'>Each workshop is divided into pracitcal and theroratical parts {`( learan how to read notes )`}</p>
                            <p className='workshop_article-list-title'>Topics: </p>
                            <ul className='workshop_article-topic-list'>
                                <li>Piano Basics</li>
                                <li>Techniques</li>
                                <li>Musical notes</li>
                                <li>Play your first musical piese</li>
                            </ul>
                            <br />
                            <p>You'll need a Music notebook and a pencil. </p>
                            <br />
                            <p style={{ paddingBottom: "10px" }}>Phone number: 01271165428</p>
                            <button className='workshop_join-btn-pc'><RiMenuAddLine/></button>

                        </article>
                    </div>
                </div>

            </div></div>
    )
}

export default Workshop