import React, { useState } from 'react'
import { CgMenuRight } from 'react-icons/cg'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useDb } from '../../../../contexts/Database'
import CommFormAnswer from '../dashCommu/CommFormAnswer'
import './dashusers.css'
import UserDash from './UserDash'

const DashUsers = () => {
    const { users } = useDb()
    const [searchQ, setSearchQ] = useState('')
    const [clickedUser, setClickedUser] = useState()

    const onChooseUser = (data) => {
        setClickedUser(data)
    }
    const onGoBackDAshUser = () => {
        setClickedUser(false)
    }
    return (
        <div>
            {
                clickedUser ?
                    <CommFormAnswer onGoBackDAshUser={onGoBackDAshUser} user={clickedUser} />
                    :
                    <>
                        <header>
                            <div className='dash-users-header-nav'>
                                <Link to="/admin-dashboard"><IoArrowBackSharp className='dashusers_back-ico' /></Link>
                                <p className='dashboard_header-name'>dashboard\<strong>users</strong></p>
                            </div>
                            <div className='dash-users-header-nav'>
                                <input onChange={(e) => setSearchQ(e.target.value)} className='dashboard-users_search-ico' type='text' placeholder="search..." />
                            </div>
                        </header>


                        <main className='dashboard_users_container'>
                            {
                                users?.filter((user) => {
                                    if (user.firebaseUID) {
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
                                    <UserDash clickedUser={clickedUser} onChooseUser={onChooseUser} key={index} user={user} />
                                ))
                            }
                        </main></>
            }

        </div>
    )
}

export default DashUsers