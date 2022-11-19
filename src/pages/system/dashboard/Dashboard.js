import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { CgCommunity, CgMenuRight } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { BsFillCalendarEventFill, BsPeopleFill } from 'react-icons/bs'
import { FaReceipt } from 'react-icons/fa'
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io'
import { SiFuturelearn } from 'react-icons/si'
import { useDb } from '../../../contexts/Database'
import { TbCheckupList, TbTrafficCone } from 'react-icons/tb'
import { GrSystem } from 'react-icons/gr'
import { MdSettingsSystemDaydream } from 'react-icons/md'
import { useAuth } from '../../../contexts/AuthContext'

const Dashboard = () => {

    const { user } = useAuth()
    const { users, openOrders } = useDb()
    const [tktNum, setTktNum] = useState()

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
                <img src={user?.photoURL?? ""} className="dashboard_user-photo" alt="" />
            </header>

            <main>
                <div className='dasbhoard_divider-contain'>
                    <div className='dashboard_main-horizntal-div'>
                        <Link to="/admin-dashboard/users" className=' dashboard_main-Link-div dashboard_users'><BsPeopleFill className='dashboard_user-ico dashboard_ico' /><span>USERS</span>
                            <span className='dashboard-link-sub-ifo'>{
                                users?.filter((user) => {
                                    if (user.firebaseUID) {

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
                </div>
                <div className='dasbhoard_divider-contain'>
                    <div className='dashboard_main-aloone-div'>
                        <Link to="/admin-dashboard/community.members" className=' dashboard_main-Link-div dashboard_community'><CgCommunity className='dashboard_comm-ico dashboard_ico' />COMMUNITY
                            <span className='dashboard-link-sub-ifo'> {
                                users?.filter((user) => {
                                    if (user.firebaseUID) {
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
                        <Link to="/cashier.system/add-new-item" className=' dashboard_main-Link-div dashboard_PRODUCTS-plus'><IoMdAddCircleOutline className='dashboard_add-ico dashboard_ico' /> PRODUCTS</Link>
                        <Link className=' dashboard_main-Link-div dashboard_PRODUCTS-minus'> <IoMdRemoveCircleOutline className='dashboard_remove-ico dashboard_ico' /> PRODUCTS</Link>

                    </div>
                </div>
            </main>


            <div className='dashbaord-divider-bottom'>
                <div className='dashboard_main-alone_trafic'>
                    <p className={tktNum > 30 ? "dashboard-trafic__high" : tktNum < 10 ? "dashboard-trafic__low" : "dashboard-trafic__normal"}>
                        <TbTrafficCone className='dashboard_ico' /> TRAFIC
                        <span className='dashboard-link-sub-ifo'>{tktNum} checkins </span></p>
                </div>
                <Link style={{ textDecoration: "none" }} to='/admin-dashboard/all-products' className='dashboard_main-p-list'>
                    <p className='dashboard_main-p-list'>
                        <TbCheckupList className='dashboard_ico' /> Product List</p>
                </Link>
                <Link style={{ textDecoration: "none" }} to='/cashier.system' className='dashboard_main-cashier-link'>
                    <p className='dashboard_systemLink'>
                        <MdSettingsSystemDaydream className='dashboard_ico' /> Cashier</p>
                </Link>
            </div>

        </div >
    )
}

export default Dashboard