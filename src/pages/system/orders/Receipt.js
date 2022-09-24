import React, { useState } from 'react'
import './receipt.css'

import { ImShrink2 } from 'react-icons/im'
import TimeSpent from './TimeSpent'

import { BsCartPlus, BsFillCircleFill } from 'react-icons/bs'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { GiPlainCircle } from 'react-icons/gi'
import { db } from '../../../firebase/Config'

const Receipt = ({ order, onSetReceipt, handleAddNewItems }) => {
    const [timeSpent, setTimeSpent] = useState()

    const onSetTimeSpent = (time) => {
        setTimeSpent(time)
    }

    console.log(order.total, timeSpent)

    const onCheckout = async () => {
        const data = {
            id: order.id,
            status: "closed",
            user: { name: order.user.name, uid: order.user.uid },
            time: order.time,
            date: order.date,
            total: order.total,
            tickets: order.tickets,
            cart: order.cart,
            timeSpent: timeSpent ?? ''
        }
        await setDoc(doc(db, "closed-orders", `#${order.id}`), data);
        await deleteDoc(doc(db, "open-orders", `${order.id}#${order.user.uid}`));
        onSetReceipt()
    }

    const onArchive = async () => {
        const data = {
            id: `${order.id}`,
            status: "archived",
            user: { name: order.user.name, uid: order.user.uid },
            time: order.time,
            date: order.date,
            total: order.total,
            tickets: order.tickets,
            cart: order.cart,
            timeSpent: order.timeSpent

        }
        await setDoc(doc(db, "archived-orders", `#${order.id}`), data);
        await deleteDoc(doc(db, "closed-orders", `#${order.id}`));
        onSetReceipt()
    }

    return (
        <>

            <div className='receipt'>
                <h1
                    style={{ fontFamily: "montserrat-black", marginTop: "25px", textAlign: "center" }}
                    className='system_header_name-rece'>Spot
                    <span
                        style={{
                            fontFamily: "sans-seriref",
                            fontWeight: 'light',
                            fontSize: "28px",
                            marginLeft: "3px"
                        }}
                        className='pos_name-span'>IN
                    </span>
                </h1>
                <ImShrink2
                    onClick={() => onSetReceipt()}
                    className="rec_shrink-ico" />

                {
                    order.status === "open" ? <BsCartPlus onClick={handleAddNewItems} className="rec_addNew-ico" /> : ""
                }

                <div className='receipt_container'>

                    <p className='rec_order-id'><GiPlainCircle className={
                        order.status === "open" ? "rec_order-open" : order.status === "closed" ? "rec_order-closed" : "rec-order-archived"
                    } /> Order id:  <strong> #{order.id} </strong></p>
                    <p> <strong>Date: </strong> {order.date}/2022</p>
                    <p> <strong>Time: </strong> {order.time}</p>

                    <p> <strong>Username: </strong> {order.user.name}</p>
                    <p> <strong>User id: </strong> #{order.user.uid}</p>
                    {
                        order.status === "open" ?
                            timeSpent ?
                                <p className='rece_total-price'>Subtotal: {
                                    timeSpent[0] >= 2 ? order.total + 15 * order.tickets.number : order.total + order.tickets.price
                                }L.e</p> : <p className='rece_total-price'>Subtotal: {order.total + order.tickets.price}L.e</p>
                            : order.timeSpent ?
                                <p className='rece_total-price'>Subtotal: {
                                    order.timeSpent[0] >= 2 ? order.total + 15 * order.tickets.number : order.total + order.tickets.price
                                }L.e</p> : <p className='rece_total-price'>Subtotal: {order.total + order.tickets.price}L.e</p>
                    }
                    <br />

                    {
                        order.tickets.number > 0 ?
                            <>
                                {
                                    order.timeSpent ?
                                        <p> <strong>Ticket type: </strong>{
                                            order.timeSpent[0] >= 2 ? "Full day" : "Half Day"
                                        }</p> : ""
                                }
                                {
                                    order.timeSpent ?
                                        <p>{order.timeSpent}</p>
                                        :
                                        <TimeSpent timeSpent={timeSpent} onSetTimeSpent={onSetTimeSpent} order={order} />

                                }
                                {
                                    timeSpent ?
                                        <>
                                            <p> <strong>Ticket type: </strong>{
                                                timeSpent[0] >= 2 ? "Full day" : "Half Day"
                                            }</p>
                                            <p> <strong>Total: </strong>{
                                                timeSpent[0] >= 2 ? order.tickets.price + 15 * order.tickets.number : order.tickets.price
                                            }L.e</p>
                                        </> : ""
                                }
                            </>
                            : <strong>No Tickets Sold</strong>
                    }
                    <br />

                    {
                        order.cart.length > 0 ?

                            <div>
                                <strong>Cart: {`{`} </strong>
                                {order?.cart?.map((cartItem, index) => (
                                    <div key={index}>
                                        <div style={{ marginLeft: "10px" }}>
                                            <p> <BsFillCircleFill className='rece_circle' /> {cartItem.qty}x{cartItem.item.name} {cartItem.item.price * cartItem.qty}L.e</p>
                                            <p className='rece_cart-item-note'>{cartItem.note}</p>
                                        </div>
                                    </div>
                                ))}
                                <strong>{`}`}</strong>
                                {
                                    order.newCart?.newCartDoc.length > 0 ?
                                        <p className='rece_cart-total'><strong>Total:</strong> {(order.total + order.newCart.total)}L.e</p>
                                        :
                                        <p className='rece_cart-total'><strong>Total:</strong> {order.total}L.e</p>
                                }

                            </div>

                            :
                            <strong>No Items Sold</strong>
                    }
                </div>
            </div>
            <div className='rece_actions'>
                {
                    order.status === "open" ?
                        timeSpent ?
                            <p className='total_in-bottom'>{
                                timeSpent[0] >= 2 ? order.total + 15 * order.tickets.number : order.total + order.tickets?.price
                            }L.e</p> : <p className='total_in-bottom'>{order.total + order.tickets.price}L.e</p>
                        : order.timeSpent ?
                            <p className='total_in-bottom'>{
                                order.timeSpent[0] >= 2 ? order.total + 15 * order.tickets.number : order.total + order.tickets?.price
                            }L.e</p> : <p className='total_in-bottom'>{order.total + order.tickets?.price}L.e</p>
                }
                {
                    order.status === 'open' ?
                        <button

                            onClick={onCheckout}
                            className='rece_Checkout-btn'>
                            Checkout
                        </button> :
                        order.status === "closed" ?
                            <button
                                className='rece_Checkout-btn rece_archive-btn '
                                onClick={onArchive}
                            >
                                Archive
                            </button> : ''
                }
            </div>

        </>
    )
}

export default Receipt