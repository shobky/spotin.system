import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import {  BsXLg } from 'react-icons/bs';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import { VscHistory } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useDb } from '../../../contexts/Database';
import { db } from '../../../firebase/Config';
import Receipt from '../../system/orders/Receipt';
import './myOrders.css'

const MyOrders = () => {
    const { userOrders } = useDb()
    const { user } = useAuth()
    const [fav, setFav] = useState(false)
    const [ys, setys] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState()
    const [searchTerm, setSearchTerm] = useState('')

    const openOrder = (order) => {
        setSelectedOrder(order)
        setys(true)
    }
    const showreceSetter = () => {
        setys(!ys)
    }
    const showDeletionMsg = () => {
        const deletionMsg = document.getElementById('deletionMsg')
        deletionMsg.classList.add('my-orders-deletion-filter__vis')
    }
    const closeDeletionMsg = () => {
        const deletionMsg = document.getElementById('deletionMsg')
        deletionMsg.classList.remove('my-orders-deletion-filter__vis')
    }
    const onDeleteAllHistory = () => {
        userOrders.map((order) => {
            deleteDoc(doc(db, `Users/${user.email}/orders/${order.userOrderId}`));
        })

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
                                <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='search...' className='my-orders_search-input' />
                            </div>
                            <AiFillDelete onClick={showDeletionMsg} className='my-orders_delete-ico' />
                            <div>
                                {
                                    userOrders?.filter((filtUserOrders) => {
                                        if (searchTerm === "") {
                                            return filtUserOrders
                                        }
                                        else if (filtUserOrders?.userOrderId.toLowerCase().includes(searchTerm.toLowerCase())) {
                                            return filtUserOrders
                                        } else if (filtUserOrders.status.toLowerCase().includes(searchTerm.toLowerCase())) {
                                            return filtUserOrders
                                        } else if ((filtUserOrders.date + " " + filtUserOrders.time[0] + filtUserOrders.time[1]).includes(searchTerm)) {
                                            return filtUserOrders
                                        }
                                        else {

                                        }
                                    }).map((userOrder) => (
                                        <div className='userOrder-viw'>
                                            {
                                                fav ? <VscHistory onClick={() => setFav(false)} className='userOrder-view-star__active' /> : <VscHistory onClick={() => setFav(true)} className='userOrder-view-star' />
                                            }
                                            <div onClick={() => openOrder(userOrder)} className='userOrder-id-div'>
                                                <p className='userOrder-id'>Order #{userOrder.userOrderId}</p>
                                                {
                                                    userOrder.status === "open" ?
                                                        <p className='userOrder-status-open'>{userOrder.status}</p>
                                                        :
                                                        <p className='userOrder-status'>{userOrder.status}</p>

                                                }
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
                        <div onClick={closeDeletionMsg} id='deletionMsg' className='my-orders-deletion-filter__hid'>
                            <div className='my-orders-delete-msg'>
                                <BsXLg onClick={closeDeletionMsg} className="my-orders_x-icon" />
                                <p>Delete all history ?</p>
                                <button onClick={onDeleteAllHistory}>delete</button>
                            </div>
                        </div>

                    </div>

            }</>

    )
}

export default MyOrders