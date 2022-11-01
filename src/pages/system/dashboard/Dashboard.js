import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { CgCommunity, CgMenuRight } from 'react-icons/cg'
import HomeMore from '../../website/components/nav/HomeMore'
import { Link } from 'react-router-dom'
import { BsFillCalendarEventFill, BsPeopleFill } from 'react-icons/bs'
import { FaReceipt } from 'react-icons/fa'
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io'
import { SiFuturelearn } from 'react-icons/si'
import { useDb } from '../../../contexts/Database'
import { TbTrafficCone } from 'react-icons/tb'

const Dashboard = () => {

    const { users, openOrders } = useDb()
    const [tktNum, setTktNum] = useState()

    const showMoreHome = () => {
        const moreHome = document.getElementById('homeMore')
        moreHome.classList.remove('home_showMore__inactive')
        moreHome.classList.add('home_showMore__active')
    }

    useEffect(() => {
        const countPropleInSpace = () => {
            let Allpeople = [];
            openOrders?.map((order) =>
                Allpeople.push(order.tickets.number)
            )
            setTktNum(Allpeople.reduce((a, b) => a + b, 0))
        }
        countPropleInSpace()
    }, [openOrders])
    return (
        <div className='dashboard'>
            <header>
                <h1 className='dashboard_header-name'>Dashboard</h1>
                <p><CgMenuRight onClick={showMoreHome} className="dashboard_burger-menu-icon" /></p>
                <HomeMore />
            </header>

            <main>
                <div className='dashboard_main-horizntal-div'>
                    <Link to="/admin-dashboard/users" className=' dashboard_main-Link-div dashboard_users'><BsPeopleFill className='dashboard_user-ico dashboard_ico' /><span>USERS</span>
                        <span className='dashboard-link-sub-ifo'>{
                            users?.filter((user) => {
                                if (user.isSigned === true) {

                                    return user
                                } else {
                                }
                            }).length
                        } signed up </span></Link>
                    <Link to="/cashier.system/orders" className=' dashboard_main-Link-div dashboard_orders'><FaReceipt className='dashboard_orders-ico dashboard_ico' />ORDERS
                        <span className='dashboard-link-sub-ifo'>{openOrders?.length} open </span></Link>
                </div>
                <div className='dashboard_main-horizntal-div'>
                    <Link className=' dashboard_main-Link-div dashboard_workshops'><SiFuturelearn className="dashboard_workshop-ico dashboard_ico" />WORKSHOPS</Link>
                    <Link to='/admin-dashboard/all-events' className=' dashboard_main-Link-div dashboard_events'> <BsFillCalendarEventFill className='dashboard_event-ico dashboard_ico' />EVENTS</Link>
                </div>
                <div className='dashboard_main-aloone-div'>
                    <Link to="/admin-dashboard/community.members" className=' dashboard_main-Link-div dashboard_community'><CgCommunity className='dashboard_comm-ico dashboard_ico' />COMMUNITY
                        <span className='dashboard-link-sub-ifo'> {
                            users?.filter((user) => {
                                if (user.isSigned === true) {
                                    if (user.commForm && user?.commForm === 'filled') {
                                        return user
                                    } else {
                                    }
                                }
                            }).length
                        } person filled the form </span>

                    </Link>
                </div>
                <div className='dashboard_main-horizntal-div'>
                    <Link className=' dashboard_main-Link-div dashboard_PRODUCTS-plus'><IoMdAddCircleOutline className='dashboard_add-ico dashboard_ico' /> PRODUCTS</Link>
                    <Link className=' dashboard_main-Link-div dashboard_PRODUCTS-minus'> <IoMdRemoveCircleOutline className='dashboard_remove-ico dashboard_ico' /> PRODUCTS</Link>
                </div>
                <div className='dashboard_main-alone_trafic'>
                    <p className={tktNum > 30 ? "dashboard-trafic__high" : tktNum < 10 ? "dashboard-trafic__low" : "dashboard-trafic__normal"}>
                        <TbTrafficCone className='dashboard_ico' /> TRAFIC
                        <span className='dashboard-link-sub-ifo'>{tktNum} checkins </span></p>


                </div>



            </main>


        </div >
    )
}

export default Dashboard