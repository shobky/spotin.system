import React, { useEffect, useState } from 'react'
import { IoMdSwap } from 'react-icons/io'
import { Link } from 'react-router-dom'
import Nav from '../components/nav/Nav'
import halloweenImg from '../../../assets/workhsops/halloween.jpg'
import { doc, setDoc, collection, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/Config'
import { useAuth } from '../../../contexts/AuthContext'
import { useDb } from '../../../contexts/Database'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ImSpinner2 } from 'react-icons/im'
import { CgMenuRight } from 'react-icons/cg'
import HomeMore from '../components/nav/HomeMore'

const Evets = () => {

    const { user } = useAuth()
    const { users } = useDb()
    const [userFromDb, setUserFromDb] = useState()
    const [going, setGoing] = useState(false)
    const [loading, setLoading] = useState(true)

    const halloweenQ = collection(db, `Halloween`)
    const [halloween] = useCollectionData(halloweenQ)


    useEffect(() => {
        users?.map((userdb) => {
            if (userdb.email === user.email) {
                setUserFromDb(userdb)
            }
            else {
                setLoading(false)
            }
        })
        halloween?.map((userGoing) => {
            if (userGoing.email === user.email) {
                setGoing(true)
                setLoading(false)
                
            }else {
                setLoading(false)

            }
        })
    }, [users, user, halloween])

    const userGoingHalloween = () => {
        setLoading(true)
        setDoc(doc(db, `Halloween/${user.uid.slice(-7)}`), {
            name: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
            Number: userFromDb?.number ?? 'no number'
        }).then(() => {
            setGoing(true)
            setLoading(false)
        })

        updateDoc(doc(db, `Users/${user.email}`), {
            events: { halloween: 'going'}
        })


    }

    const userDeleteHalloween = () => {
        setLoading(true)
        deleteDoc(doc(db, `Halloween/${user.uid.slice(-7)}`)).then(() => {
            setGoing(false)
            setLoading(false)
        })
        updateDoc(doc(db, `Users/${user.email}`), {
            events: { halloween: "notGoing" }
        })
    }
    const showMoreHome = () => {
        const moreHome = document.getElementById('homeMore')
        moreHome.classList.remove('home_showMore__inactive')
        moreHome.classList.add('home_showMore__active')
    }
    return (
        <>
            <Nav page="workshops" />

            <div style={{ overflow: "hidden" }} className='events-container'>
                <header>
                    <p className='events-header-name'>Events</p>
                    <Link to='/workshops'><IoMdSwap className='event_swap-ico' /></Link>
                    <p><CgMenuRight onClick={showMoreHome} className="events_burger-menu-icon" /></p>
                    <HomeMore />
                </header>

                {/* <p>There is no upcoming events, come back soon.</p> */}
                <div className='event-container'>
                    <div className='events-nomore-going'></div>
                    <div className='event-border-top-r'></div>
                    <div className='event-border-top-l'></div>

                    <img alt='' src={halloweenImg} className="event_img" />
                    <div className='event-border-bootom-r'></div>
                    <div className='event-border-bottom-l'></div>

                    <div className='event-filter'>
                        <div className='event_filter_content'>
                            <div className='event_filter_txt-content'>
                                <h1>HALLO<br />WEEN</h1>
                                <p>party at spotin | <strong>31'OCT</strong></p>
                            </div>
                            <div>
                                {
                                    going ?
                                        <button className='event-btn-goin__active' onClick={userDeleteHalloween}>{loading ? <ImSpinner2 className="evemts_loading-spinner" /> : " Cancel"}</button>

                                        :
                                        <button onClick={userGoingHalloween}>{loading ? <ImSpinner2 className="evemts_loading-spinner" /> : " Going"}</button>
                                }
                                <div className='halloween_event-goings-div'>
                                    {
                                        halloween?.slice(-5).map((usersInEvent, index) => (
                                                <img key={index} alt="" className='halloween_users-in-event-img' src={usersInEvent.photoURL} />
                                        ))
                                    }
                                </div>
                            </div>


                        </div>
                        <div>

                        </div>
                    </div>
                </div>

            </div></>
    )
}

export default Evets