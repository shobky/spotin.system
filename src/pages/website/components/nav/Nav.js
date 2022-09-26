import React, { useState } from 'react'
import { AiOutlineLine } from 'react-icons/ai'
import "./nav.css"


const Nav = () => {
    const navDiv = document.getElementById('navMenu')
    const [menu, setMenu] = useState(false)

    const onShowMenu = () => {
        setMenu(!menu)
        if (menu === true) {
            navDiv.classList.remove('nav-menu__hidden')
            navDiv.classList.add('nav-menu__visible')
        } else {
            navDiv.classList.add('nav-menu__hidden')
            navDiv.classList.remove('nav-menu__visible')
        }
    }
    return (
        <>

            <div onClick={onShowMenu} className='home_menu-icon'>
                <div className={menu ? 'menu-line-top burger-line' : 'menu-line-top__open burger-line'}></div>
                <div className={menu ? 'menu-line-mid burger-line' : 'menu-line-mid__open burger-line'}></div>
                <div className={menu ? 'menu-line-bottom burger-line' : 'menu-line-bottom__open burger-line'}></div>
            </div>

            <div className='nav-menu__hidden' id='navMenu'>
                <div className='home_nav-container'>
                    hi
                </div>
            </div>

        </>

    )
}

export default Nav