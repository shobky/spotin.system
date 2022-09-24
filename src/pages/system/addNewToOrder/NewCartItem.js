import React from 'react'
//icons
import { RiAddCircleFill } from 'react-icons/ri'
import { AiFillMinusCircle } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useDb } from '../../../contexts/Database'
import { useAuth } from '../../../contexts/AuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/Config'
import '../prepare/cart/cart.css'

const NewCartItem = ({ cartItem, id }) => {
    // const { orderId, updateNote, changeCartQty,  } = useDb()
    const { user } = useAuth()
    const { changeNewCartQty, remove } = useDb()

    const increaceQty = () => {
        changeNewCartQty(id, cartItem, cartItem.qty + 1)
    }
    const decreaceQty = () => {
        if (cartItem.qty >= 2) {
            changeNewCartQty(id, cartItem, cartItem.qty - 1)
        }

    }
    const removeFromCart = async () => {
        const path = `newcart#${id}-${(user?.uid).slice(-5)}/${cartItem.item.name}`
        await remove(path)
    }
    const handleNotesChange = async (e) => {
        const path = `newcart#${id}-${(user?.uid).slice(-5)}/${cartItem.item.name}`
        const docRef = doc(db, path);
        await updateDoc(docRef, {
            note: e.target.value
        })
    }

    return (
        <div className='cart-item'>
            <div>
                <p className='cart-item_info'>
                    <span className='cart-item_qty'> {cartItem?.qty}x </span>
                    <span className='cart-item_name'>{cartItem?.item.name} </span>
                    <span className='cart-item_prcie'>{cartItem?.item.price * cartItem?.qty}L.e</span>
                </p>
                <input placeholder='Add note:' className='New-cart-item-note' onChange={(e) => handleNotesChange(e)} type="text" max="60" />

            </div>

            <div className='cart-item_action-btns'>
                <button className=" cart_action-btn cart_qty-increase" onClick={increaceQty}><RiAddCircleFill className="cart_add-ico" /></button>
                <button className=" cart_action-btn cart_qty-decrease" onClick={decreaceQty}><AiFillMinusCircle className="cart-decreese-ico" /></button>
                <button className=" cart_action-btn cart-item_remove-btn" onClick={removeFromCart}><MdDelete /></button>
            </div>
        </div>
    )
}

export default NewCartItem