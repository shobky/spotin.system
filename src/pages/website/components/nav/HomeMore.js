import React from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { BsCalendarEvent, BsHouse, BsXLg } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { RiFacebookCircleFill, RiWhatsappFill } from 'react-icons/ri'
import { SiGmail } from 'react-icons/si'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../contexts/AuthContext'
import Profileblank from '../../../../assets/avatars/Profile-PNG-File.png'

import './homemore.css'

const HomeMore = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const closeShowMoreHome = () => {
        const moreHome = document.getElementById('homeMore')
        moreHome.classList.remove('home_showMore__active')
        moreHome.classList.add('home_showMore__inactive')

    }
    const onSignOut = () => {
        logout()
        navigate('/login')
    }
    return (
        <div id="homeMore" className="home_showMore__inactive" >
            <header className='homemore-header'>
                <div className='home_showmore_user-info'>
                    <Link to="/profile">
                        <img alt='' className='home_showmore_userpic' src={user?.photoURL ?? Profileblank} /></Link>
                </div>
                <p><BsXLg onClick={closeShowMoreHome} className="home-more_x-icon" /></p>
            </header>

            <section className='home_showmore-nav-sect'>
                <div className='home_shomore_nav-option'>
                    <div className='homeMore-flex-db'>
                        <p><BsHouse className='home-more-nav-ico' /></p>
                        <Link className='homeMore-link' to='/'>Home</Link></div>
                    <Link style={{ color: "black" }} to='/'><MdOutlineKeyboardArrowRight className='shomore-home-arr-ico' /></Link>

                </div>

                <div className='home_shomore_nav-option'>
                    <div className='homeMore-flex-db'> <p> <BsCalendarEvent className='home-more-nav-ico' /></p>
                        <Link className='homeMore-link' to="/workshops">Workshops & events</Link></div>
                    <Link style={{ color: "black" }} to="/workshops"><MdOutlineKeyboardArrowRight className='shomore-home-arr-ico' /></Link>

                </div>
                <div className='home_shomore_nav-option'>
                    <div className='homeMore-flex-db'><p><IoSettingsOutline className='home-more-nav-ico' /></p>
                        <Link className='homeMore-link' to="/settings">Settings</Link></div>
                    <Link style={{ color: "black" }} to="/settings"><MdOutlineKeyboardArrowRight className='shomore-home-arr-ico' /></Link>
                </div>

                {
                    user ?
                        user.uid === process.env.REACT_APP_DEV_ID || user.uid === process.env.REACT_APP_OWNER_ID || true ?
                            <div className='home-more-admin-links'>
                                <Link className='home-more_admin-link' to="cashier.system">Cashier</Link>
                                <Link className='home-more_admin-link' to="cashier.system/orders">Orders</Link>
                                <Link className='home-more_admin-link' to="cashier.system/orders/ledger">Ledger</Link>

                            </div> : "" : ""
                }

            </section>
            <hr className='shomoreline' />
            <div className='secndsection-optoins'>
                <p><Link to="/menu" className='secndsection_optoin-name'>Menu</Link> </p>
                <p><Link to="/tikets" className='secndsection_optoin-name'>Tickets & Pricing</Link> </p>
                <p><Link className='secndsection_optoin-name'>About</Link> </p>
            </div>

            <section className='sochail-links-section'>
                <RiFacebookCircleFill className="social-link-ico" />
                <AiFillInstagram className="social-link-ico" />
                <RiWhatsappFill className="social-link-ico" />
                <SiGmail className="social-link-ico" />


            </section>


            <div onClick={() => onSignOut()} className='showmore-home-logout-btn'>
                <p>Logout</p>
                <p> <MdOutlineKeyboardArrowRight className='settings-arr-ico settings-arr-ico__logout ' /> </p>
            </div>


        </div>
    )
}

export default HomeMore