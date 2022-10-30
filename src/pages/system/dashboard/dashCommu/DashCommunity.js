import React, { useState } from 'react'
import { CgMenuRight } from 'react-icons/cg'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useDb } from '../../../../contexts/Database'
import HomeMore from '../../../website/components/nav/HomeMore'
import './dashcommu.css'
import '../dashUsers/dashusers.css'
import UserDash from '../dashUsers/UserDash'
import CommFormAnswer from './CommFormAnswer'


const DashCommunity = () => {
    const { users } = useDb()
    const [searchQ, setSearchQ] = useState('')
    const [clickedUser, setClickedUser] = useState()

    const onChooseUser = (data) => {
        setClickedUser(data)
    }
    const showMoreHome = () => {
        const moreHome = document.getElementById('homeMore')
        moreHome.classList.remove('home_showMore__inactive')
        moreHome.classList.add('home_showMore__active')
    }
    return (
        <div>
            <p><CgMenuRight onClick={showMoreHome} className="dashboard_burger-menu-icon" /></p>
            <HomeMore />

            {

                clickedUser ?
                    <CommFormAnswer user={clickedUser}/>
                    :
                    <div>
                        <header>
                            <div className='dash-users-header-nav'>
                                <Link to="/admin-dashboard"><IoArrowBackSharp className='dashusers_back-ico' /></Link>
                                <p className='dashboard_header-name'>dashboard\<strong>community</strong></p>
                            </div>
                            <div className='dash-users-header-nav'>
                                <p><CgMenuRight onClick={showMoreHome} className="dashboard_burger-menu-icon" /></p>
                                <input onChange={(e) => setSearchQ(e.target.value)} className='dashboard-users_search-ico' type='text' placeholder="search..." />
                            </div>
                        </header>
                        <main className='dashboard_users_container'>
                            {
                                users?.filter((user) => {
                                    if (user.commForm === 'filled') {
                                        if (user.name.toLowerCase().includes(searchQ.toLocaleLowerCase())) {
                                            return user
                                        } else if (searchQ === "") {
                                            return user
                                        } else if (user.uid.includes(searchQ)) {
                                            return users
                                        } else {

                                        }
                                    }
                                }).map((user) => (
                                    <UserDash onChooseUser={onChooseUser} user={user} community={"true"} />
                                ))
                            }
                        </main>
                    </div>
            }

        </div>
    )
}

export default DashCommunity