import React, { useState } from 'react'
import { CgMenuRight } from 'react-icons/cg'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useDb } from '../../../../contexts/Database'
import HomeMore from '../../../website/components/nav/HomeMore'
import './dashusers.css'
import UserDash from './UserDash'

const DashUsers = () => {
    const { users } = useDb()
    const [searchQ, setSearchQ] = useState('')
    const showMoreHome = () => {
        const moreHome = document.getElementById('homeMore')
        moreHome.classList.remove('home_showMore__inactive')
        moreHome.classList.add('home_showMore__active')
    }
    return (
        <div>
            <header>
                <div className='dash-users-header-nav'>
                    <Link to="/admin-dashboard"><IoArrowBackSharp className='dashusers_back-ico' /></Link>
                    <p className='dashboard_header-name'>dashboard\<strong>users</strong></p>
                </div>
                <div className='dash-users-header-nav'>
                    <p><CgMenuRight onClick={showMoreHome} className="dashboard_burger-menu-icon" /></p>
                    <input onChange={(e) => setSearchQ(e.target.value)} className='dashboard-users_search-ico' type='text' placeholder="search..." />
                    <HomeMore />
                </div>
            </header>

            <main className='dashboard_users_container'>
                {
                    users?.filter((user) => {
                        if (user.isSigned === 'true') {
                            if (user.name.toLowerCase().includes(searchQ.toLocaleLowerCase())) {
                                return user
                            } else if (searchQ === "") {
                                return user
                            } else if (user.uid.includes(searchQ)) {
                                return users
                            } else {

                            }
                        }
                    }).map((user, index) => (
                        <UserDash key={index} user={user} />
                    ))
                }
            </main>
        </div>
    )
}

export default DashUsers