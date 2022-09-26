import { collection, doc, updateDoc, increment } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { MdOutlineRemoveShoppingCart, MdOutlineShoppingCart } from 'react-icons/md'
import { useNavigate } from 'react-router'
import { useAuth } from '../../../contexts/AuthContext'
import { useDb } from '../../../contexts/Database'
import { db } from '../../../firebase/Config'
import Produts from '../products/Produts'
import './addToOrder.css'
import { arrayUnion } from 'firebase/firestore'
import NewCartItem from './NewCartItem'
import { IoClose } from 'react-icons/io5'

const AddToOrder = ({ order, handleAddNewItems }) => {
    const { user } = useAuth()
    const [newCart, setNewCart] = useState(false)
    const [time, setTime] = useState()
    const navigate = useNavigate()
    const { remove, upload } = useDb()

    const cartQ = collection(db, `newcart#${order.id}-${(user?.uid).slice(-5)}`)
    const [newCartDoc] = useCollectionData(cartQ)

    const [tickets, setTickets] = useState({
        number: 0, price: 0
    })
    const [newTotal, setTotal] = useState(0)

    const openNewCart = () => {
        setNewCart(!newCart)
    }
    const onAddToNewCart = async (item) => {
        const path = `newcart#${order.id}-${(user?.uid).slice(-5)}`
        upload(path, item.name, {
            item,
            qty: 1
        })



    }

    const countTotalPrice = () => {
        let allPrices = [];
        newCartDoc?.map((products) =>
            allPrices.push(products.item.price * products.qty)
        )
        setTotal(allPrices.reduce((a, b) => a + b, 0))


    }
    useEffect(() => {
        countTotalPrice()
    }, [newCartDoc, tickets])

    useEffect(() => {
        const getTime = () => {
            const currentdate = new Date();
            let time =
                [currentdate.getHours() + ":" +
                    currentdate.getMinutes()]
            setTime(time)
        }
        getTime()
    }, [tickets, newCart])
    const appendOrder = () => {

        const cart = [...order.cart, ...newCartDoc]
        const docRef = doc(db, `open-orders/${order.id}#${order.user.uid}`);
        updateDoc(docRef, {
            cart: cart,
            newTotal: newTotal ?? "",
            tickets: {
                number: order.tickets.number + tickets.number ?? "",
                price: order.tickets.price + tickets.price ?? "",
                time: time
            },
            total: order.total + newTotal + tickets?.price ?? 0

        }).then(() => {
            newCartDoc?.map(async (cartItem) => {
                await remove(`newcart#${order.id}-${(user?.uid).slice(-5)}/${cartItem.item.name}`)
            })
        }).then(() => {
            setTickets({ number: 0, price: 0 })
            setTotal(0)
            setNewCart(false)
            handleAddNewItems()
            window.location.reload()
        })
    }

    return (
        <div className='add-new_contaienr'>
            <h2 className='add-new_header'> +Order <span>#{order.id}</span></h2>
            <p className='add-new_user'>{order.user.name} #{order.user.uid}</p>
            {
                newCart ?
                    <MdOutlineRemoveShoppingCart onClick={openNewCart} className="add-new_cart-icon__show" />
                    :
                    <MdOutlineShoppingCart onClick={openNewCart} className='add-new_cart-icon__show' />

            }
            <IoClose onClick={() => handleAddNewItems()} className="add-new_close-ico"/>

            <div className='add-new_products'>
                <Produts onAddToCart={onAddToNewCart} />
            </div>

            {
                newCart && <div className='new-cart-contaienr'>
                    <p className='new-cart-header'><strong>Add to order <span> #{order.id}</span></strong></p>
                    <div style={{ marginLeft: "15px" }}>
                        <p>{order.user.name} #{order.user.uid}</p>
                        <p>{order.date} {order.time}</p>
                        <p><strong>Total before: </strong> {order.total}L.e</p>
                        <p><strong>Total after: </strong>  {newTotal ?? 0}L.e</p>


                    </div>

                    <br />
                    <div>
                        {
                            order?.tickets.number > 0 ?
                                <p><strong>{order.tickets.number} person/s checked in </strong>at {order.time}</p>
                                : <div>
                                    <strong>No Tickets Sold yet</strong>
                                    <br />
                                    {
                                        tickets.number > 0 ?
                                            <>
                                                <button onClick={() => setTickets({ number: 0, price: 0 })} className='new-cart_checkin-btn'>cancel</button>
                                                <p>+ {tickets.number} ticket {tickets.price}L.e</p>
                                            </>
                                            :
                                            <button onClick={() => setTickets({ number: 1, price: 10 })} className='new-cart_checkin-btn'>checkin</button>
                                    }
                                </div>

                        }
                    </div>
                    <br />
                    <div>
                        <p><strong>Old cart {order.time}: </strong></p>
                        <div className='new-cart_old-cart-item'>
                            {order?.cart.length > 0 ? order?.cart.map((CartItem, index) => (
                                <p key={index}> {CartItem.qty}x {CartItem.item.name} {CartItem.item.price}L.e</p>
                            )) : "Empty"}
                        </div>
                    </div>
                    <div>
                        <p style={{ marginTop: "10px" }}><strong>New cart {time}: </strong></p>
                        <div className='new-cart_new-cart-item'>
                            {newCartDoc?.map((cartItem, index) => (
                                <NewCartItem key={index} cartItem={cartItem} id={order.id} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className='new-cart_total'><strong>{newTotal + order.total + tickets.price}L.e</strong></p>
                    </div>
                    <div className='new-cart_Append_container'>
                        <button onClick={appendOrder} className='appent_order-btn'>Append order</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default AddToOrder