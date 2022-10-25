import React, { useEffect, useState } from 'react'
import './receipt.css'

import { ImShrink2 } from 'react-icons/im'
import TimeSpent from './TimeSpent'

import { BsCartPlus, BsFillCircleFill } from 'react-icons/bs'
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { GiPlainCircle } from 'react-icons/gi'
import { db } from '../../../firebase/Config'

import avataro from '../../../assets/avatars/man.png'
import { MdCancel, MdOutlineAddShoppingCart, MdOutlineNoteAdd } from 'react-icons/md'
import { HiOutlineCurrencyDollar } from 'react-icons/hi'
import { uuidv4 } from '@firebase/util'
import { Link } from 'react-router-dom'
const Receipt = ({ order, onSetReceipt, handleAddNewItems, userOpen, showreceSetter }) => {
    const [timeSpent, setTimeSpent] = useState()
    const [loading, setLoading] = useState(false)
    const [paidAmout, setPaidAmount] = useState(0)
    const [orderTotal, setOrderTotal] = useState(0)


    const onSetTimeSpent = (time) => {
        setTimeSpent(time)
    }
    useEffect(() => {
        const onSetOrderTotal = () => {
            setOrderTotal(
                order.status === "open" ?
                    timeSpent?.length > 0 ?
                        timeSpent[0] >= 2 || timeSpent[0] < 0 ? order.total + 15 * order.tickets.number : order.total
                        : order.total
                    : order.timeSpent ?
                        order.timeSpent[0] >= 2 || order.timeSpent[0] < 0 ? order.total + 15 * order.tickets.number : order.total
                        : order.total
            )
        }
        onSetOrderTotal()
    }, [order, timeSpent])

    const handleOnCheckOut = () => {
        const paymentMsg = document.getElementById('rec_checkout-payment')
        paymentMsg.classList.add("rec_checkout-payment__vis")
    }
    const onCloseCheckoutMsg = () => {
        const paymentMsg = document.getElementById('rec_checkout-payment')
        paymentMsg.classList.remove("rec_checkout-payment__vis")
    }

    const onCheckout = async () => {
        setLoading(true)
        const data = {
            id: order.id,
            status: "closed",
            user: { name: order.user.name, uid: order.user.uid, url: order.user.url ?? "" },
            time: order.time,
            date: order.date,
            total: order.total,
            tickets: order.tickets,
            cart: order.cart,
            timeSpent: timeSpent ?? '',
            paidAmout
        }
        await setDoc(doc(db, "closed-orders", `#${order.id}`), data);
        await setDoc(doc(db, `Users/${order.user.name}/orders/${uuidv4().slice(-7)}`), data);
        await deleteDoc(doc(db, "open-orders", `${order.id}#${order.user.uid}`));
        onSetReceipt()
        setLoading(false)
    }

    const onArchive = async () => {
        setLoading(true)
        const data = {
            id: `${order.id}`,
            status: "archived",
            user: { name: order.user.name, uid: order.user.uid, url: order.user.url ?? "" },
            time: order.time,
            date: order.date,
            total: order.total,
            tickets: order.tickets,
            cart: order.cart,
            timeSpent: order.timeSpent,
            paidAmout: order.paidAmout

        }
        await setDoc(doc(db, "archived-orders", `#${order.id}`), data);
        await deleteDoc(doc(db, "closed-orders", `#${order.id}`));
        onSetReceipt()
        setLoading(false)

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
                {
                    userOpen ? <ImShrink2
                        onClick={() => showreceSetter()}
                        className="rec_shrink-ico" /> : <ImShrink2
                        onClick={() => onSetReceipt()}
                        className="rec_shrink-ico" />
                }
                {
                    order.user.url ?
                        <img className="rece_avatar" alt='' src={order.user.url} /> : ""
                }

                {
                    order.status === "open" ? <MdOutlineAddShoppingCart onClick={handleAddNewItems} className="rec_addNew-ico" /> : ""
                }

                <div className='receipt_container'>

                    <p className='rec_order-id'><GiPlainCircle className={
                        order.status === "open" ? "rec_order-open" : order.status === "closed" ? "rec_order-closed" : "rec-order-archived"
                    } /> Order id:  <strong> #{order.id} </strong></p>
                    <p> <strong>Date: </strong> {order.date}/2022</p>
                    <p> <strong>Time: </strong> {order.time}</p>

                    <p> <strong>Username: </strong> {order.user.name}</p>
                    <p> <strong>User id: </strong> #{order.user.uid}</p>
                    {/* counting order total price with tickets */}
                    {
                        <p>
                            <strong>{order.paidAmout ? `Paid: ${order.paidAmout}L.e` : ""}</strong>
                        </p>
                    }

                    {
                        order.status === "open" ?
                            timeSpent?.length > 0 ?
                                <p className='rece_total-price'>Subtotal: {
                                    timeSpent[0] >= 2 || timeSpent[0] < 0 ? order.total + 15 * order.tickets.number : order.total
                                }L.e</p> : <p className='rece_total-price'>Subtotal: {order.total}L.e</p>
                            : order.timeSpent ?
                                <p className='rece_total-price'>Subtotal: {
                                    order.timeSpent[0] >= 2 || order.timeSpent[0] < 0 ? order.total + 15 * order.tickets.number : order.total
                                }L.e</p> : <p className='rece_total-price'>Subtotal: {order.total}L.e</p>
                    }

                    {
                        <p className='change-in-rec'>
                            <strong>{order.paidAmout ? `Change: ${order.paidAmout - orderTotal}L.e` : ""}</strong>
                        </p>
                    }
                    <br />

                    {
                        order.tickets.number > 0 ?
                            <>

                                {/* counting tickits price and type for closed & archived orders */}
                                {
                                    order.timeSpent ?
                                        <>
                                            <p> <strong>Ticket type: </strong>{
                                                order.timeSpent[0] >= 2 || order.timeSpent[0] < 0 ? "Full day" : "Half Day"
                                            }</p>
                                            <p><strong>{order.tickets.number} people checked in for: <br /> </strong>{(order.timeSpent[0] < 0 ? 24 + order.timeSpent[0] + " hours : " : order.timeSpent[0] + " hours : ") + (order.timeSpent[1] < 0 ? 60 + order.timeSpent[1] + " minutes" : order.timeSpent[1] + " minutes")}</p>
                                            <p> <strong>Total: </strong>{
                                                order.timeSpent[0] >= 2 || order.timeSpent[0] < 0 ? order.tickets.price + 15 * order.tickets.number : order.tickets.price
                                            }L.e</p>
                                        </>
                                        :
                                        <TimeSpent timeSpent={timeSpent} onSetTimeSpent={onSetTimeSpent} order={order} />

                                }
                                {/* counting tickits price and type for open orders */}

                                {
                                    timeSpent?.length > 0 ?
                                        <>
                                            <p> <strong>Ticket type: </strong>{
                                                timeSpent[0] >= 2 || timeSpent[0] < 0 ? "Full day" : "Half Day"
                                            }</p>
                                            <p> <strong>Total: </strong>{
                                                timeSpent[0] >= 2 || timeSpent[0] < 0 ? (order.tickets.price + 15 * order.tickets.number) : order.tickets.price
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
                                <strong>Cart:  </strong>
                                {order?.cart?.map((cartItem, index) => (
                                    <div key={index}>
                                        <div style={{ marginLeft: "10px" }}>
                                            <p> <BsFillCircleFill className='rece_circle' /> {cartItem.qty}x{cartItem.item.name} {cartItem.item.price * cartItem.qty}L.e</p>
                                            <p className='rece_cart-item-note'>{cartItem.note}</p>
                                        </div>
                                    </div>
                                ))}
                                {/* counting order total price without tickets if there is a new cart */}
                                <br />

                                {
                                    order.newCart?.newCartDoc.length > 0 ?
                                        <p className='rece_cart-total'><strong>Total:</strong> {(order.total + order.newCart.total)}L.e</p>
                                        :
                                        <p className='rece_cart-total'><strong>Total:</strong> {order.total - order.tickets.price}L.e</p>
                                }

                            </div>

                            :
                            <strong>No Items Sold</strong>
                    }
                </div>
            </div>

            <div id='rec_checkout-payment' className='rec_checkout-payment__hidden'>
                <div onClick={onCloseCheckoutMsg} className='rec_checkout-filter'></div>
                <div className='rec_checkout-payment-container'>
                    <div className='rec_checkout-payment-content'>
                        <MdCancel onClick={onCloseCheckoutMsg} className='rec_checkout-cancel-ico' />
                        <h1 className='rec_checkout-header'>Payment</h1>
                        <div className='rec_checkuot-actions'>
                            <div className='flex'>
                                <p className='rec_checkout-payment-label'>Subtotal: {orderTotal} L.e</p>
                            </div>
                            <div className='flex paid_section-chekcout'>
                                <p className='rec_checkout-payment-label'>Paid: </p>
                                <input onChange={(e) => setPaidAmount(e.target.value)} autoFocus={true} placeholder='99 L.e' type="number" className='rec_checkout-payment-input' />
                            </div>
                            <hr className='rec_checkout-line' />
                            <br />
                            <div className='flex'>
                                <p className='rec_checkout-payment-label'>Change:</p>
                                {
                                    paidAmout > 0 ? paidAmout >= orderTotal ? paidAmout - orderTotal + " L.e" : "Not Enough" : "No Input"
                                }
                            </div>
                            <button
                                disabled={paidAmout < orderTotal ? true : loading}
                                onClick={onCheckout}

                                className={paidAmout < orderTotal || loading ? "rec_chekcout-continue-btn__disable" : 'rec_chekcout-continue-btn'}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                !userOpen ?
                    <div className='rece_actions'>
                        {/* counting order total price with tickets again in the bottom */}

                        {
                            order.status === "open" ?
                                timeSpent?.length > 0 ?
                                    <p className='total_in-bottom'>{
                                        timeSpent[0] >= 2 || timeSpent[0] < 0 ? order.total + 15 * order.tickets.number : order.total
                                    }L.e</p> : <p className='total_in-bottom'>{order.total}L.e</p>
                                : order.timeSpent ?
                                    <p className='total_in-bottom'>{
                                        order.timeSpent[0] >= 2 || order.timeSpent[0] < 0 ? order.total + 15 * order.tickets.number : order.total
                                    }L.e</p> : <p className='total_in-bottom'>{order.total}L.e</p>
                        }
                        {
                            order.status === 'open' ?
                                <button
                                    onClick={handleOnCheckOut}
                                    className='rece_Checkout-btn'>
                                    Checkout
                                </button> :
                                order.status === "closed" ?
                                    <button
                                        disabled={loading}
                                        className={loading ? " rece_archive-btn__disabled  " : 'rece_Checkout-btn rece_archive-btn '}
                                        onClick={onArchive}
                                    >
                                        Archive
                                    </button> : ''
                        }
                    </div>
                    :

                    <div style={{display:"flex", justifyContent:"center", marginTop:"55px"}}>
                        {
                            order.status === "open" ?
                                timeSpent?.length > 0 ?
                                    <p className='total_in-bottom'>{
                                        timeSpent[0] >= 2 || timeSpent[0] < 0 ? order.total + 15 * order.tickets.number : order.total
                                    }L.e</p> : <p className='total_in-bottom'>{order.total}L.e</p>
                                : order.timeSpent ?
                                    <p className='total_in-bottom'>{
                                        order.timeSpent[0] >= 2 || order.timeSpent[0] < 0 ? order.total + 15 * order.tickets.number : order.total
                                    }L.e</p> : <p className='total_in-bottom'>{order.total}L.e</p>
                        }
                    </div>

            }

        </>
    )
}

export default Receipt