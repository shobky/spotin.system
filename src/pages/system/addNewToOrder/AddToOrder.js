import { collection, doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { MdOutlineRemoveShoppingCart, MdOutlineShoppingCart } from 'react-icons/md'
import { useNavigate } from 'react-router'
import { useAuth } from '../../../contexts/AuthContext'
import { useDb } from '../../../contexts/Database'
import { db } from '../../../firebase/Config'
import Produts from '../products/Produts'
import './addToOrder.css'

const AddToOrder = ({ order, handleAddNewItems }) => {
    const { user } = useAuth()
    const { upload, remove } = useDb()
    const [newCart, setNewCart] = useState(false)
    const navigate = useNavigate()

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
        await upload(path, item.name, {
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

    const appendOrder = async () => {
        const docRef = doc(db, `open-orders/#${order.user.uid}`);
        await updateDoc(docRef, {
            newCart: {
                newCartDoc,
                total: newTotal ?? ""
            },
            tickets: {
                number: order.tickets.number + tickets.number ?? "",
                price: order.tickets.price + tickets.price ?? ""
            },
            total: order.total + newTotal ?? 0

        })
        await newCartDoc?.map(async (cartItem) => {
            await remove(`newcart#${order.id}-${(user?.uid).slice(-5)}/${cartItem.item.name}`)
        })
        setTickets({ number: 0, price: 0 })
        setTotal(0)
        setNewCart(false)
        handleAddNewItems()
        navigate('/cashier.system/orders')

    }

    return (
        <div className='add-new_contaienr'>
            <h2 className='add-new_header'> Add to order #{order.id}</h2>
            <p className='add-new_user'>{order.user.name} #{order.user.uid}</p>
            {
                newCart ?
                    <MdOutlineRemoveShoppingCart onClick={openNewCart} className="add-new_cart-icon__show" />
                    :
                    <MdOutlineShoppingCart onClick={openNewCart} className='add-new_cart-icon__show' />

            }
            <div className='add-new_products'>
                <Produts onAddToCart={onAddToNewCart} />
            </div>

            {
                newCart && <div className='new-cart-contaienr'>
                    <p className='new-cart-header'><strong>Add to order #{order.id}</strong></p>
                    <div style={{ marginLeft: "15px" }}>
                        <p>{order.user.name} #{order.user.uid}</p>
                        <p>{order.date} {order.time}</p>
                    </div>

                    <br />
                    <div>
                        {
                            order?.tickets.number > 0 ?
                                <p><strong>Tickets: </strong>{order.tickets.number} tickets  {order.tickets.prive}L.e</p>
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
                        <p><strong>Old cart: </strong></p>
                        <div className='new-cart_old-cart-item'>
                            {order?.cart.length > 0 ? order?.cart.map((CartItem, index) => (
                                <p key={index}> {CartItem.qty}x {CartItem.item.name} {CartItem.item.price}L.e</p>
                            )) : ""}
                        </div>
                    </div>
                    <div>
                        <p><strong>New cart: </strong></p>
                        <div className='new-cart_new-cart-item'>
                            {newCartDoc?.map((CartItem, index) => (
                                <p key={index}> {CartItem.qty}x {CartItem.item.name} {CartItem.item.price}L.e</p>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className='new-cart_old-total'><strong>Old order total: {order.total}L.e</strong></p>
                        <p className='new-cart_new-total'><strong>New order total: {newTotal}L.e</strong></p>
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