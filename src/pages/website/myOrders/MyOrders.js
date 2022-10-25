import React, { useState } from 'react'
import { BsBookmarkStar, BsStar } from 'react-icons/bs';
import { IoArrowBackSharp, IoStarOutline, IoStarSharp } from 'react-icons/io5';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import { VscHistory } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { useDb } from '../../../contexts/Database';
import Receipt from '../../system/orders/Receipt';
import './myOrders.css'

const MyOrders = () => {
    const { userOrders } = useDb()
    const [fav, setFav] = useState(false)
    const [ys, setys] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState()

    const openOrder = (order) => {
        setSelectedOrder(order)
        setys(true)
    }
    const showreceSetter = () => {
        setys(!ys)
    }
    return (

        <>
            {
                ys ? <Receipt showreceSetter={showreceSetter} userOpen={ys} order={selectedOrder} />
                    :
                    <div className='my-orders'>
                        <Link to="/profile"> <TbArrowNarrowLeft className="my-orders_back-ico" /> </Link>

                        <header className='my-orders_header'>
                            <p><VscHistory /></p>
                            <p>order history</p>
                        </header>

                        <main>
                            <h1 className='my-orders_main_header'>You have orderd {userOrders?.length > 1 ? userOrders?.length + " times" : userOrders?.length + " time"}.</h1>
                            <div className='my-orders-input-div'>
                                <input type="text" placeholder='search...' className='my-orders_search-input' />
                            </div>
                            <div>
                                {
                                    userOrders?.map((userOrder) => (
                                        <div className='userOrder-viw'>
                                            {
                                                fav ? <BsBookmarkStar onClick={() => setFav(false)} className='userOrder-view-star__active' /> : <BsBookmarkStar onClick={() => setFav(true)} className='userOrder-view-star' />
                                            }
                                            <div onClick={() => openOrder(userOrder)} className='userOrder-id-div'>
                                                <p className='userOrder-id'>Order #{userOrder.id}{userOrder.paidAmout}{userOrder.date[0]}{userOrder.time[1].slice(1)}</p>
                                                <p className='userOrder-status'>Closed</p>
                                            </div>
                                            <div onClick={() => openOrder(userOrder)} className='userOrder-view-small-details'>
                                                <p className='userOrder-view-items-num'>view {userOrder.cart?.length > 0 ? userOrder.cart.length > 1 ? userOrder.cart.length + " items" : userOrder.cart.length + " item" : " order"}</p>
                                                <p>{userOrder.date}, 2022 | {userOrder.time}</p>
                                            </div>
                                        </div>

                                    ))
                                }

                            </div>

                        </main>

                    </div>

            }</>

    )
}

export default MyOrders