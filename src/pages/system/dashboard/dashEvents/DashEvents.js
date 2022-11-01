import { collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { CgMenuRight } from 'react-icons/cg'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useDb } from '../../../../contexts/Database'
import { db } from '../../../../firebase/Config'
import HomeMore from '../../../website/components/nav/HomeMore'
import CommFormAnswer from '../dashCommu/CommFormAnswer'
import UserDash from '../dashUsers/UserDash'
import './dashevents.css'
// import './dashusers.css'
import '../dashCommu/dashcommu.css'
// import UserDash from './UserDash'
const DashEvents = () => {
    const { users } = useDb()
    const [searchQ, setSearchQ] = useState('')

    const halloweenQ = collection(db, `Halloween`)
    const [halloween] = useCollectionData(halloweenQ)

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
        <div className='dashboard-events'>
            <p><CgMenuRight onClick={showMoreHome} className="dashboard_burger-menu-icon" /></p>
            <HomeMore />



            {
                clickedUser ?
                    <CommFormAnswer halloween={'going'} user={clickedUser} />
                    :
                    <div>
                        <header>
                            <div className='dash-users-header-nav'>
                                <Link to="/admin-dashboard"><IoArrowBackSharp className='dashusers_back-ico' /></Link>
                                <p className='dashboard_header-name'>dashboard\<strong>events</strong></p>
                            </div>
                            <div className='dash-users-header-nav'>
                                <p><CgMenuRight onClick={showMoreHome} className="dashboard_burger-menu-icon" /></p>
                                <input onChange={(e) => setSearchQ(e.target.value)} className='dashboard-users_search-ico' type='text' placeholder="search..." />
                                <HomeMore />
                            </div>
                        </header>
                        <main className='dashboard_events-main'>
                            <div className='dashboard_events_halloween'>
                                <p className='dashboard_event-name'>HALLOWEEN</p>
                                <p className='dasboard_events_halloween-user-go'>{
                                    halloween?.length
                                } person checked going</p>
                            </div>
                        </main>
                        <div className='dashboard_events-users-in-halloween'>
                            {
                                users?.filter((user) => {
                                    if (user.events?.halloween === 'going') {
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
                                    <UserDash key={index} community={'true'} onChooseUser={onChooseUser} user={user} />
                                ))
                            }
                        </div>
                    </div>
            }


        </div>
    )
}

export default DashEvents