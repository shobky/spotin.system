import React from 'react'
import { CgMenuRight } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import tktsImg from '../../../assets/imgs/tikets.png'
import HomeMore from '../components/nav/HomeMore'
import Nav from '../components/nav/Nav'
import './tkts.css'

const Tikets = () => {
    const showMoreHome = () => {
        const moreHome = document.getElementById('homeMore')
        moreHome.classList.remove('home_showMore__inactive')
        moreHome.classList.add('home_showMore__active')
    }
    return (
        <div className='tkts-page-container'>
            <Nav page='tickets' />
            <p><CgMenuRight onClick={showMoreHome} className="home_burger-menu-icon" /></p>
            <HomeMore />
            <p className='tkts-page_head'>Tickets & Pricing</p>
            <p className='tkts-page_sub-head'>you can find how long you have been staying in the space in your profile.</p>
            <Link className='tkts-profile-link' to='/profile'>Profile</Link>
            <img alt="" className='tkts-page_img' src={tktsImg} />
        </div>
    )
}

export default Tikets