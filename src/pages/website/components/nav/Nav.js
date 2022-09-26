import React, { useState } from 'react'
import { AiOutlineLine } from 'react-icons/ai'
import "./nav.css"


const Nav = () => {
    const navDiv = document.getElementById('navMenu')
    const [menu, setMenu] = useState(true)

    const onShowMenu = () => {
        setMenu(!menu)

    }
    return (
        <>

            <div onClick={onShowMenu} className='home_menu-icon'>
                <div className={menu ? 'menu-line-top burger-line' : 'menu-line-top__open burger-line'}></div>
                <div className={menu ? 'menu-line-mid burger-line' : 'menu-line-mid__open burger-line'}></div>
                <div className={menu ? 'menu-line-bottom burger-line' : 'menu-line-bottom__open burger-line'}></div>
            </div>

            <div className={menu ? 'nav-menu__hidden' : 'nav-menu__visible'} id='navMenu'>
                <div className='home_nav-container'>
                    <p>Home</p>
                    <p>About</p>
                    <p>My Profile</p>
                    <p>Events</p>
                    <p>Workshops</p>
                    <p>Menu</p>

                </div>
            </div>

        </>

    )
}

export default Nav